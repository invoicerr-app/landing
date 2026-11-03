"""Flat textures for the bento's objects, drawn with Pillow: a till receipt and three banknotes.

    python3 textures/paper.py "$PWD/textures"

Nothing on them is readable on purpose (grey bars for the receipt's lines, a numeral and engraving
on the notes): the page carries the words, the images only carry the object.
"""
import math
import sys

from PIL import Image, ImageDraw, ImageFilter

out = sys.argv[1]


def receipt():
    w, h = 560, 1000
    im = Image.new('RGB', (w, h), '#f3f1ec')
    d = ImageDraw.Draw(im)
    ink = (62, 68, 72)
    faint = (150, 155, 158)
    # Header: a logo block and two centred lines.
    d.rounded_rectangle((220, 60, 340, 110), 10, fill=ink)
    for y, half in ((140, 150), (170, 110)):
        d.rounded_rectangle((w / 2 - half, y, w / 2 + half, y + 12), 6, fill=faint)
    # A dashed rule, then item lines with a price at the right.
    def rule(y):
        for x in range(40, w - 40, 22):
            d.rectangle((x, y, x + 12, y + 3), fill=faint)
    rule(220)
    y = 260
    for left, right in ((260, 90), (200, 80), (300, 100), (170, 70), (240, 90), (210, 80)):
        d.rounded_rectangle((40, y, 40 + left, y + 14), 7, fill=ink)
        d.rounded_rectangle((w - 40 - right, y, w - 40, y + 14), 7, fill=ink)
        d.rounded_rectangle((40, y + 26, 40 + left * 0.45, y + 36), 5, fill=faint)
        y += 72
    rule(y + 4)
    y += 40
    # The total, set heavier.
    d.rounded_rectangle((40, y, 200, y + 26), 10, fill=ink)
    d.rounded_rectangle((w - 220, y, w - 40, y + 26), 10, fill=ink)
    y += 70
    for half in (170, 120):
        d.rounded_rectangle((w / 2 - half, y, w / 2 + half, y + 10), 5, fill=faint)
        y += 30
    # A barcode at the foot.
    x = 120
    i = 0
    while x < w - 120:
        bw = (3, 6, 2, 4, 8, 3)[i % 6]
        d.rectangle((x, y + 30, x + bw, y + 120), fill=ink)
        x += bw + (4, 3, 6, 2)[i % 4]
        i += 1
    im = im.filter(ImageFilter.GaussianBlur(0.8))
    im.save(f'{out}/receipt.png')


def note(name, base, deep, light, numeral):
    w, h = 1400, 720
    im = Image.new('RGB', (w, h), base)
    d = ImageDraw.Draw(im)
    # Guilloche: interleaved sine waves across the note, as engraving does.
    for k in range(46):
        pts = []
        for x in range(0, w + 1, 8):
            y = h / 2 + (k - 23) * 14 + 26 * math.sin(x / 70 + k * 0.45) * math.sin(x / 340)
            pts.append((x, y))
        d.line(pts, fill=light, width=2)
    # Watermark disc on the left, a rosette on the right.
    d.ellipse((90, 160, 490, 560), fill=light)
    for a in range(0, 360, 10):
        r = math.radians(a)
        cx, cy = 1050, 360
        d.line((cx, cy, cx + 210 * math.cos(r), cy + 210 * math.sin(r)), fill=deep, width=3)
    d.ellipse((1050 - 120, 360 - 120, 1050 + 120, 360 + 120), fill=base, outline=deep, width=6)
    # Frame and the numeral, in the deep colour.
    d.rounded_rectangle((26, 26, w - 26, h - 26), 22, outline=deep, width=8)
    from PIL import ImageFont
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 190)
    except OSError:
        font = ImageFont.load_default()
    d.text((80, 40), numeral, fill=deep, font=font)
    d.text((1050, 360), numeral, fill=deep, font=font, anchor='mm')
    im = im.filter(ImageFilter.GaussianBlur(1.0))
    im.save(f'{out}/note-{name}.png')


receipt()
note('azure', '#9fd3ea', '#1f6f92', '#c4e6f4', '20')
note('green', '#b9d8b4', '#3f7348', '#d6ead2', '50')
note('rose', '#e9b9b4', '#9a4a45', '#f4d6d2', '100')
