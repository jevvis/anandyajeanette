'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { links } from '@/lib/links'
import cfg from '@/lib/print.json'

/**
 * Versi PDF (halaman /cetak). Berkas PDF dibuat dari halaman ini dengan `npm run pdf`,
 * lalu diunduh lewat tombol "PDF" di header. 17 halaman A4 lanskap, tema hitam + krem.
 */
const INK = '#141414'
const PAPER = '#f3ecdf'
const CREAM = '#ecdcc2'
const TAN = '#c9a96e'
const BROWN = '#7d5f34'
const MUTED = '#675d52'
const OSW = 'var(--font-oswald), Impact, sans-serif'
const DEEP = 'linear-gradient(160deg, #3a2f20 0%, #17130f 100%)'
const TOTAL = 17
const PH = '209.6mm'

const list = (n: number, from = 1) => Array.from({ length: n }, (_, k) => k + from)
const parts = (s: string) => s.split('|').map((x) => x.trim()).filter(Boolean)
const dash = (s: string) => s.replace(/\s—\s/g, ' – ')

function Waves({ c, o }: { c: string; o: number }) {
  return (
    <svg viewBox="0 0 1440 800" preserveAspectRatio="none" style={{ position: 'absolute', left: '-14mm', top: '-13mm', width: '297mm', height: PH, opacity: o }} fill="none" stroke={c} role="presentation">
      <path d="M0 200C300 100 400 300 720 200C1040 100 1140 300 1440 200" strokeWidth="2.4" />
      <path d="M0 400C300 300 400 500 720 400C1040 300 1140 500 1440 400" strokeWidth="2.4" />
      <path d="M0 600C300 500 400 700 720 600C1040 500 1140 700 1440 600" strokeWidth="2.4" />
    </svg>
  )
}

type Tone = 'paper' | 'dark' | 'deep'
const pal = (tone: Tone) =>
  tone === 'paper'
    ? { bg: PAPER, fg: INK, acc: BROWN, soft: MUTED, body: '#2b2620' }
    : { bg: tone === 'dark' ? INK : DEEP, fg: '#fff', acc: CREAM, soft: '#bfb19a', body: '#e9e2d6' }

function Page({ n, tone, foot, children }: { n: number; tone: Tone; foot?: string; children: ReactNode }) {
  const p = pal(tone)
  const footer = foot ?? p.soft
  return (
    <section className="pd-page" style={{ background: p.bg, color: p.fg }}>
      <div className="pd-body">
        <Waves c={tone === 'paper' ? INK : CREAM} o={tone === 'paper' ? 0.06 : 0.1} />
        {children}
      </div>
      <footer className="pd-foot" style={{ color: footer, borderColor: footer, zIndex: 5 }}>
        <span>{cfg.namaLengkap.toUpperCase()}</span>
        <span>{String(n).padStart(2, '0')} / {TOTAL}</span>
      </footer>
    </section>
  )
}

function Giant({ text, id, em, fade = 0.95 }: { text: string; id: string; em: number; fade?: number }) {
  const W = 1000
  const cap = em * 0.76
  const H = Math.round(cap + em * 0.1)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }} role="presentation">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={CREAM} />
          <stop offset="0.4" stopColor={CREAM} />
          <stop offset={fade} stopColor={CREAM} stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="0" y={cap + em * 0.04} textLength={W} lengthAdjust="spacingAndGlyphs" fill={`url(#${id})`} style={{ fontFamily: OSW, fontWeight: 700, fontSize: em }}>{text}</text>
    </svg>
  )
}

const Photo = ({ src, w, h, pos = 'center', fit = 'cover', style }: { src: string; w: string; h: string; pos?: string; fit?: 'cover' | 'contain'; style?: CSSProperties }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt="" style={{ width: w, height: h, objectFit: fit, objectPosition: pos, display: 'block', flex: 'none', ...style }} />
)
const Label = ({ children, c }: { children: ReactNode; c: string }) => (
  <p style={{ fontSize: 7.5, letterSpacing: '0.26em', fontWeight: 700, color: c, textTransform: 'uppercase' }}>{children}</p>
)
const Title = ({ children, size = '28pt' }: { children: ReactNode; size?: string }) => (
  <h2 style={{ fontFamily: OSW, fontSize: size, fontWeight: 700, lineHeight: 1.04, textTransform: 'uppercase', marginTop: 3 }}>{children}</h2>
)

function Head({ label, title, sub, tone }: { label: string; title: string; sub?: string; tone: Tone }) {
  const p = pal(tone)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10mm' }}>
      <div>
        <Label c={p.acc}>{label}</Label>
        <Title>{title}</Title>
      </div>
      {sub ? <p style={{ fontSize: '9pt', lineHeight: 1.5, maxWidth: '110mm', textAlign: 'right', color: p.soft, marginBottom: 2 }}>{sub}</p> : null}
    </div>
  )
}

function Bullets({ text, size, color }: { text: string; size: string; color: string }) {
  return (
    <ul style={{ marginTop: 6, paddingLeft: 11, fontSize: size, lineHeight: 1.46, listStyle: 'square', color }}>
      {parts(text).map((x) => <li key={x} style={{ marginBottom: 3 }}>{x}</li>)}
    </ul>
  )
}

export default function PrintDocument() {
  const { t, lang } = useLanguage()

  const Links = ({ id, color }: { id: string; color: string }) => {
    const items = links[id] ?? []
    if (!items.length) return null
    return (
      <p style={{ fontSize: '8pt', fontWeight: 800, marginTop: 5, display: 'flex', flexWrap: 'wrap', gap: '4mm' }}>
        {items.map((l) => (
          <a key={l.url} href={l.url} style={{ color, textDecoration: 'underline' }}>{lang === 'en' ? l.en : l.id} ↗</a>
        ))}
      </p>
    )
  }

  // satu kartu cerita: foto, periode, judul, peran, poin
  const Card = ({ prefix, i, tone, imgs, h, size = '8.4pt', title = '15.5pt' }: { prefix: string; i: number; tone: Tone; imgs: string[]; h: string; size?: string; title?: string }) => {
    const p = pal(tone)
    return (
      <div>
        {imgs.length ? (
          <div style={{ display: 'flex', gap: '3mm' }}>
            {imgs.map((src) => <Photo key={src} src={`/galeri/${src}.jpg`} w={`calc((100% - ${(imgs.length - 1) * 3}mm) / ${imgs.length})`} h={h} style={{ borderRadius: '4mm', border: `0.3mm solid ${TAN}` }} />)}
          </div>
        ) : (
          <div style={{ height: h, borderRadius: '4mm', background: `linear-gradient(150deg, ${CREAM} 0%, ${TAN} 100%)`, color: INK, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 9mm' }}>
            <Label c={INK}>{t(`${prefix}.${i}.sub`)}</Label>
            <p style={{ fontFamily: OSW, fontSize: h === '47mm' ? '18pt' : '26pt', fontWeight: 700, lineHeight: 1.12, textTransform: 'uppercase', marginTop: 6 }}>{parts(t(`${prefix}.${i}.tags`)).join(' · ')}</p>
          </div>
        )}
        <p style={{ fontFamily: OSW, fontSize: '12pt', fontWeight: 600, color: p.acc, marginTop: 9 }}>{dash(t(`${prefix}.${i}.period`))}</p>
        <h3 style={{ fontFamily: OSW, fontSize: title, fontWeight: 700, lineHeight: 1.12, textTransform: 'uppercase', marginTop: 2 }}>{t(`${prefix}.${i}.inst`)}</h3>
        <p style={{ fontSize: '8.4pt', fontWeight: 700, color: p.soft, marginTop: 3, lineHeight: 1.35 }}>{t(`${prefix}.${i}.role`)} · {t(`${prefix}.${i}.sub`)}</p>
        <Bullets text={t(`${prefix}.${i}.desc`)} size={size} color={p.body} />
        <Links id={`${prefix}.${i}`} color={p.acc} />
      </div>
    )
  }

  const projectPages: { n: number; tone: Tone; items: [number, string[]][] }[] = [
    { n: 7, tone: 'paper', items: [[1, ['proj-1-1']], [2, ['proj-2-1']]] },
    { n: 8, tone: 'dark', items: [[3, ['proj-3-2']], [4, []]] },
    { n: 9, tone: 'paper', items: [[5, ['proj-5-2']], [6, ['proj-6-1']]] },
    { n: 10, tone: 'deep', items: [[7, ['proj-7-1']], [8, ['proj-8-1']]] },
  ]
  const trio: { n: number; tone: Tone; prefix: string; imgs: string[][] }[] = [
    { n: 11, tone: 'dark', prefix: 'media', imgs: [['media-1-1'], ['media-2-1'], []] },
    { n: 12, tone: 'paper', prefix: 'biz', imgs: [['biz-1-1'], ['biz-2-1'], ['biz-3-1']] },
    { n: 13, tone: 'deep', prefix: 'vol', imgs: [['vol-1-1'], ['vol-2-1'], ['vol-3-1']] },
  ]

  const Cert = ({ i, w, h }: { i: number; w: string; h: string }) => (
    <div style={{ width: w }}>
      <div style={{ background: '#fff', padding: '1.4mm', boxShadow: '0 2mm 5mm rgba(0,0,0,.18)', borderRadius: '1mm' }}>
        <Photo src={`/galeri/cert-${i}.jpg`} w="100%" h={h} fit="contain" />
      </div>
      <h3 style={{ fontSize: '8.2pt', fontWeight: 800, lineHeight: 1.22, marginTop: 4 }}>{t(`award.${i}.title`)}</h3>
      <p style={{ fontSize: '7pt', color: MUTED, marginTop: 1, lineHeight: 1.3 }}>{[t(`award.${i}.issuer`), t(`award.${i}.year`)].filter(Boolean).join(' · ')}</p>
    </div>
  )

  return (
    <div className="print-doc">
      {/* 1. Sampul */}
      <Page n={1} tone="dark">
        <div style={{ position: 'absolute', left: '50%', bottom: '-40mm', width: '180mm', height: '180mm', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,.42) 0%, rgba(201,169,110,.12) 48%, rgba(201,169,110,0) 70%)' }} />
        <div style={{ position: 'relative', height: '100%' }}>
          <p style={{ position: 'absolute', top: 0, left: 0, fontSize: 8, letterSpacing: '0.3em', fontWeight: 700, color: CREAM }}>{t('hero.based1')} · {t('hero.based2')}</p>
          <p style={{ position: 'absolute', top: 0, right: 0, fontSize: 8, letterSpacing: '0.3em', fontWeight: 700, color: '#bdbdbd' }}>{cfg.tahun}</p>
          <div style={{ position: 'absolute', top: '9mm', left: 0, right: 0 }}><Giant text="PORTFOLIO" id="gpf" em={222} /></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/profile.png" alt="" style={{ position: 'absolute', left: '50%', bottom: '3mm', transform: 'translateX(-50%)', height: '150mm', width: 'auto' }} />
          <div style={{ position: 'absolute', left: 0, bottom: '9mm', width: '92mm' }}>
            <p style={{ fontSize: '11pt', color: '#bdbdbd' }}>{t('hero.hey')}</p>
            <p style={{ fontFamily: OSW, fontSize: '28pt', fontWeight: 700, lineHeight: 1.08, textTransform: 'uppercase', marginTop: 2 }}>{cfg.namaBaris.map((b) => <span key={b} style={{ display: 'block' }}>{b}</span>)}</p>
            <p style={{ fontSize: '9.2pt', lineHeight: 1.5, marginTop: 8, maxWidth: '84mm', color: '#e5e5e5' }}>{t('hero.tagline')}</p>
          </div>
          <div style={{ position: 'absolute', right: 0, bottom: '9mm', width: '84mm', textAlign: 'right' }}>
            <p style={{ fontFamily: OSW, fontSize: '18pt', fontWeight: 600, lineHeight: 1.15, textTransform: 'uppercase', color: CREAM }}>{t('hero.role1')}</p>
            <p style={{ fontSize: '9.4pt', color: '#e5e5e5', marginTop: 5 }}>{t('hero.role2')}</p>
            <p style={{ fontSize: '8.4pt', color: '#a99f90', marginTop: 9, lineHeight: 1.6 }}>{t('hero.badge.major')}<br />{t('hero.badge.medal')}<br />{t('hero.badge.event')}</p>
          </div>
        </div>
      </Page>

      {/* 2. Tentang */}
      <Page n={2} tone="paper" foot={INK}>
        <div style={{ position: 'absolute', left: '-14mm', top: '-13mm', width: '126mm', height: PH, background: `linear-gradient(165deg, ${CREAM} 0%, ${TAN} 100%)` }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '98mm 1fr', gap: '22mm', height: '100%' }}>
          <div style={{ color: INK }}>
            <Label c={INK}>{t('about.label')}</Label>
            <Title size="29pt">{t('about.title')}</Title>
            <p style={{ fontSize: '10pt', lineHeight: 1.62, marginTop: 12, textAlign: 'justify' }}>{t('about.bio1')}</p>
            <p style={{ fontSize: '12pt', fontStyle: 'italic', lineHeight: 1.45, marginTop: 13, padding: '3mm 0 0', borderTop: '1px solid rgba(20,20,20,.5)' }}>{t('about.quote')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5mm' }}>
              {['ipk', 'medal', 'org', 'toefl'].map((k) => (
                <div key={k} style={{ background: INK, color: '#fff', borderRadius: '5mm', padding: '5mm 6mm' }}>
                  <p style={{ fontFamily: OSW, fontSize: '36pt', fontWeight: 700, lineHeight: 1, color: CREAM }}>{t(`metric.${k}.v`)}</p>
                  <p style={{ fontSize: 7.4, letterSpacing: '0.12em', fontWeight: 800, marginTop: 6 }}>{t(`metric.${k}`)}</p>
                  <p style={{ fontSize: '8pt', color: '#a99f90', marginTop: 2, lineHeight: 1.35 }}>{t(`metric.${k}.sub`)}</p>
                </div>
              ))}
            </div>
            <div>
              <Label c={BROWN}>{t('trait.card.label')}</Label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '7mm', rowGap: '4mm', marginTop: 6 }}>
                {list(4).map((i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '8mm 1fr', gap: '2mm' }}>
                    <span style={{ width: '8mm', height: '8mm', borderRadius: '50%', background: INK, color: CREAM, fontFamily: OSW, fontWeight: 700, fontSize: '11pt', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i}</span>
                    <div>
                      <p style={{ fontSize: '11pt', fontWeight: 800, lineHeight: 1.1 }}>{t(`trait.${i}.title`)}</p>
                      <p style={{ fontSize: '8.4pt', lineHeight: 1.45, color: '#3a332a', marginTop: 2 }}>{t(`trait.${i}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: INK, color: '#fff', borderRadius: 99, padding: '3mm 6mm', display: 'flex', gap: '5mm', alignItems: 'center' }}>
              <p style={{ fontSize: 7, letterSpacing: '0.2em', fontWeight: 800, color: CREAM, width: '20mm' }}>{t('about.current.label')}</p>
              {list(3).map((i) => <p key={i} style={{ fontSize: '8.4pt', lineHeight: 1.3, flex: 1 }}><b>{t(`about.current.${i}.title`)}</b></p>)}
            </div>
          </div>
        </div>
      </Page>

      {/* 3. Pendidikan */}
      <Page n={3} tone="dark">
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 104mm', gap: '12mm', height: '100%', alignItems: 'center' }}>
          <div>
            <Label c={CREAM}>{t('education.title')} · {t('education.label')}</Label>
            <p style={{ fontFamily: OSW, fontSize: '20pt', fontWeight: 600, color: TAN, marginTop: 12 }}>{dash(t('education.1.period'))}</p>
            <h2 style={{ fontFamily: OSW, fontSize: '36pt', fontWeight: 700, lineHeight: 1.06, textTransform: 'uppercase', marginTop: 4 }}>{t('education.1.institution')}</h2>
            <p style={{ fontSize: '15pt', fontWeight: 800, color: CREAM, marginTop: 10 }}>{t('education.1.program')}</p>
            <p style={{ fontSize: '10pt', color: '#bfb19a', marginTop: 4, maxWidth: '130mm' }}>{t('education.1.degree')}</p>
            <div style={{ display: 'flex', gap: '8mm', alignItems: 'center', marginTop: 16 }}>
              <div style={{ width: '33mm', height: '33mm', borderRadius: '50%', background: CREAM, color: INK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-8deg)', flex: 'none' }}>
                <span style={{ fontFamily: OSW, fontWeight: 700, fontSize: '23pt', lineHeight: 1 }}>{t('education.1.gpa')}</span>
                <span style={{ fontSize: 6.6, letterSpacing: '0.14em', fontWeight: 800, marginTop: 2 }}>{t('education.gpa.label')}</span>
              </div>
              <div>
                <p style={{ fontSize: '10pt', lineHeight: 1.55, color: '#e9e2d6', maxWidth: '100mm' }}>{t('education.1.desc')}</p>
                <Bullets text={list(4).map((h) => t(`education.1.h${h}`)).join('|')} size="9.4pt" color="#e9e2d6" />
              </div>
            </div>
          </div>
          <Photo src="/galeri/edu-1-logo.jpg" w="104mm" h="138.7mm" fit="contain" style={{ borderRadius: '6mm', border: `0.5mm solid ${TAN}`, background: '#fff' }} />
        </div>
      </Page>

      {/* 4. Magang */}
      <Page n={4} tone="paper">
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '112mm 1fr', gap: '10mm', height: '100%' }}>
          <div>
            <Label c={BROWN}>{t('work.label')}</Label>
            <Title size="23pt">{t('work.1.role')}</Title>
            <p style={{ fontFamily: OSW, fontSize: '13pt', fontWeight: 600, color: BROWN, marginTop: 6 }}>{dash(t('work.1.period'))}</p>
            <p style={{ fontSize: '10.5pt', fontWeight: 800, marginTop: 4 }}>{t('work.1.inst')}</p>
            <p style={{ fontSize: '8.4pt', fontWeight: 700, color: MUTED, marginTop: 2, lineHeight: 1.4 }}>{t('work.1.sub')}</p>
            <Bullets text={t('work.1.desc')} size="9.2pt" color="#2b2620" />
            <p style={{ fontSize: '8.4pt', fontWeight: 800, color: BROWN, marginTop: 6 }}>{parts(t('work.1.tags')).join('  ·  ')}</p>
          </div>
          <div style={{ alignSelf: 'center' }}>
            <Photo src="/galeri/work-1-1.jpg" w="147mm" h="82.7mm" style={{ borderRadius: '5mm' }} />
            <div style={{ display: 'flex', gap: '3mm', marginTop: '3mm' }}>
              {list(3, 2).map((m) => <Photo key={m} src={`/galeri/work-1-${m}.jpg`} w="47mm" h="26.4mm" style={{ borderRadius: '3mm' }} />)}
            </div>
          </div>
        </div>
      </Page>

      {/* 5. Media sosial */}
      <Page n={5} tone="deep">
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '120mm 1fr', gap: '10mm', height: '100%' }}>
          <div>
            <Label c={CREAM}>{t('work.label')}</Label>
            <Title size="23pt">{t('work.2.role')}</Title>
            <p style={{ fontFamily: OSW, fontSize: '13pt', fontWeight: 600, color: TAN, marginTop: 6 }}>{t('work.2.inst')} · {t('work.2.period')}</p>
            <div style={{ background: CREAM, color: INK, borderRadius: '5mm', padding: '5mm 6mm', marginTop: 10 }}>
              <p style={{ fontSize: 7.4, letterSpacing: '0.16em', fontWeight: 800 }}>{t('metric.org')}</p>
              <p style={{ fontFamily: OSW, fontWeight: 700, fontSize: '34pt', lineHeight: 1.1 }}><span style={{ opacity: 0.5 }}>{lang === 'en' ? '5,587' : '5.587'}</span> → {t('metric.org.v')}</p>
            </div>
            <Bullets text={t('work.2.desc')} size="10pt" color="#ecfdf5" />
            <p style={{ fontSize: '8.4pt', fontWeight: 800, color: CREAM, marginTop: 8 }}>{parts(t('work.2.tags')).join('  ·  ')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4mm', alignItems: 'flex-end', justifyContent: 'center' }}>
            {[1, 3].map((m) => <Photo key={m} src={`/galeri/work-2-${m}.jpg`} w="139mm" h="78.2mm" style={{ borderRadius: '5mm', border: `0.3mm solid ${TAN}` }} />)}
          </div>
        </div>
      </Page>

      {/* 6. Konten */}
      <Page n={6} tone="dark">
        <div style={{ position: 'relative' }}>
          <Head tone="dark" label="TWINKL MARKET" title={t('ui.contentTitle')} sub={t('work.2.sub')} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6mm' }}>
            {list(4).map((i) => <Photo key={i} src={`/galeri/post-${i}.jpg`} w="60mm" h="75mm" style={{ borderRadius: '3mm' }} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6mm', padding: '0 14mm' }}>
            {list(4).map((i) => <Photo key={i} src={`/galeri/reel-${i}.jpg`} w="36mm" h="64mm" style={{ borderRadius: '3mm', border: `0.3mm solid ${TAN}` }} />)}
          </div>
        </div>
      </Page>

      {/* 7–10. Proyek */}
      {projectPages.map((pg, k) => (
        <Page key={pg.n} n={pg.n} tone={pg.tone}>
          <div style={{ position: 'relative' }}>
            <Head tone={pg.tone} label={t('proj.label')} title={t('proj.title')} sub={k === 0 ? t('proj.subtitle') : `${k + 1} / ${projectPages.length}`} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11mm', marginTop: '6mm' }}>
              {pg.items.map(([i, imgs]) => <Card key={i} prefix="proj" i={i} tone={pg.tone} imgs={imgs} h="72mm" size="8.6pt" />)}
            </div>
          </div>
        </Page>
      ))}

      {/* 11–13. Liputan, wirausaha, kerelawanan */}
      {trio.map((pg) => (
        <Page key={pg.n} n={pg.n} tone={pg.tone}>
          <div style={{ position: 'relative' }}>
            <Head tone={pg.tone} label={t(`${pg.prefix}.label`)} title={t(`${pg.prefix}.title`)} sub={t(`${pg.prefix}.subtitle`)} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '9mm', marginTop: '9mm' }}>
              {pg.imgs.map((imgs, k) => <Card key={k} prefix={pg.prefix} i={k + 1} tone={pg.tone} imgs={imgs} h="47mm" size="9pt" title="14.5pt" />)}
            </div>
          </div>
        </Page>
      ))}

      {/* 14. Sertifikat A */}
      <Page n={14} tone="paper">
        <div style={{ position: 'relative' }}>
          <Head tone="paper" label={t('awards.label')} title={t('awards.title')} sub={t('awards.sub')} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '10mm', rowGap: '4.5mm', marginTop: '5mm' }}>
            {list(9).map((i) => <Cert key={i} i={i} w="100%" h="35mm" />)}
          </div>
        </div>
      </Page>

      {/* 15. Sertifikat B */}
      <Page n={15} tone="paper">
        <div style={{ position: 'relative' }}>
          <Head tone="paper" label={t('awards.label')} title={t('awards.title')} sub="2 / 2" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: '6mm', rowGap: '10mm', marginTop: '10mm' }}>
            {list(10, 10).map((i) => <Cert key={i} i={i} w="100%" h="38mm" />)}
          </div>
        </div>
      </Page>

      {/* 16. Keahlian */}
      <Page n={16} tone="paper">
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '122mm 1fr', gap: '12mm', height: '100%' }}>
          <div style={{ background: INK, color: '#fff', borderRadius: '6mm', padding: '9mm' }}>
            <Label c={CREAM}>{t('skills.label')}</Label>
            <Title>{t('skills.title')}</Title>
            <p style={{ fontSize: '11.5pt', lineHeight: 1.5, marginTop: 9, fontWeight: 600 }}>{t('skills.desc')}</p>
            {list(2).map((i) => (
              <div key={i} style={{ marginTop: '9mm' }}>
                <p style={{ fontSize: 8.2, letterSpacing: '0.18em', fontWeight: 800, color: CREAM }}>{t(`skills.card${i}.tag`)}</p>
                <p style={{ fontSize: '9.4pt', lineHeight: 1.5, marginTop: 5, color: '#bfb19a' }}>{t(`skills.card${i}.desc`)}</p>
                <p style={{ fontSize: '9.8pt', lineHeight: 1.75, marginTop: 6, fontWeight: 700 }}>
                  {parts(t(`skills.card${i}.tags`)).map((s, k) => <span key={s}>{k ? <span style={{ color: TAN }}>  /  </span> : null}{s}</span>)}
                </p>
              </div>
            ))}
          </div>
          <div>
            <Label c={BROWN}>{t('personal.soft.label')}</Label>
            <Title size="24pt">{t('personal.soft.title')}</Title>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5mm 7mm', marginTop: '6mm' }}>
              {list(6).map((i) => (
                <div key={i}>
                  <p style={{ fontSize: '11pt', fontWeight: 800, lineHeight: 1.2 }}>{t(`personal.soft.${i}.t`)}</p>
                  <p style={{ fontSize: '8.6pt', lineHeight: 1.46, color: '#3a332a', borderTop: `2px solid ${TAN}`, paddingTop: 3, marginTop: 3 }}>{t(`personal.soft.${i}.d`)}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '8mm', background: CREAM, borderRadius: '5mm', padding: '5mm 7mm', border: `0.3mm solid ${TAN}` }}>
              <p style={{ fontSize: 7, letterSpacing: '0.2em', fontWeight: 800 }}>{t('personal.hard.label')}</p>
              {list(4).map((i) => (
                <div key={i} style={{ marginTop: 6 }}>
                  <p style={{ fontFamily: OSW, fontSize: '12.5pt', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.15 }}>{t(`personal.sw.${i}.n`)}</p>
                  <p style={{ fontSize: '8.2pt', fontWeight: 600, marginTop: 1 }}>{t(`personal.sw.${i}.d`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>

      {/* 17. Kontak */}
      <Page n={17} tone="dark">
        <div style={{ position: 'absolute', right: '-10mm', bottom: '-40mm', width: '160mm', height: '160mm', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,.4) 0%, rgba(201,169,110,.12) 50%, rgba(201,169,110,0) 70%)' }} />
        <div style={{ position: 'relative', height: '100%' }}>
          <Label c={CREAM}>{t('contact.label')}</Label>
          <div style={{ width: '228mm', marginTop: 6 }}><Giant text={t('contact.title').toUpperCase()} id="gct" em={165} fade={1} /></div>
          <p style={{ fontSize: '11.5pt', lineHeight: 1.5, marginTop: 10, maxWidth: '132mm', fontWeight: 700 }}>{t('contact.tagline')}</p>
          <p style={{ fontSize: '9.4pt', lineHeight: 1.55, marginTop: 6, maxWidth: '132mm', color: '#cfc6b6' }}>{t('contact.subtitle')}</p>
          <div style={{ marginTop: '10mm', width: '140mm', display: 'grid', gap: '3.4mm' }}>
            {[
              ['EMAIL', cfg.email, `mailto:${cfg.email}`],
              ['WHATSAPP', cfg.telepon, `https://wa.me/${cfg.wa}`],
              ['LINKEDIN', cfg.linkedin, `https://www.${cfg.linkedin}`],
              ['GITHUB', cfg.github, `https://${cfg.github}`],
            ].map(([k, v, href], idx) => (
              <a key={k} href={href} style={{ display: 'grid', gridTemplateColumns: '28mm 1fr', alignItems: 'center', border: `1px solid ${TAN}`, borderRadius: 99, padding: '2.8mm 6mm', background: idx === 0 ? CREAM : 'rgba(255,255,255,.04)', color: idx === 0 ? INK : '#fff', textDecoration: 'none' }}>
                <span style={{ fontSize: 7, letterSpacing: '0.2em', fontWeight: 800, color: idx === 0 ? INK : CREAM }}>{k}</span>
                <span style={{ fontSize: '12pt', fontWeight: 700 }}>{v}</span>
              </a>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/profile.png" alt="" style={{ position: 'absolute', right: '8mm', bottom: 0, height: '142mm', width: 'auto' }} />
        </div>
      </Page>
    </div>
  )
}
