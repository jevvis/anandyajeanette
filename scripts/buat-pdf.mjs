// Membuat ulang berkas PDF (ID dan EN) dari halaman /cetak ke folder public/.
// Pakai: jalankan situs dulu, lalu `npm run pdf -- http://localhost:3013`
// Setelah PDF dibuat, build ulang situs (`next start` hanya melayani berkas public yang ada saat dinyalakan).
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const base = (process.argv[2] || 'http://localhost:3013').replace(/\/$/, '')
const { namaBerkas } = JSON.parse(readFileSync(join(root, 'lib', 'print.json'), 'utf8'))

const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => p && existsSync(p))
if (!chrome) throw new Error('Chrome tidak ditemukan. Isi variabel CHROME_PATH.')

const res = await fetch(`${base}/cetak`).catch(() => null)
if (!res?.ok) throw new Error(`Halaman ${base}/cetak tidak bisa dibuka. Jalankan situsnya dulu.`)

for (const [suffix, locale] of [['ID', 'id-ID'], ['EN', 'en-US']]) {
  const out = join(root, 'public', `${namaBerkas}-${suffix}.pdf`)
  const before = existsSync(out) ? statSync(out).mtimeMs : 0
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--lang=${locale}`,
    '--virtual-time-budget=20000', `--print-to-pdf=${out}`, `${base}/cetak`,
  ], { stdio: 'ignore' })
  if (!existsSync(out) || statSync(out).mtimeMs === before) throw new Error(`PDF ${suffix} gagal dibuat.`)
  console.log(`${suffix}: ${out} (${(statSync(out).size / 1e6).toFixed(1)} MB)`)
}
