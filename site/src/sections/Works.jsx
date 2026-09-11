import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

export default function Works({ scrollRef: _scrollRef, onSelectService }) {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const canvasRefs = useRef([])
  const imagesRef = useRef(new Array(services.length).fill(null))
  const strengthRef = useRef(0)
  const prevScrollYRef = useRef(0)
  const isVisibleRef = useRef(false)
  const randsRef = useRef(
    services.map(() => [Math.random(), Math.random(), Math.random(), Math.random()])
  )

  const setCanvasRef = useCallback((el, index) => {
    canvasRefs.current[index] = el
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    services.forEach((service, i) => {
      const img = new Image()
      img.onload = () => {
        imagesRef.current[i] = img
        const canvas = canvasRefs.current[i]
        if (canvas) {
          const rect = canvas.parentElement?.getBoundingClientRect()
          if (rect) {
            canvas.width = rect.width * Math.min(window.devicePixelRatio, 2)
            canvas.height = rect.height * Math.min(window.devicePixelRatio, 2)
          }
          drawImage(canvas, img, 0, randsRef.current[i])
        }
      }
      img.src = service.img
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return
    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!isVisibleRef.current) return

      const scrollY = window.scrollY
      const scrollDelta = scrollY - prevScrollYRef.current
      const dt = 1 / 60

      const targetStrength = (Math.abs(scrollDelta) * 10) / window.innerHeight
      strengthRef.current *= Math.exp(-dt * 10)
      strengthRef.current += Math.min(targetStrength, 5)
      const strength = Math.min(1, strengthRef.current)

      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !imagesRef.current[i]) return
        if (Math.random() > Math.exp(-dt * 25 * (1 + strength))) {
          randsRef.current[i] = [Math.random(), Math.random(), Math.random(), Math.random()]
        }
        drawImage(canvas, imagesRef.current[i], strength, randsRef.current[i])
      })

      prevScrollYRef.current = scrollY
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !canvas.parentElement) return
        const rect = canvas.parentElement.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        if (imagesRef.current[i]) drawImage(canvas, imagesRef.current[i], 0, randsRef.current[i])
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{
        backgroundColor: '#f4f4f5',
        padding: 'clamp(56px, 10vw, 120px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: 'clamp(32px, 5vw, 60px)',
            borderBottom: '1px solid #0b1220',
            paddingBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(30px, 5vw, 60px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#0b1220',
            }}
          >
            What We Do
          </h2>
          <span
            style={{
              fontSize: '12px',
              letterSpacing: '0.16em',
              color: '#666666',
              textTransform: 'uppercase',
            }}
          >
            Free initial consultation on every project
          </span>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2px',
          }}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              setCanvasRef={setCanvasRef}
              onClick={() => onSelectService(service.title)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index, setCanvasRef, onClick }) {
  return (
    <button
      onClick={onClick}
      className="work-item"
      style={{
        border: '1px solid #0b1220',
        backgroundColor: '#ffffff',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left',
        display: 'block',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          backgroundColor: '#e5e5e5',
        }}
      >
        <canvas
          ref={(el) => setCanvasRef(el, index)}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </div>
      <div
        style={{
          padding: 'clamp(16px, 2vw, 20px) clamp(18px, 2.4vw, 24px)',
          borderTop: '1px solid #0b1220',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              color: '#666666',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            {service.id} &middot; {service.category}
          </p>
          <p
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              fontWeight: 500,
              color: '#0b1220',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            {service.title}
          </p>
        </div>
        <span
          style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            color: '#0b1220',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Enquire &rarr;
        </span>
      </div>
    </button>
  )
}

function drawImage(canvas, img, strength, rands) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cw = canvas.width
  const ch = canvas.height

  const imgRatio = img.width / img.height
  const canvasRatio = cw / ch
  let sw = img.width
  let sh = img.height
  let sx = 0
  let sy = 0
  if (imgRatio > canvasRatio) {
    sw = img.height * canvasRatio
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / canvasRatio
    sy = (img.height - sh) / 2
  }

  ctx.clearRect(0, 0, cw, ch)

  if (strength < 0.01) {
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
    return
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)

  const numStrips = Math.floor(3 + strength * 12)
  for (let s = 0; s < numStrips; s++) {
    const stripY = Math.floor(rands[s % 4] * ch * (0.3 + s * 0.15)) % ch
    const stripH = Math.floor(2 + Math.random() * ch * 0.06 * strength)
    const offsetX = (rands[(s + 1) % 4] - 0.5) * cw * 0.15 * strength
    if (rands[(s + 2) % 4] > 0.7) {
      ctx.drawImage(canvas, 0, stripY, cw, stripH, offsetX, stripY, cw, stripH)
    }
  }

  if (strength > 0.05) {
    const shiftAmount = strength * 6
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = strength * 0.3
    ctx.drawImage(canvas, shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.drawImage(canvas, -shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }

  if (strength > 0.3) {
    ctx.fillStyle = `rgba(255,255,255,${(strength - 0.3) * 0.15})`
    ctx.fillRect(0, 0, cw, ch)
  }
}
