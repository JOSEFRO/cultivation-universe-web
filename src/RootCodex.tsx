import { useState } from 'react'
import { roots } from './data/roots'

export default function RootCodex() {
  const [selectedId, setSelectedId] = useState(roots[0].id)
  const selected = roots.find((root) => root.id === selectedId) ?? roots[0]

  return <div className="root-codex" aria-label="Códice interactivo de las siete raíces">
    <div className="root-codex-list" role="group" aria-label="Seleccionar una raíz">
      {roots.map((root) => (
        <button
          key={root.id}
          type="button"
          className={selected.id === root.id ? 'root-codex-button is-active' : 'root-codex-button'}
          aria-pressed={selected.id === root.id}
          onClick={() => setSelectedId(root.id)}
        >
          <span>{root.mark}</span>{root.name}
        </button>
      ))}
    </div>
    <article className="root-codex-detail" aria-live="polite">
      <span className="root-codex-eyebrow">ARCHIVO DE LA TRAMA · RAÍZ {selected.mark}</span>
      <h4>{selected.name}</h4>
      <h5>{selected.essence}</h5>
      <p>{selected.description}</p>
      <small>{selected.path}</small>
    </article>
  </div>
}
