'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const projects = [
  {
    number: "01",
    title: { id: "Si-ECO Market Access (Blueprint Sistem)", en: "Si-ECO Market Access (System Blueprint)" },
    description: { id: "Analisis kebutuhan, blueprint sistem, dan FSD sebagai PIC sisi Kementerian.", en: "Requirements analysis, system blueprint, and FSD as the Ministry-side PIC." },
    framework: "KEMENTERIAN TRANSMIGRASI 2025 — 2026",
    techStack: ["Business Analysis", "FSD"],
    url: "https://www.figma.com/proto/mMTaZEgtfEQva5G8cGe22h/Si-ECO?page-id=110%3A131&node-id=124-640&viewport=-540%2C409%2C0.23&t=lE3PSGHhoMLgT3OP-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=124%3A640&show-proto-sidebar=1",
  },
  {
    number: "02",
    title: { id: "FittlyAR", en: "FittlyAR" },
    description: { id: "Konsep bisnis virtual try-on berbasis AR dengan rekomendasi ukuran.", en: "AR virtual try-on business concept with size recommendation." },
    framework: "PROYEK BISNIS 2026",
    techStack: ["AR", "COO"],
    url: "https://fittlyar.com/",
  },
  {
    number: "03",
    title: { id: "HeatSafe Helmet", en: "HeatSafe Helmet" },
    description: { id: "Ide modul keselamatan pintar untuk BINUS Business Vaganza.", en: "Smart safety module idea for BINUS Business Vaganza." },
    framework: "KOMPETISI 2026",
    techStack: ["Business Model Canvas", "Competition"],
    url: "",
  },
  {
    number: "04",
    title: { id: "EzVe", en: "EzVe" },
    description: { id: "Analisis dan desain sistem layanan vendor berbasis mobile.", en: "Analysis and design of a mobile vendor-service system." },
    framework: "ANALISIS & DESAIN SISTEM 2024",
    techStack: ["UML", "Database"],
    url: "https://drive.google.com/file/d/1jsOP4No0DFHT1gbZ3D8nT9BJJPRo8FsM/view?usp=sharing",
  },
  {
    number: "05",
    title: { id: "Sabana", en: "Sabana" },
    description: { id: "Analisis dan desain sistem aplikasi pemesanan tiket kebun binatang.", en: "System analysis and design for a zoo ticket booking app." },
    framework: "ANALISIS & DESAIN SISTEM",
    techStack: ["UML", "Visual Paradigm"],
    url: "https://drive.google.com/file/d/1iHkjpa5DUqzlxaWMPRQlXi_q0SseX_qG/view?usp=sharing",
  },
  {
    number: "06",
    title: { id: "Riset Perilaku Konsumen Digital", en: "Digital Consumer Behavior Research" },
    description: { id: "Pengaruh konten dan layanan AR serta live streaming terhadap kepercayaan merek dan niat beli (SEM-PLS).", en: "Effects of AR content, AR service, and live streaming on brand trust and purchase intention (SEM-PLS)." },
    framework: "RISET AKADEMIK 2024",
    techStack: ["SmartPLS 4", "Research"],
    url: "",
  },
  {
    number: "07",
    title: { id: "MedSistant", en: "MedSistant" },
    description: { id: "Aplikasi pencarian dokter dan pendaftaran rawat jalan.", en: "Doctor discovery and outpatient registration app." },
    framework: "UI/UX 2024",
    techStack: ["Figma", "Prototype"],
    url: "https://www.figma.com/proto/ayLN1cGA7MYzuW6AepTauF/UAS-MEDSISTANT-ANANDYA-JEANETTE?node-id=1-1023&starting-point-node-id=1%3A1023",
  },
  {
    number: "08",
    title: { id: "Pijar Music Event", en: "Pijar Music Event" },
    description: { id: "Konser musik sebagai media donasi korban bencana.", en: "Music concerts as a disaster-relief donation channel." },
    framework: "UI/UX",
    techStack: ["Figma", "Design Thinking"],
    url: "https://www.figma.com/design/aaLhreuwHmYDYCpIY4kop2/Pijar-Apps?node-id=7-83",
  },
  {
    number: "09",
    title: { id: "Eduflix", en: "Eduflix" },
    description: { id: "Aplikasi belajar mobile berbasis video.", en: "Video-based mobile learning app." },
    framework: "UI/UX",
    techStack: ["Figma", "E-Learning"],
    url: "https://www.figma.com/proto/X0K3yEwvoshAMU7Wy9B7Vx/Untitled?node-id=33-1974&starting-point-node-id=33%3A1974",
  },
  {
    number: "10",
    title: { id: "ActPet", en: "ActPet" },
    description: { id: "Aplikasi acara dan informasi hewan peliharaan.", en: "Pet events and information app." },
    framework: "UI/UX",
    techStack: ["Figma", "Mobile"],
    url: "https://www.figma.com/design/vgx6RCCs6DvEkCSpuJ6zzP/-SUDAH-KOREKSI--TM-7---Kel-2--BB81?node-id=0-1",
  },
  {
    number: "11",
    title: { id: "De Java Hotel", en: "De Java Hotel" },
    description: { id: "Desain antarmuka di Figma.", en: "Interface design in Figma." },
    framework: "UI/UX",
    techStack: ["Figma"],
    url: "https://www.figma.com/design/dSkOwaWKYAWfVTVufQhtnN/Untitled?node-id=0-1",
  },
  {
    number: "12",
    title: { id: "Manzoku", en: "Manzoku" },
    description: { id: "Desain sistem layanan front office di Figma.", en: "Front service system design in Figma." },
    framework: "UI/UX",
    techStack: ["Figma", "Service"],
    url: "https://www.figma.com/design/Kn9RffPSda2fhIMjXI3nNf/KEL-2---Front-Service-System---MANZOKU?node-id=0-1",
  },
  {
    number: "13",
    title: { id: "FreshGo", en: "FreshGo" },
    description: { id: "Desain antarmuka di Figma.", en: "Interface design in Figma." },
    framework: "UI/UX",
    techStack: ["Figma"],
    url: "https://www.figma.com/design/w3TdwLDWVKJwhp5eOaahDv/FreshGo?node-id=0-1",
  },
  {
    number: "14",
    title: { id: "C’Groovy", en: "C’Groovy" },
    description: { id: "Aplikasi web eksplorasi musik berbasis HTML, CSS, dan JavaScript.", en: "Music discovery web app built with HTML, CSS, and JavaScript." },
    framework: "FRONT-END",
    techStack: ["HTML", "JavaScript"],
    url: "https://jeanette0509.github.io/CGroovy/html/Home.html",
  },
  {
    number: "15",
    title: { id: "Nuvica", en: "Nuvica" },
    description: { id: "Situs web yang dipublikasikan di GitHub Pages.", en: "Website published on GitHub Pages." },
    framework: "FRONT-END",
    techStack: ["Web", "GitHub Pages"],
    url: "https://jeanette0509.github.io/Nuvica/",
  },
  {
    number: "16",
    title: { id: "Car Rental", en: "Car Rental" },
    description: { id: "Tugas akhir web: beranda, checkout, dan riwayat sewa mobil.", en: "Web final assignment: car rental home, checkout, and history pages." },
    framework: "FRONT-END",
    techStack: ["HTML", "CSS"],
    url: "",
  },
]

export default function ProjectList() {
  const { lang } = useLanguage()
  const en = lang === 'en'

  return (
    <section id="technical" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-3">{en ? 'ALL PROJECTS' : 'SEMUA PROYEK'}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">{en ? 'Business, Systems, UI/UX & Front-End' : 'Bisnis, Sistem, UI/UX & Front-End'}</h2>
          <p className="text-[var(--muted)] text-sm max-w-lg">
            {en
              ? 'Projects from internship, academic work, competitions, and personal practice.'
              : 'Proyek dari magang, perkuliahan, kompetisi, dan latihan mandiri.'}
          </p>
          <a href="https://github.com/jeanette0509" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 rounded-full border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/10 transition-colors">
            GitHub: jeanette0509 ↗
          </a>
        </div>

        <div className="divide-y divide-[var(--card-border)]">
          {projects.map((project) => (
            <div
              key={project.number}
              className="group flex items-start gap-4 md:gap-8 py-6 hover:bg-[var(--card-bg)] hover:px-4 rounded-lg transition-all duration-300"
            >
              <span className="text-[var(--muted)] text-sm font-semibold mt-1 shrink-0 w-8 font-sans">{project.number}</span>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-1">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline decoration-emerald-500/50 underline-offset-4 hover:text-emerald-500">
                      {project.title[lang]} ↗
                    </a>
                  ) : (
                    project.title[lang]
                  )}
                </h3>
                <p className="text-[var(--muted)] text-sm mb-2 leading-relaxed">{project.description[lang]}</p>
                <p className="text-[var(--muted)] text-xs tracking-wider uppercase mb-3 font-semibold">{project.framework}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-[10px] font-semibold tracking-wide">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors mt-1 shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
