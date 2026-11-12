import { useMemo, useState } from 'react'
import { factions, realms, roots, worldPrinciple } from './world'

type Section = 'inicio' | 'raices' | 'reinos' | 'facciones'

const nav: { id: Section; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'raices', label: 'Las siete raíces' },
  { id: 'reinos', label: 'Cultivo' },
  { id: 'facciones', label: 'Facciones' },
]

export default function App() {
  const [section, setSection] = useState<Section>('inicio')
  const [query, setQuery] = useState('')
  const filteredFactions = useMemo(
    () => factions.filter((item) => (item.name + item.kind + item.detail).toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#inicio" onClick={() => setSection('inicio')} aria-label="Siete Raíces, inicio">
          <span className="brand-mark">✧</span>
          <span><strong>SIETE RAÍCES</strong><small>ARCHIVO DE LO PRIMORDIAL</small></span>
        </a>
        <nav aria-label="Navegación principal">
          {nav.map((item) => (
            <button key={item.id} className={section === item.id ? 'nav-link active' : 'nav-link'} onClick={() => setSection(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <span className="status-pill"><i /> PROYECTO EN DESARROLLO</span>
      </header>

      {section === 'inicio' && (
        <section className="hero content-width">
          <div className="hero-copy">
            <p className="eyebrow">CRÓNICAS DE LA TRAMA PRIMORDIAL · VOL. 001</p>
            <h1>El destino no se <em>hereda.</em><br />Se conquista.</h1>
            <p className="hero-lead">Siete raíces sostienen la existencia. Infinitos caminos esperan a quienes se atrevan a comprenderlas.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => setSection('raices')}>Explorar el universo <span>↗</span></button>
              <button className="text-button" onClick={() => setSection('reinos')}>Conocer el cultivo <span>→</span></button>
            </div>
            <div className="hero-footnote"><span>01 / 07</span><span>EL PRINCIPIO DE TODAS LAS COSAS</span></div>
          </div>
          <div className="cosmos-art" aria-label="Representación abstracta de siete raíces cósmicas">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
            <div className="core"><span>✧</span></div>
            <span className="orbit-label label-a">ORIGEN</span><span className="orbit-label label-b">VACÍO</span>
            <span className="orbit-label label-c">CONCIENCIA</span><span className="orbit-label label-d">TIEMPO</span>
          </div>
          <div className="hero-bottom">
            <div><small>UNIVERSO ORIGINAL</small><strong>Fantasía · Cultivo · Misterio</strong></div>
            <div><small>EL PRIMER MISTERIO</small><strong>La Primera Ruptura</strong></div>
            <div><small>LO QUE SE OCULTA</small><strong>Una posible octava raíz</strong></div>
          </div>
        </section>
      )}

      {section === 'raices' && (
        <section className="content-width page-section">
          <p className="eyebrow">COSMOLOGÍA · FUNDAMENTOS</p>
          <h2>Las siete raíces</h2>
          <p className="section-intro">Siete principios primordiales forman la Trama. Su equilibrio se quebró durante un acontecimiento que cambió la historia de todos los mundos.</p>
          <div className="root-grid">{roots.map((root, index) => <article className="info-card root-card" key={root.name}><span className="card-index">0{index + 1}</span><span className="root-mark">{root.mark}</span><h3>{root.name}</h3><p>{root.description}</p></article>)}</div>
          <div className="mystery-panel"><span className="eyebrow">REGISTRO SELLADO</span><h3>La Primera Ruptura</h3><p>Los archivos más antiguos hablan de mundos desaparecidos y de una armonía que dejó de existir. La causa permanece sin confirmar.</p></div>
        </section>
      )}

      {section === 'reinos' && (
        <section className="content-width page-section">
          <p className="eyebrow">PROGRESIÓN · CAMINOS DE CULTIVO</p>
          <h2>El camino del cultivador</h2>
          <p className="section-intro">El poder no se mide solo por energía acumulada. Cada avance exige una transformación y una comprensión auténtica.</p>
          <div className="realm-list">{realms.map((realm) => <article className="realm-row" key={realm.number}><span>{realm.number}</span><div><h3>{realm.name}</h3><p>{realm.note}</p></div><b>↗</b></article>)}</div>
          <div className="path-tags"><span>Cuerpo</span><span>Alma</span><span>Leyes</span><span>Ruptura</span></div>
          <p className="fine-print">Los nombres y el orden son una base de diseño inicial; el sistema completo de doce grandes reinos se desarrollará y equilibrará durante el proyecto.</p>
        </section>
      )}

      {section === 'facciones' && (
        <section className="content-width page-section">
          <p className="eyebrow">PODER · CULTURAS · ALIANZAS</p>
          <h2>Facciones conocidas</h2>
          <p className="section-intro">Imperios, sectas y linajes persiguen objetivos distintos. Ninguna facción posee toda la verdad.</p>
          <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar facción..." /></label>
          <div className="faction-grid">{filteredFactions.map((item) => <article className="info-card" key={item.name}><span className="eyebrow">{item.kind}</span><h3>{item.name}</h3><p>{item.detail}</p></article>)}</div>
          {filteredFactions.length === 0 && <p className="empty-state">No se encontraron facciones con ese término.</p>}
        </section>
      )}

      <footer className="footer content-width">
        <div><span className="brand-mark small">✧</span><strong>SIETE RAÍCES</strong></div>
        <p>{worldPrinciple}</p>
        <small>UNIVERSO ORIGINAL · PROTOTIPO 0.1.0</small>
      </footer>
    </main>
  )
}
