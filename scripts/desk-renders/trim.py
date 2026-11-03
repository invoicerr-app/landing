"""Turns a render of one of the bento's objects into its WebP in public/desk/.

    python3 trim.py <render.png> <out.webp>

The shadow catcher leaves a faint, even film of shadow over the whole frame (the room's light,
occluded by the floor itself). On the paper-white cards of the bento it shows as a grey rectangle,
so the alpha channel is lowered by that floor, read in the four corners, and the image is trimmed
to what is left, plus a few pixels. The printed size is the CSS size (the file is 2x).
"""
import sys

from PIL import Image

src, out = sys.argv[1:3]
im = Image.open(src).convert('RGBA')
r, g, b, a = im.split()
corners = [(2, 2), (im.width - 3, 2), (2, im.height - 3), (im.width - 3, im.height - 3)]
floor = max(a.getpixel(c) for c in corners) + 3
a = a.point(lambda v: 0 if v <= floor else round((v - floor) * 255 / (255 - floor)))
im = Image.merge('RGBA', (r, g, b, a))
left, top, right, bottom = a.point(lambda v: 255 if v > 4 else 0).getbbox()
pad = 6
left, top = max(0, left - pad), max(0, top - pad)
right, bottom = min(im.width, right + pad), min(im.height, bottom + pad)
# Even sizes, so the CSS size is a whole number of pixels.
if (right - left) % 2:
    right = right + 1 if right < im.width else right
if (right - left) % 2:
    left -= 1
if (bottom - top) % 2:
    bottom = bottom + 1 if bottom < im.height else bottom
if (bottom - top) % 2:
    top -= 1
crop = im.crop((left, top, right, bottom))
crop.save(out, 'WEBP', quality=86, method=6)
print(f'{out}: {crop.width // 2} x {crop.height // 2} CSS px')
