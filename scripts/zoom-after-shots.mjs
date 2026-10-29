// Temporary helper for .github/workflows/slop-after-shots.yml. Serves nothing else: the temp
// workflow and this script are deleted again in the cleanup commit. Captures the home page the
// way the zoom audit did its before shots: light and dark themes, 1440 px desktop and 390 px
// phone, first screen and full page, plus one viewport shot at the Flow section. Both themes
// come from the same matchMedia call the site's inline theming script reads, so dark is the
// page's own dark mode, not a filter. This pass captures the v2 revision; the file names carry
// the v2 marker so they cannot be confused with the first revision's shots.
import { writeFile, mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173'
const OUT = 'shots'

const shots = [
    { name: 'landing-after-v2-desktop-1440-light-first-screen', viewport: [1440, 900], dark: false, mode: 'viewport' },
    { name: 'landing-after-v2-desktop-1440-dark-first-screen', viewport: [1440, 900], dark: true, mode: 'viewport' },
    { name: 'landing-after-v2-desktop-1440-light-full', viewport: [1440, 900], dark: false, mode: 'full' },
    { name: 'landing-after-v2-desktop-1440-dark-full', viewport: [1440, 900], dark: true, mode: 'full' },
    { name: 'landing-after-v2-desktop-1440-light-flow', viewport: [1440, 900], dark: false, mode: 'flow' },
    { name: 'landing-after-v2-desktop-1440-dark-flow', viewport: [1440, 900], dark: true, mode: 'flow' },
    { name: 'landing-after-v2-phone-390-light-first-screen', viewport: [390, 844], dark: false, mode: 'viewport' },
    { name: 'landing-after-v2-phone-390-dark-first-screen', viewport: [390, 844], dark: true, mode: 'viewport' },
    { name: 'landing-after-v2-phone-390-light-full', viewport: [390, 844], dark: false, mode: 'full' },
    { name: 'landing-after-v2-phone-390-dark-full', viewport: [390, 844], dark: true, mode: 'full' },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
for (const shot of shots) {
    const context = await browser.newContext({
        viewport: { width: shot.viewport[0], height: shot.viewport[1] },
        deviceScaleFactor: 1,
        colorScheme: shot.dark ? 'dark' : 'light',
    })
    const page = await context.newPage()
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(900) // the load reveal runs 0.6s

    if (shot.mode === 'full') {
        // Scroll through first so every lazy image is fetched, then back to the top; instant
        // overrides the page's CSS scroll-behavior so no step is caught mid-animation.
        await page.evaluate(async () => {
            const stepPx = Math.round(window.innerHeight * 0.7)
            await new Promise((resolve) => {
                let y = 0
                const step = () => {
                    y += stepPx
                    window.scrollTo({ top: y, behavior: 'instant' })
                    if (y >= document.body.scrollHeight + 2000) resolve()
                    else setTimeout(step, 120)
                }
                step()
            })
            window.scrollTo({ top: 0, behavior: 'instant' })
        })
        await page.waitForTimeout(500)
        await page.screenshot({ path: `${OUT}/${shot.name}.png`, fullPage: true })
    } else if (shot.mode === 'flow') {
        await page.locator('#product').scrollIntoViewIfNeeded()
        await page.waitForTimeout(1200) // let the sticky panel settle on one step
        await page.screenshot({ path: `${OUT}/${shot.name}.png` })
    } else {
        await page.screenshot({ path: `${OUT}/${shot.name}.png` })
    }

    await context.close()
    console.log(`captured ${shot.name}`)
}

await browser.close()
await writeFile(
    `${OUT}/manifest.txt`,
    JSON.stringify({ base: BASE_URL, date: new Date().toISOString(), shots: shots.map((s) => s.name) }, null, 2),
)
console.log('done')
