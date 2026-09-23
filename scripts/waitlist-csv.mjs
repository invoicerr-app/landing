// The waiting list as CSV, in one command:
//
//   npm run waitlist:csv              the real KV namespace, needs CLOUDFLARE_API_TOKEN
//   npm run waitlist:csv -- --local   the local KV that `wrangler dev` writes to
//   npm run waitlist:csv -- --out list.csv
//
// The list is never reachable over HTTP: the Worker has no endpoint that returns an address, a row
// or a count. This script reads KV through wrangler, with the account credentials, and that is the
// only way out.
import { execFile } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const run = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const args = process.argv.slice(2)
const local = args.includes('--local')
const outIndex = args.indexOf('--out')
const out = outIndex === -1 ? null : args[outIndex + 1]

const scope = local ? '--local' : '--remote'
const binding = ['--binding', 'WAITLIST', '--config', path.join(root, 'wrangler.toml'), scope]

async function wrangler(argv) {
    // No WRANGLER_LOG override here: setting it to `error` silences the JSON these commands print
    // on stdout as well, and the export comes back empty with no error to show for it.
    const { stdout } = await run('npx', ['--no-install', 'wrangler', ...argv], {
        cwd: root,
        maxBuffer: 64 * 1024 * 1024,
    })
    return stdout
}

// wrangler prints a banner on some commands; the JSON is the first [ ... ] or { ... } in the output.
function parseJson(stdout) {
    const start = stdout.search(/[[{]/)
    if (start === -1) throw new Error(`no JSON in wrangler output:\n${stdout}`)
    return JSON.parse(stdout.slice(start))
}

function csvCell(value) {
    const text = value === undefined || value === null ? '' : String(value)
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

const COLUMNS = ['email', 'country', 'companySize', 'language', 'referer', 'createdAt', 'updatedAt']
const HEADER = ['email', 'country', 'company_size', 'page_language', 'came_from', 'created_at', 'updated_at']

const keys = parseJson(await wrangler(['kv', 'key', 'list', ...binding, '--prefix', 'entry:']))

const rows = []
// A handful at a time: one wrangler call per key, and the list is not meant to be huge.
for (let index = 0; index < keys.length; index += 8) {
    const slice = keys.slice(index, index + 8)
    const values = await Promise.all(slice.map((key) => wrangler(['kv', 'key', 'get', key.name, ...binding])))
    for (const value of values) rows.push(JSON.parse(value.slice(value.search(/[{[]/))))
}

rows.sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))

const csv = [HEADER.join(','), ...rows.map((row) => COLUMNS.map((column) => csvCell(row[column])).join(','))].join('\n')

if (out) {
    await writeFile(out, `${csv}\n`)
    process.stderr.write(`${rows.length} row(s) written to ${out}\n`)
} else {
    process.stdout.write(`${csv}\n`)
}
