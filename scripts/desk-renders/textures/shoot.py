import sys
from playwright.sync_api import sync_playwright
d=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(args=['--allow-file-access-from-files'])
    for name,w,h in [('phone',1000,2060),('envelope',1500,950)]:
        pg=b.new_page(viewport={'width':w,'height':h})
        pg.goto(f'file://{d}/{name}.html'); pg.wait_for_timeout(600)
        pg.screenshot(path=f'{d}/{name}.png'); pg.close()
    b.close()
