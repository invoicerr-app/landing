"""Top-down renders of the desk objects for the Invoicerr home page.

Blender as a Python module (pip package `bpy`, Python 3.11). From this folder:

    uv venv --python 3.11 .venv && VIRTUAL_ENV=.venv uv pip install bpy==4.5.0
    python3 textures/shoot.py "$PWD/textures"      # screen and envelope faces, from HTML (Playwright)
    .venv/bin/python desk.py <name> <css_rotation_deg> <out.png> [samples]

The site's files are these renders at 96 samples, trimmed and saved as WebP in public/desk/:
cup 0, envelope -9, pen 24, pen-footer (pen) -32, phone -14, coins 0, paperclip -4, paperclip-host
(paperclip) 18.
1 Blender unit = 100 CSS px. The render is 2x, so 1 BU = 200 output px.
Shadows land in the alpha channel (shadow catcher), lit by a large soft area light placed up and to
the left of the frame, so every object casts its shadow down and to the right, like the CSS shadows.
"""
import math
import os
import sys

import bpy  # noqa: I001  (bmesh only exists once bpy is loaded)
import bmesh
from mathutils import Vector

TEX = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'textures')
PX = 2  # output pixels per CSS pixel


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((v + 0.055) / 1.055) ** 2.4 if v > 0.04045 else v / 12.92 for v in c) + (1,)


def mat(name, color, rough=0.4, metal=0.0, coat=0.0, coat_rough=0.05, spec=0.5):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = srgb(color) if isinstance(color, str) else color
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    b.inputs['Coat Weight'].default_value = coat
    b.inputs['Coat Roughness'].default_value = coat_rough
    b.inputs['Specular IOR Level'].default_value = spec
    return m


def image_mat(name, path, rough=0.6, emission=0.0, coat=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes['Principled BSDF']
    t = nt.nodes.new('ShaderNodeTexImage')
    t.image = bpy.data.images.load(path)
    t.extension = 'CLIP'
    nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
    if emission:
        nt.links.new(t.outputs['Color'], b.inputs['Emission Color'])
        b.inputs['Emission Strength'].default_value = emission
    b.inputs['Roughness'].default_value = rough
    b.inputs['Coat Weight'].default_value = coat
    b.inputs['Coat Roughness'].default_value = 0.03
    return m, nt, b


def add_paper_bump(m, strength=0.06, scale=180.0):
    nt = m.node_tree
    b = nt.nodes['Principled BSDF']
    n = nt.nodes.new('ShaderNodeTexNoise')
    n.inputs['Scale'].default_value = scale
    n.inputs['Detail'].default_value = 8
    bump = nt.nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = strength
    nt.links.new(n.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])


def assign(obj, m):
    obj.data.materials.clear()
    obj.data.materials.append(m)


def smooth(obj):
    for p in obj.data.polygons:
        p.use_smooth = True


def lathe(name, profile, steps=128):
    """Revolves a closed (r, z) profile around Z."""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    ring = len(profile)
    verts = []
    for i in range(steps):
        a = 2 * math.pi * i / steps
        ca, sa = math.cos(a), math.sin(a)
        verts.append([bm.verts.new((r * ca, r * sa, z)) for r, z in profile])
    for i in range(steps):
        j = (i + 1) % steps
        for k in range(ring - 1):
            bm.faces.new((verts[i][k], verts[j][k], verts[j][k + 1], verts[i][k + 1]))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    smooth(obj)
    return obj


def rounded_rect(name, w, h, r, z0, z1, seg=16, bevel=0.0):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    pts = []
    for cx, cy, a0 in ((w / 2 - r, h / 2 - r, 0), (-w / 2 + r, h / 2 - r, 90), (-w / 2 + r, -h / 2 + r, 180), (w / 2 - r, -h / 2 + r, 270)):
        for s in range(seg + 1):
            a = math.radians(a0 + 90 * s / seg)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    bot = [bm.verts.new((x, y, z0)) for x, y in pts]
    top = [bm.verts.new((x, y, z1)) for x, y in pts]
    bm.faces.new(top)
    bm.faces.new(list(reversed(bot)))
    n = len(pts)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((bot[i], bot[j], top[j], top[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    if bevel:
        mod = obj.modifiers.new('bevel', 'BEVEL')
        mod.width = bevel
        mod.segments = 4
        mod.limit_method = 'ANGLE'
        mod.angle_limit = math.radians(40)
        mod.harden_normals = False
    smooth(obj)
    return obj


def cyl_x(name, x0, x1, r0, r1=None, z=None, verts=96, cap_round=0):
    """A cylinder or cone lying along X, resting on the desk."""
    r1 = r0 if r1 is None else r1
    prof = [(0, x0), (r0, x0), (r1, x1), (0, x1)]
    if cap_round:
        prof = [(0, x0 - cap_round)] + [(r0 * math.sin(math.radians(a)), x0 - cap_round * math.cos(math.radians(a))) for a in range(10, 91, 10)] + [(r1, x1), (0, x1)]
    o = lathe(name, prof, verts)
    o.rotation_euler = (0, math.radians(90), 0)
    o.location.z = (max(r0, r1) if z is None else z)
    return o


def parent(objs, empty):
    for o in objs:
        o.parent = empty


def new_empty(name):
    e = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(e)
    return e


# ---------------------------------------------------------------- objects


def build_cup():
    ceramic = mat('ceramic', '#f6f8f9', rough=0.18, coat=0.6, coat_rough=0.04)
    saucer = lathe('saucer', [(0, 0.015), (0.55, 0.015), (0.6, 0.0), (0.64, 0.0), (0.68, 0.04), (0.88, 0.1), (0.94, 0.135), (0.945, 0.15), (0.93, 0.16), (0.87, 0.14), (0.67, 0.085), (0.63, 0.075), (0, 0.075)])
    assign(saucer, ceramic)
    base = 0.075
    cup = lathe('cup', [(0, base + 0.005), (0.36, base + 0.005), (0.4, base + 0.03), (0.5, base + 0.17), (0.57, base + 0.42), (0.605, base + 0.68), (0.612, base + 0.72), (0.598, base + 0.73), (0.575, base + 0.7), (0.545, base + 0.45), (0.47, base + 0.22), (0.34, base + 0.1), (0, base + 0.08)])
    assign(cup, ceramic)
    coffee = lathe('coffee', [(0, base + 0.55), (0.556, base + 0.55), (0.556, base + 0.551), (0, base + 0.551)])
    m = bpy.data.materials.new('coffee')
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes['Principled BSDF']
    g = nt.nodes.new('ShaderNodeTexGradient')
    g.gradient_type = 'SPHERICAL'
    tc = nt.nodes.new('ShaderNodeTexCoord')
    mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (1.8, 1.8, 1.8)
    # Object coordinates include the liquid's height in the cup: cancel it, so the gradient is a
    # disc centred on the surface, crema at the rim and dark in the middle.
    mp.inputs['Location'].default_value = (0, 0, -1.8 * (base + 0.55))
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    nt.links.new(mp.outputs['Vector'], g.inputs['Vector'])
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].position = 0.0
    ramp.color_ramp.elements[0].color = srgb('#8c5c33')
    ramp.color_ramp.elements[1].position = 1.0
    ramp.color_ramp.elements[1].color = srgb('#160903')
    e = ramp.color_ramp.elements.new(0.22)
    e.color = srgb('#4a2611')
    nt.links.new(g.outputs['Fac'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], b.inputs['Base Color'])
    n = nt.nodes.new('ShaderNodeTexNoise')
    n.inputs['Scale'].default_value = 60
    bump = nt.nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = 0.08
    nt.links.new(n.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    b.inputs['Roughness'].default_value = 0.12
    assign(coffee, m)
    # Handle: half a torus standing up, on the +X side.
    bpy.ops.mesh.primitive_torus_add(major_radius=0.16, minor_radius=0.05, major_segments=64, minor_segments=24)
    h = bpy.context.object
    bm = bmesh.new()
    bm.from_mesh(h.data)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.x < -0.01], context='VERTS')
    bm.to_mesh(h.data)
    bm.free()
    h.rotation_euler = (math.radians(90), 0, 0)
    h.location = (0.555, 0, base + 0.42)
    smooth(h)
    assign(h, ceramic)
    e = new_empty('cup')
    parent([saucer, cup, coffee, h], e)
    return e


def build_pen():
    lacquer = mat('lacquer', '#0f1f2a', rough=0.35, coat=0.7, coat_rough=0.06)
    chrome = mat('chrome', '#e8edf0', rough=0.12, metal=1.0)
    gold = mat('gold', '#d7b56d', rough=0.2, metal=1.0)
    grip = mat('grip', '#0a1317', rough=0.35, coat=0.5)
    r = 0.11
    parts = []
    parts.append(cyl_x('cap', 0.08, 1.45, r, r * 0.97, z=r, cap_round=0.08))
    assign(parts[-1], lacquer)
    parts.append(cyl_x('band', 1.45, 1.55, r * 1.04, r * 1.04, z=r))
    assign(parts[-1], chrome)
    parts.append(cyl_x('barrel', 1.55, 2.62, r * 0.96, r * 0.86, z=r))
    assign(parts[-1], lacquer)
    parts.append(cyl_x('ring', 2.62, 2.66, r * 0.88, r * 0.88, z=r))
    assign(parts[-1], chrome)
    parts.append(cyl_x('section', 2.66, 2.92, r * 0.78, r * 0.64, z=r))
    assign(parts[-1], grip)
    nib = cyl_x('nib', 2.92, 3.28, r * 0.62, 0.004, z=r, verts=64)
    nib.scale = (0.45, 1, 1)
    assign(nib, gold)
    parts.append(nib)
    # Nib slit and breather hole, a thin dark line along the top of the nib.
    bpy.ops.mesh.primitive_cube_add(size=1)
    slit = bpy.context.object
    slit.scale = (0.26, 0.006, 0.02)
    slit.location = (3.13, 0, r + 0.025)
    assign(slit, grip)
    parts.append(slit)
    # Clip along the top of the cap, ending in a small ball.
    bpy.ops.mesh.primitive_cube_add(size=1)
    clip = bpy.context.object
    clip.scale = (1.0, 0.05, 0.02)
    clip.location = (0.72, 0, 2 * r + 0.012)
    bev = clip.modifiers.new('b', 'BEVEL')
    bev.width = 0.008
    bev.segments = 3
    assign(clip, chrome)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.04, location=(1.22, 0, 2 * r + 0.02))
    ball = bpy.context.object
    smooth(ball)
    assign(ball, chrome)
    parts += [clip, ball]
    e = new_empty('pen')
    parent(parts, e)
    for p in parts:
        p.location.x -= 1.68
    return e


def build_phone():
    w, h, r = 2.1, 4.2, 0.36
    frame = rounded_rect('frame', w, h, r, 0.0, 0.09, bevel=0.025)
    assign(frame, mat('titanium', '#3e5664', rough=0.32, metal=1.0))
    glass = rounded_rect('glass', w - 0.04, h - 0.04, r - 0.02, 0.09, 0.095, bevel=0.004)
    assign(glass, mat('bezel', '#05090c', rough=0.08, coat=1.0))
    sw, sh = w - 0.14, h - 0.14
    screen = rounded_rect('screen', sw, sh, r - 0.07, 0.095, 0.0965)
    m, nt, b = image_mat('screen', f'{TEX}/phone.png', rough=0.05, emission=2.0, coat=1.0)
    b.inputs['Base Color'].default_value = (0, 0, 0, 1)
    # Planar UVs over the screen's own bounds.
    me = screen.data
    uv = me.uv_layers.new()
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = (co.x / sw + 0.5, co.y / sh + 0.5)
    assign(screen, m)
    # Side buttons.
    parts = [frame, glass, screen]
    for y0, y1, x in ((0.9, 1.35, -w / 2), (0.3, 0.75, -w / 2), (0.55, 1.25, w / 2)):
        bpy.ops.mesh.primitive_cube_add(size=1)
        btn = bpy.context.object
        btn.scale = (0.03, y1 - y0, 0.05)
        btn.location = (x + (0.008 if x > 0 else -0.008), (y0 + y1) / 2, 0.045)
        bv = btn.modifiers.new('b', 'BEVEL')
        bv.width = 0.012
        bv.segments = 3
        assign(btn, frame.data.materials[0])
        parts.append(btn)
    e = new_empty('phone')
    parent(parts, e)
    return e


def coin(name, radius, outer, inner, digit, x, y, z0=0.0):
    t = 0.045
    ring = lathe(f'{name}-ring', [(0, z0), (radius, z0), (radius, z0 + t), (radius - 0.025, z0 + t + 0.006), (radius * 0.69, z0 + t - 0.002), (0, z0 + t - 0.002)], 128)
    assign(ring, outer)
    core = lathe(f'{name}-core', [(0, z0 + t - 0.002), (radius * 0.68, z0 + t - 0.002), (radius * 0.67, z0 + t + 0.004), (radius * 0.64, z0 + t + 0.006), (0, z0 + t + 0.004)], 128)
    assign(core, inner)
    bpy.ops.object.text_add(location=(0, 0, z0 + t + 0.004))
    txt = bpy.context.object
    txt.data.body = digit
    txt.data.align_x = 'CENTER'
    txt.data.align_y = 'CENTER'
    txt.data.size = radius * 0.95
    txt.data.extrude = 0.004
    txt.data.bevel_depth = 0.002
    txt.data.offset_x = radius * 0.08
    assign(txt, inner)
    parts = [ring, core, txt]
    # The twelve stars of the common face, on the outer ring.
    for i in range(12):
        a = 2 * math.pi * i / 12
        bpy.ops.mesh.primitive_cone_add(vertices=5, radius1=0.016, radius2=0.0, depth=0.006, location=((radius * 0.84) * math.cos(a), (radius * 0.84) * math.sin(a), z0 + t + 0.003))
        s = bpy.context.object
        assign(s, outer)
        parts.append(s)
    e = new_empty(name)
    parent(parts, e)
    e.location = (x, y, 0)
    return e


def build_coins():
    silver = mat('nickel', '#d9dee0', rough=0.48, metal=0.8)
    brass = mat('brass', '#d8b46a', rough=0.5, metal=0.8)
    a = coin('two', 0.32, silver, brass, '2', -0.22, -0.05)
    b = coin('one', 0.29, brass, silver, '1', 0.36, 0.16, z0=0.0)
    b.rotation_euler = (0, 0, math.radians(35))
    a.rotation_euler = (0, 0, math.radians(-20))
    e = new_empty('coins')
    parent([a, b], e)
    return e


def build_paperclip():
    # The SVG path of the old drawing, in CSS px with y down, sampled into a polyline.
    pts = []

    def line(x0, y0, x1, y1, n=8):
        for i in range(n):
            pts.append((x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n))

    def arc(cx, cy, r, a0, a1, n=24):
        for i in range(n):
            a = math.radians(a0 + (a1 - a0) * i / n)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))

    line(18, 42, 18, 98)
    arc(24, 98, 6, 180, 0, 16)
    line(30, 98, 30, 18)
    arc(18, 18, 12, 0, -180, 24)
    line(6, 18, 6, 104)
    arc(21, 104, 15, 180, 0, 24)
    line(36, 104, 36, 46)
    pts.append((36, 46))
    cu = bpy.data.curves.new('clip', 'CURVE')
    cu.dimensions = '3D'
    cu.bevel_depth = 0.022
    cu.bevel_resolution = 8
    sp = cu.splines.new('POLY')
    sp.points.add(len(pts) - 1)
    for i, (x, y) in enumerate(pts):
        sp.points[i].co = ((x - 21) / 100, -(y - 62) / 100, 0.022, 1)
    o = bpy.data.objects.new('clip', cu)
    bpy.context.scene.collection.objects.link(o)
    assign(o, mat('steel', '#dfe5e8', rough=0.15, metal=1.0))
    e = new_empty('paperclip')
    o.parent = e
    return e


def build_envelope():
    w, h = 3.0, 1.9
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=60, y_subdivisions=40, size=1)
    o = bpy.context.object
    o.scale = (w, h, 1)
    bpy.ops.object.transform_apply(scale=True)
    # A sheet never lies quite flat: lift one corner and give the middle a soft swell.
    for v in o.data.vertices:
        x, y = v.co.x / (w / 2), v.co.y / (h / 2)
        v.co.z = 0.012 + 0.018 * max(0.0, (x - 0.55)) * max(0.0, (y - 0.3)) * 3 + 0.006 * (1 - x * x) * (1 - y * y)
    me = o.data
    uv = me.uv_layers.active or me.uv_layers.new()
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = (co.x / w + 0.5, co.y / h + 0.5)
    sol = o.modifiers.new('s', 'SOLIDIFY')
    sol.thickness = 0.012
    m, nt, b = image_mat('envelope', f'{TEX}/envelope.png', rough=0.7)
    add_paper_bump(m, 0.05, 220)
    assign(o, m)
    smooth(o)
    e = new_empty('envelope')
    o.parent = e
    return e


BUILDERS = {
    # name: (builder, frame width px, frame height px)
    'cup': (build_cup, 280, 260),
    'pen': (build_pen, 380, 240),
    'phone': (build_phone, 360, 520),
    'coins': (build_coins, 170, 130),
    'paperclip': (build_paperclip, 90, 150),
    'envelope': (build_envelope, 360, 280),
}


def scene(name, css_rot, out, samples):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = samples
    sc.cycles.use_denoising = True
    sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    sc.render.film_transparent = True
    # Standard keeps the brand colours of the textures (the azure stamp, the screen) as they are.
    sc.view_settings.view_transform = 'Standard'
    sc.view_settings.look = 'None'
    sc.view_settings.exposure = -1.1

    builder, fw, fh = BUILDERS[name]
    obj = builder()
    obj.rotation_euler.z += math.radians(-css_rot)

    bpy.ops.mesh.primitive_plane_add(size=40)
    bpy.context.object.is_shadow_catcher = True

    # The room: a soft gradient, brighter overhead and towards the top left of the frame, which is
    # what glossy surfaces reflect. The lights below light the scene but stay out of reflections,
    # so no hard rectangle of light ever shows on the coffee, the glass or the lacquer.
    world = bpy.data.worlds.new('w')
    sc.world = world
    world.use_nodes = True
    wt = world.node_tree
    bg = wt.nodes['Background']
    # A window up and to the left of the desk: glossy surfaces reflect a soft bright patch in that
    # direction and a dim room everywhere else, the ceiling straight above included. A black pen seen
    # from above then shows thin highlights along its length rather than a mirror of a white sky.
    tc = wt.nodes.new('ShaderNodeTexCoord')
    dot = wt.nodes.new('ShaderNodeVectorMath')
    dot.operation = 'DOT_PRODUCT'
    win = Vector((-0.55, 0.62, 0.56)).normalized()
    dot.inputs[1].default_value = win
    wt.links.new(tc.outputs['Generated'], dot.inputs[0])
    ramp = wt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].position = 0.0
    ramp.color_ramp.elements[0].color = srgb('#16303c')
    ramp.color_ramp.elements[1].position = 0.97
    ramp.color_ramp.elements[1].color = srgb('#ffffff')
    mid = ramp.color_ramp.elements.new(0.82)
    mid.color = srgb('#3d6070')
    wt.links.new(dot.outputs['Value'], ramp.inputs['Fac'])
    wt.links.new(ramp.outputs['Color'], bg.inputs['Color'])
    bg.inputs['Strength'].default_value = 1.2

    key = bpy.data.objects.new('key', bpy.data.lights.new('key', 'AREA'))
    key.data.size = 5.5
    key.data.energy = 2200
    key.location = (-3.2, 4.6, 8.5)
    key.rotation_euler = (Vector((0, 0, 0)) - key.location).to_track_quat('-Z', 'Y').to_euler()
    key.visible_glossy = False
    sc.collection.objects.link(key)
    rim = bpy.data.objects.new('rim', bpy.data.lights.new('rim', 'AREA'))
    rim.data.size = 3
    rim.data.energy = 500
    rim.data.color = srgb('#e6f1f7')[:3]
    rim.location = (5, -3, 6)
    rim.rotation_euler = (Vector((0, 0, 0)) - rim.location).to_track_quat('-Z', 'Y').to_euler()
    rim.visible_glossy = False
    sc.collection.objects.link(rim)

    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam'))
    sc.collection.objects.link(cam)
    sc.camera = cam
    cam.data.type = 'ORTHO'
    cam.data.ortho_scale = max(fw, fh) / 100
    # Off-centre a little towards the shadow, which falls down and to the right.
    cam.location = (0.12, -0.18, 30)
    cam.data.clip_end = 100
    sc.render.resolution_x = fw * PX
    sc.render.resolution_y = fh * PX
    sc.render.filepath = out
    bpy.ops.render.render(write_still=True)


if __name__ == '__main__':
    argv = sys.argv[1:]
    scene(argv[0], float(argv[1]), argv[2], int(argv[3]) if len(argv) > 3 else 96)
