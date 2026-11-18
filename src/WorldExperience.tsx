import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  { id: 'origen', image: '/cultivation-universe-web/art/valle-primer-alba.svg', number: '01', title: 'El Origen', subtitle: 'Antes de que existieran los mundos', text: 'Siete principios despertaron en la Trama Primordial. De su resonancia nació todo lo que alguna vez tuvo nombre.', tag: 'PRÓLOGO · LA TRAMA PRIMORDIAL' },
  { id: 'mortales', image: '/cultivation-universe-web/art/valle-primer-alba.svg', number: '02', title: 'Los Reinos Mortales', subtitle: 'Donde comienzan los caminos', text: 'Fortalezas, puertos, ciudades libres y cordilleras separadas por mares inmensos. Quien despierta una Raíz descubre que el mundo es mucho mayor que su tierra natal.', tag: 'LOS PRIMEROS REINOS' },
  { id: 'sectas', image: '/cultivation-universe-web/art/santuario-raiz.svg', number: '03', title: 'Reinos y Órdenes', subtitle: 'El conocimiento también tiene fronteras', text: 'Casas soberanas, órdenes juramentadas y gremios de exploradores protegen sus archivos, reliquias y territorios. Ninguna facción conoce toda la verdad.', tag: 'PODER · JURAMENTOS · ALIANZAS' },
  { id: 'antiguos', image: '/cultivation-universe-web/art/mar-antiguo.svg', number: '04', title: 'Mar de los Antiguos', subtitle: 'Las eras no desaparecen por completo', text: 'Bajo las mareas descansan fortalezas sumergidas, navíos petrificados y vestigios de civilizaciones anteriores a los primeros registros.', tag: 'HERENCIAS OLVIDADAS' },
  { id: 'cielos', image: '/cultivation-universe-web/art/islas-celestes.svg', number: '05', title: 'Cielos Fragmentados', subtitle: 'Mundos que ya no comparten horizonte', text: 'Fragmentos de realidad flotan separados. Cruzarlos exige algo más que fuerza: comprensión del espacio y sus leyes.', tag: 'LOS LÍMITES DEL MUNDO' },
  { id: 'raices', image: '/cultivation-universe-web/art/santuario-raiz.svg', number: '06', title: 'Los Siete Dominios', subtitle: 'Las leyes que sostienen la existencia', text: 'Origen, Vacío, Tiempo, Espacio, Vida, Muerte y Conciencia son las siete Raíces primordiales. Cada una expresa una ley de la Trama; ninguna contiene por sí sola toda la verdad.', tag: 'SIETE PRINCIPIOS' },
  { id: 'vacio', image: '/cultivation-universe-web/art/islas-celestes.svg', number: '07', title: 'Frontera del Vacío', subtitle: 'Lo desconocido también observa', text: 'Más allá de las cartas conocidas, la realidad se vuelve incierta. Expediciones enteras han regresado con mapas imposibles y relatos que nadie logra confirmar.', tag: 'TERRITORIO NO CARTOGRAFIADO' },
  { id: 'primordial', image: '/cultivation-universe-web/art/valle-primer-alba.svg', number: '08', title: 'Origen Primordial', subtitle: 'Toda respuesta abre otra pregunta', text: 'En el corazón de la Trama permanece el enigma de la Primera Ruptura: el instante en que las siete leyes se separaron y algo quedó al otro lado.', tag: 'EL MISTERIO CENTRAL' },
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
      gsap.utils.toArray<HTMLElement>('.chapter-art').forEach((panel) => {
        const image = panel.querySelector<HTMLElement>('.chapter-art-image')
        gsap.fromTo(panel, { scale: 0.76, borderRadius: '30px' }, {
          scale: 1.04, borderRadius: '8px', ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top 92%', end: 'bottom 8%', scrub: 1.15 },
        })
        if (image) gsap.fromTo(image, { scale: 1.28, yPercent: -7 }, {
          scale: 1, yPercent: 7, ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })
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
        <nav aria-label="Navegación del universo"><a href="#origen">El universo</a><a href="#raices">Las raíces</a><a href="#juego">El juego</a><a href="#desarrollo">Desarrollo</a></nav>
        <span className="dev-status"><i /> UNIVERSO EN DESARROLLO</span>
      </header>
      <main className="world-story">
        <section className="world-hero" id="inicio">
          <div className="hero-kicker">UNA EXPERIENCIA A TRAVÉS DE LA TRAMA PRIMORDIAL</div>
          <h1>El destino no se<br /><em>hereda.</em> Se conquista.</h1>
          <p>Siete Raíces sostienen la existencia. Reinos enteros nacieron bajo su influencia; solo quienes aprenden a escucharlas pueden alterar su propio destino.</p>
          <a className="enter-world" href="#origen">DESCENDER AL UNIVERSO <span>↓</span></a>
          <div className="scroll-cue"><span /> DESLIZA PARA DESCUBRIR</div>
        </section>
        {chapters.map((chapter, index) => (
          <section className={`world-chapter ${index % 2 ? 'align-right' : 'align-left'}`} id={chapter.id} key={chapter.id}>
            <div className="chapter-art" aria-hidden="true">
              <div className="chapter-art-image" style={{ backgroundImage: `url(${chapter.image})` }} />
              <div className="chapter-art-shade" />
              <span className="art-coordinate">TRAMA PRIMORDIAL · {chapter.number}</span>
            </div>
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
        <section className="world-portal" id="juego">
          <div className="portal-heading">
            <span className="chapter-tag">EL ARCHIVO DE LA TRAMA · 09</span>
            <h2>El universo no termina<br /><em>en sus historias.</em></h2>
            <p>Las crónicas revelan el mundo. El proyecto del juego comienza a convertirlo en un lugar que podrás recorrer, descubrir y transformar.</p>
          </div>
          <div className="portal-grid">
            <article className="portal-card portal-card-world">
              <span className="portal-index">01 / ATLAS</span>
              <div className="portal-symbol">✧</div>
              <h3>Ocho capítulos.<br />Una sola Trama.</h3>
              <p>Recorre el origen, los reinos mortales, las órdenes juramentadas, los mares antiguos y los territorios que aún no aparecen en los mapas.</p>
              <a href="#origen">VOLVER A LAS CRÓNICAS ↗</a>
            </article>
            <article className="portal-card portal-card-roots">
              <span className="portal-index">02 / COSMOLOGÍA</span>
              <div className="portal-symbol">◈</div>
              <h3>Siete raíces.<br />Siete principios.</h3>
              <p>Origen, Vacío, Tiempo, Espacio, Vida, Muerte y Conciencia: siete leyes primordiales que dan forma a este universo.</p>
              <a href="#raices">DESCUBRIR LOS PRINCIPIOS ↗</a>
            </article>
            <article className="portal-card portal-card-game">
              <span className="portal-index">03 / VIDEOJUEGO</span>
              <div className="portal-symbol">⟡</div>
              <h3>El primer camino<br />está despertando.</h3>
              <p>El RPG avanza hacia su primer prólogo explorable en 3D. Consulta el código, la hoja de ruta y las pruebas de desarrollo.</p>
              <a href="https://github.com/JOSEFRO/cultivation-universe-game" target="_blank" rel="noreferrer">ENTRAR AL PROYECTO DEL JUEGO ↗</a>
            </article>
          </div>
          <div className="portal-status">
            <div><span className="status-dot" /> <b>ESTADO DEL UNIVERSO</b></div>
            <p>Archivo narrativo disponible · Prototipo 3D en desarrollo · Contenido y sistemas en expansión</p>
          </div>
        </section>
        <section className="launch-section" id="desarrollo">
          <div className="launch-heading">
            <span className="chapter-tag">CUADERNO DE DESARROLLO · 2026</span>
            <h2>Un universo en construcción.<br /><em>Una aventura por despertar.</em></h2>
            <p>Cultivation Universe es un RPG de fantasía y cultivo en desarrollo. Esta web es su portal oficial: aquí compartiremos el mundo, las decisiones creativas y cada avance importante del proyecto.</p>
          </div>
          <div className="launch-feature-grid">
            <article className="launch-feature">
              <span className="launch-feature-number">01 / EL UNIVERSO</span>
              <h3>Una cosmología original</h3>
              <p>Siete Raíces, reinos olvidados, civilizaciones, órdenes, reliquias y misterios conectados por una misma Trama.</p>
              <span className="launch-state state-live">ARCHIVO NARRATIVO DISPONIBLE</span>
            </article>
            <article className="launch-feature">
              <span className="launch-feature-number">02 / EL VIDEOJUEGO</span>
              <h3>El primer prólogo 3D</h3>
              <p>El equipo está construyendo la base explorable: escenario, personaje provisional, cámara, interacción y guardián.</p>
              <span className="launch-state state-progress">PROTOTIPO EN DESARROLLO</span>
            </article>
            <article className="launch-feature">
              <span className="launch-feature-number">03 / LO QUE VIENE</span>
              <h3>Un mundo que crecerá</h3>
              <p>El siguiente trabajo contempla consolidar el personaje, la exploración, las animaciones y después ampliar los sistemas del RPG.</p>
              <span className="launch-state state-planned">PRÓXIMAS ETAPAS</span>
            </article>
          </div>
          <div className="launch-roadmap">
            <div className="roadmap-title">
              <span className="chapter-tag">HOJA DE RUTA PÚBLICA</span>
              <p>El desarrollo avanza por etapas. Las funciones se anunciarán como disponibles cuando estén implementadas y verificadas.</p>
            </div>
            <ol className="roadmap-list">
              <li className="roadmap-done"><span className="roadmap-marker">01</span><div><b>Fundamentos del universo</b><small>Identidad, cosmología y arquitectura separada entre juego y portal</small></div><em>BASE ESTABLECIDA</em></li>
              <li className="roadmap-progress"><span className="roadmap-marker">02</span><div><b>Prólogo explorable 3D</b><small>Escenario inicial, interacción y objetivo narrativo</small></div><em>PROTOTIPO</em></li>
              <li><span className="roadmap-marker">03</span><div><b>Personaje y cámara</b><small>Controlador, locomoción, animaciones y presentación</small></div><em>EN PLANIFICACIÓN</em></li>
              <li><span className="roadmap-marker">04</span><div><b>Sistemas de RPG</b><small>progresión, habilidades, personajes, misiones e inventario</small></div><em>ETAPAS FUTURAS</em></li>
              <li><span className="roadmap-marker">05</span><div><b>Expansión del mundo</b><small>Regiones, exploración, contenido y pruebas de rendimiento</small></div><em>ETAPAS FUTURAS</em></li>
            </ol>
            <p className="roadmap-note">No existe una fecha de lanzamiento confirmada. La hoja de ruta puede cambiar según las pruebas y el progreso técnico.</p>
          </div>
          <div className="launch-follow">
            <div>
              <span className="chapter-tag">SÉ PARTE DEL COMIENZO</span>
              <h3>La próxima página<br /><em>la escribimos construyendo.</em></h3>
              <p>Consulta el código fuente y acompaña los avances desde los repositorios oficiales.</p>
            </div>
            <div className="launch-links">
              <a href="https://github.com/JOSEFRO/cultivation-universe-game" target="_blank" rel="noreferrer">SEGUIR EL VIDEOJUEGO <span>↗</span></a>
              <a href="https://github.com/JOSEFRO/cultivation-universe-web" target="_blank" rel="noreferrer">SEGUIR EL PORTAL WEB <span>↗</span></a>
            </div>
          </div>
        </section>
        <footer className="world-footer">
          <span className="chapter-tag">EL ARCHIVO APENAS COMIENZA</span>
          <h2>La Trama aún<br /><em>guarda secretos.</em></h2>
          <p>Explora las crónicas. Descubre las órdenes y civilizaciones. Encuentra tu camino.</p>
          <a href="https://github.com/JOSEFRO/cultivation-universe-game" target="_blank" rel="noreferrer">CONOCER EL PROYECTO DEL JUEGO ↗</a>
          <small>SIETE RAÍCES · UNIVERSO ORIGINAL · PROTOTIPO EN DESARROLLO</small>
        </footer>
      </main>
    </>
  )
}
