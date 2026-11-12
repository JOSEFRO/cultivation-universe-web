import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  { id: 'origen', number: '01', title: 'El Origen', subtitle: 'Antes de que existieran los mundos', text: 'Siete principios despertaron en la Trama Primordial. De su resonancia nació todo lo que alguna vez tuvo nombre.', tag: 'PRÓLOGO · LA TRAMA PRIMORDIAL' },
  { id: 'mortales', number: '02', title: 'Continentes Mortales', subtitle: 'Donde comienzan los caminos', text: 'Ciudades, montañas y territorios separados por océanos. Aquí, el primer paso de un cultivador puede cambiar su destino.', tag: 'LOS PRIMEROS MUNDOS' },
  { id: 'sectas', number: '03', title: 'Dominio de las Sectas', subtitle: 'El conocimiento también tiene fronteras', text: 'Imperios, sectas y linajes protegen técnicas, secretos y territorios. Ninguna facción conoce toda la verdad.', tag: 'PODER · CULTURA · ALIANZAS' },
  { id: 'antiguos', number: '04', title: 'Mar de los Antiguos', subtitle: 'Las eras no desaparecen por completo', text: 'Bajo aguas inmóviles descansan ruinas y herencias de civilizaciones que existieron antes de los registros conocidos.', tag: 'HERENCIAS OLVIDADAS' },
  { id: 'cielos', number: '05', title: 'Cielos Fragmentados', subtitle: 'Mundos que ya no comparten horizonte', text: 'Fragmentos de realidad flotan separados. Cruzarlos exige algo más que fuerza: comprensión del espacio y sus leyes.', tag: 'LOS LÍMITES DEL MUNDO' },
  { id: 'raices', number: '06', title: 'Dominio de las Raíces', subtitle: 'La fuente de los siete principios', text: 'Origen, Vacío, Tiempo, Espacio, Vida, Muerte y Conciencia. Cada raíz revela una parte de la Trama, nunca su totalidad.', tag: 'SIETE PRINCIPIOS' },
  { id: 'vacio', number: '07', title: 'Frontera del Vacío', subtitle: 'Lo desconocido también observa', text: 'Más allá de los mapas, las certezas pierden significado. Hay presencias cuya verdadera naturaleza permanece oculta.', tag: 'TERRITORIO NO CARTOGRAFIADO' },
  { id: 'primordial', number: '08', title: 'Origen Primordial', subtitle: 'Toda respuesta abre otra pregunta', text: 'En el origen de la Trama permanece el misterio de la Primera Ruptura… y aquello que pudo sobrevivirla.', tag: 'EL MISTERIO CENTRAL' },
]

function createWorld(scene: THREE.Scene) {
  const group = new THREE.Group()
  scene.add(group)
  const gold = new THREE.MeshStandardMaterial({ color: 0xc6a36b, metalness: 0.72, roughness: 0.28, emissive: 0x38230b, emissiveIntensity: 0.35 })
  const blue = new THREE.MeshStandardMaterial({ color: 0x263e62, metalness: 0.35, roughness: 0.58 })
  const dark = new THREE.MeshStandardMaterial({ color: 0x111a2b, metalness: 0.25, roughness: 0.82 })
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 5), new THREE.MeshStandardMaterial({ color: 0x9b7950, emissive: 0x79512a, emissiveIntensity: 1.2, metalness: 0.5, roughness: 0.25 }))
  group.add(core)
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.1 + i * 0.65, 0.012, 8, 180), gold)
    ring.rotation.set(0.5 + i * 0.37, 0.3 + i * 0.42, i * 0.24)
    group.add(ring)
  }
  const planet = new THREE.Mesh(new THREE.SphereGeometry(1.25, 48, 48), blue)
  planet.position.set(-5, -2, -5)
  group.add(planet)
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32), gold)
  moon.position.set(5, 2.5, -7)
  group.add(moon)
  // Floating islands: procedural geometry keeps the first experience asset-free.
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.399
    const radius = 5 + (i % 5) * 1.35
    const island = new THREE.Group()
    const top = new THREE.Mesh(new THREE.ConeGeometry(0.75 + (i % 3) * 0.28, 1.25 + (i % 4) * 0.35, 6), i % 3 === 0 ? gold : blue)
    top.rotation.x = Math.PI
    top.position.y = -0.2
    const base = new THREE.Mesh(new THREE.ConeGeometry(0.45 + (i % 3) * 0.2, 1.6, 6), dark)
    base.position.y = -1.1
    island.add(top, base)
    island.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.7) * 4, Math.sin(angle) * radius - 4)
    island.rotation.z = Math.sin(angle) * 0.18
    group.add(island)
  }
  const starCount = 1800
  const positions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100
  }
  const starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xd8c8a8, size: 0.055, transparent: true, opacity: 0.8 }))
  scene.add(stars)
  return { group, stars }
}

export default function WorldExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#070a12')
    scene.fog = new THREE.FogExp2('#070a12', 0.018)
    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 180)
    camera.position.set(0, 1.2, 15)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1 : 1.45))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    const ambient = new THREE.AmbientLight(0x9aaacb, 1.5)
    const key = new THREE.PointLight(0xe8c58c, 90, 55)
    key.position.set(4, 5, 8)
    scene.add(ambient, key)
    const world = createWorld(scene)
    let frame = 0
    let raf = 0
    const render = () => {
      raf = requestAnimationFrame(render)
      if (!reduced) {
        world.group.rotation.y += 0.0008
        world.stars.rotation.y -= 0.00008
      }
      renderer.render(scene, camera)
      frame++
    }
    render()

    const lenis = reduced ? null : new Lenis({ lerp: 0.075, smoothWheel: true })
    const tick = (time: number) => { lenis?.raf(time * 1000) }
    if (lenis) gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const positions = [
      { x: 0, y: 1.2, z: 15, rx: 0 },
      { x: -8, y: -2, z: 13, rx: 0.12 },
      { x: 8, y: -5, z: 12, rx: 0.3 },
      { x: -7, y: -9, z: 11, rx: 0.6 },
      { x: 7, y: -13, z: 10, rx: 0.9 },
      { x: 0, y: -17, z: 9, rx: 1.2 },
      { x: -6, y: -21, z: 8, rx: 1.55 },
      { x: 0, y: -25, z: 6.5, rx: 2.0 },
    ]
    if (!reduced) {
      chapters.forEach((chapter, index) => {
        const next = positions[index + 1]
        if (!next) return
        gsap.to(camera.position, {
          x: next.x, y: next.y, z: next.z, ease: 'none',
          scrollTrigger: { trigger: `#${chapter.id}`, start: 'top top', end: 'bottom top', scrub: 1 },
        })
        gsap.to(world.group.rotation, {
          x: next.rx, ease: 'none',
          scrollTrigger: { trigger: `#${chapter.id}`, start: 'top top', end: 'bottom top', scrub: 1 },
        })
      })
    }
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1 : 1.45))
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      gsap.ticker.remove(tick)
      lenis?.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      cancelAnimationFrame(raf)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose()
          const material = object.material
          if (Array.isArray(material)) material.forEach((item) => item.dispose())
          else material.dispose()
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="world-canvas" aria-hidden="true" />
      <div className="world-vignette" aria-hidden="true" />
      <header className="world-nav">
        <a className="world-brand" href="#inicio"><span>✧</span><b>SIETE RAÍCES</b></a>
        <nav aria-label="Navegación del universo"><a href="#origen">El universo</a><a href="#raices">Las raíces</a><a href="#primordial">El misterio</a></nav>
        <span className="dev-status"><i /> UNIVERSO EN DESARROLLO</span>
      </header>
      <main className="world-story">
        <section className="world-hero" id="inicio">
          <div className="hero-kicker">UNA EXPERIENCIA A TRAVÉS DE LA TRAMA PRIMORDIAL</div>
          <h1>El destino no se<br /><em>hereda.</em> Se conquista.</h1>
          <p>Siete raíces sostienen la existencia. Infinitos caminos esperan a quienes se atrevan a comprenderlas.</p>
          <a className="enter-world" href="#origen">DESCENDER AL UNIVERSO <span>↓</span></a>
          <div className="scroll-cue"><span /> DESLIZA PARA DESCUBRIR</div>
        </section>
        {chapters.map((chapter, index) => (
          <section className={`world-chapter ${index % 2 ? 'align-right' : 'align-left'}`} id={chapter.id} key={chapter.id}>
            <div className="chapter-copy">
              <span className="chapter-tag">{chapter.tag}</span>
              <span className="chapter-number">{chapter.number} / 08</span>
              <h2>{chapter.title}</h2>
              <h3>{chapter.subtitle}</h3>
              <p>{chapter.text}</p>
              {index === 5 && <div className="root-chips"><span>ORIGEN</span><span>VACÍO</span><span>TIEMPO</span><span>ESPACIO</span><span>VIDA</span><span>MUERTE</span><span>CONCIENCIA</span></div>}
            </div>
          </section>
        ))}
        <footer className="world-footer">
          <span className="chapter-tag">EL ARCHIVO APENAS COMIENZA</span>
          <h2>La Trama aún<br /><em>guarda secretos.</em></h2>
          <p>Explora las crónicas. Descubre las facciones. Encuentra tu camino.</p>
          <a href="https://github.com/JOSEFRO/cultivation-universe-game" target="_blank" rel="noreferrer">CONOCER EL PROYECTO DEL JUEGO ↗</a>
          <small>SIETE RAÍCES · UNIVERSO ORIGINAL · PROTOTIPO EN DESARROLLO</small>
        </footer>
      </main>
    </>
  )
}
