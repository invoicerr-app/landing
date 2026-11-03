"""Top-down renders of the desk objects for the Invoicerr home page.

Blender as a Python module (pip package `bpy`, Python 3.11). From this folder:

    uv venv --python 3.11 .venv && VIRTUAL_ENV=.venv uv pip install bpy==4.5.0
    python3 textures/shoot.py "$PWD/textures"      # the envelope face, from HTML (Playwright)
    .venv/bin/python desk.py <name> <css_rotation_deg> <out.png> [samples]

The site's files are these renders at 96 samples, trimmed and saved as WebP in public/desk/:
cup 0, envelope -9, pen 24, pen-footer (pen) -32, phone -14, coins 0, paperclip -4, paperclip-host
(paperclip) 18, paperclip-front -4 and paperclip-back -4 (the clip on the hero's
invoice, saved untrimmed so the two halves stay aligned). The bento's objects, all at 0: stamp,
stopwatch, keys, magnifier, cable and notes, then `python3 trim.py <png> <webp>` (their textures
come from `python3 textures/paper.py "$PWD/textures"`).
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
    # The screen is rendered dark: the page lays the lock screen over it in HTML (components/desk/
    # phone-screen.tsx), so its date, time and invoice number follow today. PHONE_SCREEN=marker
    # renders it pure white instead, to measure where the overlay goes.
    if os.environ.get('PHONE_SCREEN') == 'marker':
        m = bpy.data.materials.new('marker')
        m.use_nodes = True
        bm_ = m.node_tree.nodes['Principled BSDF']
        bm_.inputs['Base Color'].default_value = (0, 0, 0, 1)
        bm_.inputs['Emission Color'].default_value = (1, 1, 1, 1)
        bm_.inputs['Emission Strength'].default_value = 20
    else:
        m = mat('screen', '#0c171d', rough=0.05, coat=1.0)
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


def build_paperclip(part='all'):
    """The paperclip, whole or in the two halves that clip a sheet.

    A clip holds a sheet by its edge: the inner loop lies on the sheet, the top bend sits above the
    edge, and the long outer loop passes under the sheet. `front` is the inner loop and the bend,
    `back` the outer loop. Both are rendered in the same frame, so the page can lay the back under
    the sheet and the front over it, and the outer loop disappears under the paper.
    """
    # The SVG path of the old drawing, in CSS px with y down, sampled into polylines.
    front, back = [], []

    def line(pts, x0, y0, x1, y1, n=8):
        for i in range(n):
            pts.append((x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n))

    def arc(pts, cx, cy, r, a0, a1, n=24):
        for i in range(n):
            a = math.radians(a0 + (a1 - a0) * i / n)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))

    line(front, 18, 42, 18, 98)
    arc(front, 24, 98, 6, 180, 0, 16)
    line(front, 30, 98, 30, 18)
    arc(front, 18, 18, 12, 0, -180, 24)
    front.append((6, 18))
    line(back, 6, 18, 6, 104)
    arc(back, 21, 104, 15, 180, 0, 24)
    line(back, 36, 104, 36, 46)
    back.append((36, 46))
    paths = {'all': [front + back], 'front': [front], 'back': [back]}[part]

    steel = mat('steel', '#dfe5e8', rough=0.15, metal=1.0)
    e = new_empty('paperclip')
    for n, pts in enumerate(paths):
        cu = bpy.data.curves.new(f'clip{n}', 'CURVE')
        cu.dimensions = '3D'
        cu.bevel_depth = 0.022
        cu.bevel_resolution = 8
        cu.use_fill_caps = True
        sp = cu.splines.new('POLY')
        sp.points.add(len(pts) - 1)
        # The half on the sheet rests on its thickness, a hair above the desk.
        z = 0.022 + (0.006 if part == 'front' else 0)
        for i, (x, y) in enumerate(pts):
            sp.points[i].co = ((x - 21) / 100, -(y - 62) / 100, z, 1)
        o = bpy.data.objects.new(f'clip{n}', cu)
        bpy.context.scene.collection.objects.link(o)
        assign(o, steel)
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


# ---------------------------------------------------------------- the bento's objects


def glass_mat(name):
    m = mat(name, '#ffffff', rough=0.02)
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Transmission Weight'].default_value = 1.0
    b.inputs['IOR'].default_value = 1.5
    return m


def ring_lathe(name, profile, steps=128):
    """A lathe of a profile that does not touch the axis: closes the loop."""
    return lathe(name, profile + [profile[0]], steps)


def flat_sheet(name, w, h, tex, swell=0.006, lift=0.0, sub=(40, 24)):
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=sub[0], y_subdivisions=sub[1], size=1)
    o = bpy.context.object
    o.name = name
    o.scale = (w, h, 1)
    bpy.ops.object.transform_apply(scale=True)
    for v in o.data.vertices:
        x, y = v.co.x / (w / 2), v.co.y / (h / 2)
        v.co.z = 0.008 + lift + swell * (1 - x * x) * (1 - y * y) + 0.012 * max(0.0, x - 0.6) * max(0.0, -y - 0.2) * 4
    me = o.data
    uv = me.uv_layers.active or me.uv_layers.new()
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = (co.x / w + 0.5, co.y / h + 0.5)
    sol = o.modifiers.new('s', 'SOLIDIFY')
    sol.thickness = 0.006
    m, nt, b = image_mat(name, f'{TEX}/{tex}', rough=0.75)
    add_paper_bump(m, 0.04, 200)
    assign(o, m)
    smooth(o)
    return o


def build_stamp():
    """A rubber stamp lying on its side next to its open ink pad: the tax office's clearance."""
    tin = mat('tin', '#c4cfd4', rough=0.4, metal=0.25)
    felt = mat('felt', '#1a7aa6', rough=0.7)
    pad = rounded_rect('pad', 1.2, 0.8, 0.1, 0.0, 0.1, bevel=0.02)
    assign(pad, tin)
    ink = rounded_rect('ink', 1.06, 0.66, 0.06, 0.08, 0.108)
    assign(ink, felt)
    pad_e = new_empty('padgroup')
    parent([pad, ink], pad_e)
    pad_e.location = (-0.05, -0.5, 0)
    pad_e.rotation_euler.z = math.radians(-6)

    wood = mat('wood', '#a8774a', rough=0.42, coat=0.35, coat_rough=0.12)
    rubber = mat('rubber', '#12668d', rough=0.85)
    handle = lathe('handle', [(0, 0), (0.12, 0), (0.12, 0.04), (0.085, 0.13), (0.075, 0.5), (0.11, 0.66), (0.19, 0.78), (0.205, 0.87), (0.17, 0.96), (0.09, 1.0), (0, 1.01)])
    assign(handle, wood)
    block = rounded_rect('block', 0.45, 0.72, 0.05, -0.17, 0.0, bevel=0.02)
    assign(block, wood)
    face = rounded_rect('face', 0.41, 0.68, 0.035, -0.22, -0.17, bevel=0.008)
    assign(face, rubber)
    st = new_empty('stampbody')
    parent([handle, block, face], st)
    st.rotation_euler = (0, math.radians(90), 0)
    st.location = (-0.35, 0.32, 0.225)
    st.scale = (1.25, 1.25, 1.25)
    st.location.z = 0.28
    turn = new_empty('stampturn')
    st.parent = turn
    turn.rotation_euler.z = math.radians(8)
    e = new_empty('stamp')
    parent([pad_e, turn], e)
    return e


def build_stopwatch():
    chrome = mat('chrome', '#e8edf0', rough=0.14, metal=1.0)
    dial = mat('dial', '#f4f6f5', rough=0.55)
    ink = mat('ink', '#0f1f2a', rough=0.4)
    azure = mat('azure', '#0099cb', rough=0.35)
    parts = []
    case = lathe('case', [(0, 0), (0.6, 0), (0.65, 0.03), (0.68, 0.09), (0.67, 0.15), (0.63, 0.2), (0.58, 0.215), (0, 0.215)])
    assign(case, chrome)
    face = lathe('face', [(0, 0.19), (0.57, 0.19), (0.57, 0.22), (0, 0.22)])
    assign(face, dial)
    bezel = ring_lathe('bezel', [(0.55, 0.21), (0.615, 0.21), (0.625, 0.235), (0.6, 0.258), (0.56, 0.245)])
    assign(bezel, chrome)
    parts += [case, face, bezel]
    for i in range(60):
        a = math.pi / 2 - 2 * math.pi * i / 60
        big = i % 5 == 0
        ln = 0.075 if big else 0.04
        r = 0.5 - ln / 2
        bpy.ops.mesh.primitive_cube_add(size=1, location=(r * math.cos(a), r * math.sin(a), 0.222))
        t = bpy.context.object
        t.scale = (ln, 0.016 if big else 0.007, 0.004)
        t.rotation_euler.z = a
        assign(t, ink)
        parts.append(t)
    # A small counter at six o'clock, its own ring of ticks and a hand.
    sub = ring_lathe('sub', [(0.13, 0.221), (0.142, 0.221), (0.142, 0.224), (0.13, 0.224)], 64)
    sub.location = (0, -0.25, 0)
    assign(sub, ink)
    parts.append(sub)

    def hand(name, length, tail, width, angle, z, m, cy=0.0):
        a = math.pi / 2 - math.radians(angle)
        bpy.ops.mesh.primitive_cube_add(size=1)
        h = bpy.context.object
        h.name = name
        h.scale = (length + tail, width, 0.006)
        off = (length - tail) / 2
        h.location = (off * math.cos(a), cy + off * math.sin(a), z)
        h.rotation_euler.z = a
        assign(h, m)
        parts.append(h)

    hand('minutes', 0.36, 0.06, 0.03, 300, 0.228, ink)
    hand('subhand', 0.11, 0.02, 0.012, 140, 0.226, ink, cy=-0.25)
    hand('seconds', 0.47, 0.12, 0.012, 42, 0.236, azure)
    cap = lathe('cap', [(0, 0.24), (0.035, 0.24), (0.035, 0.25), (0, 0.255)], 48)
    assign(cap, azure)
    parts.append(cap)
    glass = lathe('glass', [(0, 0.272), (0.3, 0.266), (0.56, 0.25), (0.56, 0.246), (0.3, 0.262), (0, 0.268)])
    assign(glass, glass_mat('watchglass'))
    parts.append(glass)
    # Crown, loop and a pusher at the top, built along X then turned.
    crown_e = new_empty('crown')
    stem = cyl_x('stem', 0.6, 0.74, 0.05, z=0.1)
    knob = cyl_x('knob', 0.74, 0.88, 0.095, z=0.1)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.15, minor_radius=0.03, major_segments=64, minor_segments=16, location=(1.02, 0, 0.03))
    loop = bpy.context.object
    smooth(loop)
    for o in (stem, knob, loop):
        assign(o, chrome)
        o.parent = crown_e
    crown_e.rotation_euler.z = math.radians(90)
    push_e = new_empty('pusher')
    p1 = cyl_x('pstem', 0.6, 0.72, 0.04, z=0.1)
    p2 = cyl_x('pcap', 0.72, 0.79, 0.065, z=0.1)
    for o in (p1, p2):
        assign(o, chrome)
        o.parent = push_e
    push_e.rotation_euler.z = math.radians(50)
    e = new_empty('stopwatch')
    parent(parts + [crown_e, push_e], e)
    e.location = (0, -0.3, 0)
    return e


def key(name, metal, scale=1.0, teeth=(0.12, 0.07, 0.15, 0.09, 0.13)):
    parts = []
    bow = ring_lathe(f'{name}-bow', [(0.11, 0.0), (0.27, 0.0), (0.27, 0.05), (0.11, 0.05)], 96)
    bow.location = (-0.55, 0, 0)
    shoulder = rounded_rect(f'{name}-shoulder', 0.1, 0.2, 0.03, 0.0, 0.07, bevel=0.01)
    shoulder.location = (-0.27, 0, 0)
    shaft = cyl_x(f'{name}-shaft', -0.25, 0.62, 0.045)
    parts += [bow, shoulder, shaft]
    x = 0.12
    for depth in teeth:
        bpy.ops.mesh.primitive_cube_add(size=1)
        t = bpy.context.object
        t.scale = (0.1, depth, 0.05)
        t.location = (x, -0.03 - depth / 2, 0.025)
        b = t.modifiers.new('b', 'BEVEL')
        b.width = 0.008
        b.segments = 2
        parts.append(t)
        x += 0.1
    for o in parts:
        assign(o, metal)
    e = new_empty(name)
    parent(parts, e)
    e.scale = (scale, scale, scale)
    return e


def build_key():
    """Two keys on a split ring: the client's own way in."""
    brass = mat('brass', '#e2bd72', rough=0.42, metal=0.8)
    steel = mat('steel', '#d5dcdf', rough=0.42, metal=0.8)
    a = key('brass-key', brass)
    a.location = (0.25, 0.12, 0)
    a.rotation_euler.z = math.radians(-8)
    b = key('steel-key', steel, 0.82, (0.08, 0.12, 0.06, 0.1))
    b.location = (-0.3, -0.45, 0.06)
    b.rotation_euler.z = math.radians(-58)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.26, minor_radius=0.018, major_segments=96, minor_segments=12, location=(-0.6, -0.12, 0.06))
    ring = bpy.context.object
    ring.rotation_euler = (math.radians(6), math.radians(-10), 0)
    smooth(ring)
    assign(ring, steel)
    e = new_empty('keys')
    parent([a, b, ring], e)
    return e


def build_magnifier():
    """A magnifying glass over a till receipt: the supplier invoice, read for you."""
    rec = flat_sheet('receipt', 1.26, 2.25, 'receipt.png', swell=0.01)
    rec.location = (-0.35, 0.1, 0)
    rec.rotation_euler.z = math.radians(-7)
    top = lambda r: 0.15 + 0.035 * (1 - (r / 0.46) ** 2)
    bot = lambda r: 0.07 - 0.03 * (1 - (r / 0.46) ** 2)
    steps = [0.46 * i / 10 for i in range(11)]
    prof = [(r, top(r)) for r in steps] + [(0.46, 0.11)] + [(r, bot(r)) for r in reversed(steps)]
    lens = lathe('lens', prof)
    assign(lens, glass_mat('lens'))
    chrome = mat('chrome', '#e8edf0', rough=0.14, metal=1.0)
    lacquer = mat('lacquer', '#0f1f2a', rough=0.35, coat=0.7, coat_rough=0.06)
    rim = ring_lathe('rim', [(0.45, 0.05), (0.52, 0.05), (0.53, 0.1), (0.52, 0.17), (0.45, 0.17)])
    assign(rim, chrome)
    neck = cyl_x('neck', 0.52, 0.72, 0.045, z=0.11)
    assign(neck, chrome)
    handle = cyl_x('handle', 0.72, 1.7, 0.085, 0.075, z=0.09, cap_round=0.0)
    assign(handle, lacquer)
    end = cyl_x('end', 1.7, 1.76, 0.07, 0.04, z=0.09)
    assign(end, chrome)
    g = new_empty('glass')
    parent([lens, rim, neck, handle, end], g)
    g.location = (-0.32, -0.42, 0)
    g.rotation_euler.z = math.radians(-28)
    e = new_empty('magnifier')
    parent([rec, g], e)
    return e


def plug(name, x, y, z, angle, body, metal):
    parts = []
    relief = cyl_x(f'{name}-relief', 0.0, 0.16, 0.042, 0.05, z=0)
    housing = rounded_rect(f'{name}-housing', 0.42, 0.19, 0.06, -0.05, 0.05, bevel=0.02)
    housing.location = (0.37, 0, 0)
    tip = rounded_rect(f'{name}-tip', 0.16, 0.085, 0.035, -0.02, 0.02, bevel=0.006)
    tip.location = (0.65, 0, 0)
    assign(relief, body)
    assign(housing, body)
    assign(tip, metal)
    parts = [relief, housing, tip]
    e = new_empty(name)
    parent(parts, e)
    e.location = (x, y, z)
    e.rotation_euler.z = angle
    return e


def build_cable():
    """A coiled USB-C cable, a plug at each end: the API and the MCP server plug in."""
    rubber = mat('rubber', '#22343f', rough=0.5, coat=0.2)
    body = mat('plugbody', '#dfe4e7', rough=0.3, metal=0.4)
    metal = mat('metal', '#e8edf0', rough=0.12, metal=1.0)
    r = 0.035
    pts = []
    # In from the left, a coil of one and a half turns, out to the right.
    for i in range(20):
        t = i / 20
        pts.append((-1.12 + 0.62 * t, 0.34 - 0.1 * t, r))
    turns = 2.3
    n = 240
    for i in range(n + 1):
        t = i / n
        a = math.radians(160) - 2 * math.pi * turns * t
        rad = 0.44 + 0.07 * math.sin(t * math.pi * 5) + 0.1 * t
        pts.append((0.02 + rad * math.cos(a) * 1.08, -0.02 + rad * math.sin(a), r + 0.07 * t))
    last = pts[-1]
    for i in range(1, 21):
        t = i / 20
        pts.append((last[0] + (1.08 - last[0]) * t, last[1] + (-0.38 - last[1]) * t, last[2] + (r - last[2]) * t))
    cu = bpy.data.curves.new('cable', 'CURVE')
    cu.dimensions = '3D'
    cu.bevel_depth = r
    cu.bevel_resolution = 6
    cu.use_fill_caps = True
    sp = cu.splines.new('POLY')
    sp.points.add(len(pts) - 1)
    for i, (x, y, z) in enumerate(pts):
        sp.points[i].co = (x, y, z, 1)
    o = bpy.data.objects.new('cable', cu)
    bpy.context.scene.collection.objects.link(o)
    assign(o, rubber)
    # Smooth the polyline into a subdivided curve so it reads as one soft cable.
    sp.type = 'POLY'
    a0 = math.atan2(pts[0][1] - pts[1][1], pts[0][0] - pts[1][0])
    a1 = math.atan2(pts[-1][1] - pts[-2][1], pts[-1][0] - pts[-2][0])
    p0 = plug('plug-a', pts[0][0], pts[0][1], 0.05, a0, body, metal)
    p1 = plug('plug-b', pts[-1][0], pts[-1][1], 0.05, a1, body, metal)
    e = new_empty('cable')
    parent([o, p0, p1], e)
    e.scale = (0.82, 0.82, 0.82)
    return e


def build_notes():
    """Three banknotes fanned out: multi-currency, with rate history."""
    sheets = []
    for i, (tex, angle, dx, dy) in enumerate((('note-rose.png', 16, 0.18, 0.2), ('note-green.png', 4, 0.05, 0.02), ('note-azure.png', -9, -0.08, -0.18))):
        s = flat_sheet(f'note{i}', 1.62, 0.83, tex, swell=0.008, lift=0.006 * i, sub=(36, 18))
        s.location = (dx, dy, 0)
        s.rotation_euler.z = math.radians(angle)
        sheets.append(s)
    e = new_empty('notes')
    parent(sheets, e)
    return e


BENTO = {'stamp', 'stopwatch', 'keys', 'magnifier', 'cable', 'notes'}

BUILDERS = {
    # name: (builder, frame width px, frame height px)
    'cup': (build_cup, 280, 260),
    'pen': (build_pen, 380, 240),
    'phone': (build_phone, 360, 520),
    'coins': (build_coins, 170, 130),
    'paperclip': (build_paperclip, 90, 150),
    'paperclip-front': (lambda: build_paperclip('front'), 90, 150),
    'paperclip-back': (lambda: build_paperclip('back'), 90, 150),
    'envelope': (build_envelope, 360, 280),
    'stamp': (build_stamp, 300, 240),
    'stopwatch': (build_stopwatch, 240, 270),
    'keys': (build_key, 270, 200),
    'magnifier': (build_magnifier, 300, 300),
    'cable': (build_cable, 300, 220),
    'notes': (build_notes, 300, 220),
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
    # A fill, not a second sun, for the bento's objects: the stamp and the stopwatch are tall enough
    # to throw a second shadow up and to the left otherwise. The hero's objects were rendered with it.
    if name in BENTO:
        rim.data.use_shadow = False
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
