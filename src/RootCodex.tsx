import { useState } from 'react'

const roots = [
  { name:'Origen', mark:'I', essence:'El primer impulso', description:'La raíz que inicia procesos, despierta posibilidades y da forma al comienzo de aquello que aún no existe.', path:'Creación · despertar · potencial' },
  { name:'Vacío', mark:'II', essence:'Lo que existe entre todo', description:'No representa simplemente la nada: es el espacio de lo no definido, donde las fronteras pueden perder su significado.', path:'Silencio · ausencia · disolución' },
  { name:'Tiempo', mark:'III', essence:'El curso de las eras', description:'Rige los ciclos, la sucesión y las huellas que deja cada acontecimiento en la Trama Primordial.', path:'Ciclos · memoria · causalidad' },
  { name:'Espacio', mark:'IV', essence:'La estructura de los mundos', description:'Conecta y separa territorios, dimensiones y realidades. Comprenderlo permite interpretar las distancias de otra manera.', path:'Distancia · conexión · dimensión' },
  { name:'Vida', mark:'V', essence:'El impulso de crecer', description:'Sostiene el cambio, la adaptación y la capacidad de los seres para transformarse y continuar.', path:'Crecimiento · adaptación · renovación' },
  { name:'Muerte', mark:'VI', essence:'El umbral de los ciclos', description:'Cierra etapas y devuelve lo que ya cumplió su función. No es una fuerza maligna ni una recompensa.', path:'Final · tránsito · retorno' },
  { name:'Conciencia', mark:'VII', essence:'La mirada que comprende', description:'Permite percibir patrones, interpretar la Trama y cuestionar aquello que otros aceptan como absoluto.', path:'Percepción · voluntad · comprensión' },
]
export default function RootCodex() {
  const [selected,setSelected]=useState(roots[0])
  return <div className="root-codex" aria-label="Códice interactivo de las siete raíces">
    <div className="root-codex-list" role="group" aria-label="Seleccionar una raíz">
      {roots.map(root=><button key={root.name} type="button" className={selected.name===root.name?'root-codex-button is-active':'root-codex-button'} aria-pressed={selected.name===root.name} onClick={()=>setSelected(root)}><span>{root.mark}</span>{root.name}</button>)}
    </div>
    <article className="root-codex-detail" aria-live="polite">
      <span className="root-codex-eyebrow">ARCHIVO DE LA TRAMA · RAÍZ {selected.mark}</span>
      <h4>{selected.name}</h4><h5>{selected.essence}</h5><p>{selected.description}</p><small>{selected.path}</small>
    </article>
  </div>
}
