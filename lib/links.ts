// Tautan karya, disalin dari berkas klien (portofolio lama dan dokumen "Link ...").
export type Link = { id: string; en: string; url: string }

const l = (id: string, url: string, en = id): Link => ({ id, en, url })

export const links: Record<string, Link[]> = {
  'work.1': [
    l('Prototipe Portal & CMS Pelaku Usaha', 'https://www.figma.com/proto/mMTaZEgtfEQva5G8cGe22h/Si-ECO?page-id=110%3A131&node-id=124-640&viewport=-540%2C409%2C0.23&t=lE3PSGHhoMLgT3OP-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=124%3A640&show-proto-sidebar=1', 'Business Portal & CMS Prototype'),
    l('Prototipe Portal Mobile', 'https://www.figma.com/proto/mMTaZEgtfEQva5G8cGe22h/Si-ECO?page-id=110%3A131&node-id=651-7834&viewport=-540%2C409%2C0.23&t=7ubvpEMSKY549sDz-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=647%3A7950&show-proto-sidebar=1', 'Mobile Portal Prototype'),
    l('Prototipe CMS Stakeholder', 'https://www.figma.com/proto/mMTaZEgtfEQva5G8cGe22h/Si-ECO?page-id=110%3A131&node-id=1059-11573&viewport=-540%2C409%2C0.23&t=7ubvpEMSKY549sDz-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1059%3A11573&show-proto-sidebar=1', 'Stakeholder CMS Prototype'),
  ],
  'proj.1': [
    l('Situs FittlyAR', 'https://fittlyar.com/', 'FittlyAR Website'),
    l('Desain Figma', 'https://www.figma.com/design/OKRiN1B3UnyYYlA6ncefNp/Untitled?node-id=106-750', 'Figma Design'),
  ],
  'proj.2': [
    l('Prototipe', 'https://www.figma.com/proto/ayLN1cGA7MYzuW6AepTauF/UAS-MEDSISTANT-ANANDYA-JEANETTE?node-id=1-1023&p=f&t=EdtUAqrWrlTJ5LFk-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A1023&show-proto-sidebar=1', 'Prototype'),
  ],
  'proj.3': [l('Dokumen EzVe', 'https://drive.google.com/file/d/1jsOP4No0DFHT1gbZ3D8nT9BJJPRo8FsM/view?usp=sharing', 'EzVe Document')],
  'proj.5': [l('Desain Figma', 'https://www.figma.com/design/aaLhreuwHmYDYCpIY4kop2/Pijar-Apps?node-id=7-83', 'Figma Design')],
  'proj.6': [l('Prototipe', 'https://www.figma.com/proto/X0K3yEwvoshAMU7Wy9B7Vx/Untitled?node-id=33-1974&starting-point-node-id=33%3A1974', 'Prototype')],
  'proj.7': [l('Prototipe', 'https://www.figma.com/proto/vgx6RCCs6DvEkCSpuJ6zzP/%5BSUDAH-KOREKSI%5D-TM-7---Kel-2--BB81?node-id=46-279&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=44%3A376&show-proto-sidebar=1', 'Prototype')],
  'proj.8': [l('Buka Web', 'https://jeanette0509.github.io/CGroovy/html/Home.html', 'Open Website')],
  'media.1': [
    l('Tribun Jabar', 'https://jabar.tribunnews.com/2024/05/31/binus-university-bandung-gelar-temu-media-dan-pameran-karya-kreatif-dan-inovasi'),
    l('Bisnis Hotel', 'https://bisnishotel.id/foto-binus-university-bandung-dukung-kreativitas-digital-generasi-muda-di-era-ai/'),
  ],
  'biz.1': [l('Instagram', 'https://www.instagram.com/mollaci.id')],
  'biz.2': [
    l('TikTok', 'https://www.tiktok.com/@dr.ayustore'),
    l('Katalog', 'https://drive.google.com/drive/folders/1tVD0WigShObkzjCJNdUnq2kvcT1Dczhy', 'Catalogue'),
  ],
  'biz.3': [l('Instagram', 'https://www.instagram.com/fleurspetal.co')],
}
