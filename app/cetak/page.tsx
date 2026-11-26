import type { Metadata } from 'next'
import PrintDocument from '@/components/PrintDocument'

// halaman sumber berkas PDF (dipakai `npm run pdf`); tidak ditautkan dari situs
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function CetakPage() {
  return <PrintDocument />
}
