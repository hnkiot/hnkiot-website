import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const capabilities = [
  { label: 'Embedded Systems', detail: 'ESP32, STM32 and Arduino firmware, from first boot to production-grade device control.' },
  { label: 'Internet of Things', detail: 'Sensors, gateways and device-to-cloud telemetry that reach a real dashboard.' },
  { label: 'Software Development', detail: 'Web apps, APIs and dashboards in React, Python, C, C++ and .NET.' },
  { label: 'Electronics and Prototyping', detail: 'Circuit development, PCB work and hardware and software integration.' },
  { label: 'Technical Support', detail: 'Hardware, software and network troubleshooting, remote or on-site.' },
  { label: 'Networking', detail: 'Wi-Fi, wired networks and connected infrastructure for home and business.' },
  { label: 'Energy Monitoring', detail: 'PV, BESS and smart metering dashboards for solar and energy systems.' },
  { label: 'Engineering Training', detail: 'Embedded, IoT, electronics and programming tutoring and workshops.' },
]

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#070b14',
        padding: 'clamp(64px, 11vw, 160px) clamp(20px, 4vw, 60px)',
      }}
    >
      <img
        src="/images/capabilities-bg.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.28,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(7,11,20,0.72)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            gap: 'clamp(28px, 6vw, 80px)',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: 'clamp(36px, 6vw, 60px)',
            paddingBottom: '26px',
            borderBottom: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <div style={{ flex: '1 1 min(100%, 500px)' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Why choose us
            </p>
            <h2
              style={{
                fontSize: 'clamp(30px, 6vw, 72px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '22px',
              }}
            >
              Why HNK IoT Solutions
            </h2>
            <p
              style={{
                fontSize: 'clamp(14px, 1.2vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.78)',
                maxWidth: '620px',
              }}
            >
              One engineer led team, from the first sketch on a whiteboard to
              a system running unattended in the field. No handoffs, and no
              finger pointing between the people who built the hardware and
              the people who wrote the software.
            </p>
          </div>
          <div
            style={{
              flex: '0 0 clamp(140px, 20vw, 240px)',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrbitalBadge />
          </div>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2px',
            backgroundColor: 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.16)',
          }}
        >
          {capabilities.map((c, i) => (
            <BulletItem key={c.label} index={i} {...c} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function BulletItem({ label, detail, index }) {
  return (
    <li
      style={{
        backgroundColor: 'rgba(7,11,20,0.6)',
        padding: 'clamp(18px, 2.4vw, 26px) clamp(18px, 2.4vw, 30px)',
        display: 'flex',
        gap: '18px',
        alignItems: 'flex-start',
        minHeight: '112px',
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: '26px',
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.5)',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: '6px',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ flex: '1 1 0%', minWidth: 0 }}>
        <h3
          style={{
            fontSize: 'clamp(15px, 1.5vw, 20px)',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
            color: '#ffffff',
            marginBottom: '8px',
          }}
        >
          {label}
        </h3>
        <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          {detail}
        </p>
      </div>
    </li>
  )
}

function OrbitalBadge() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const pathId = `orbital-path-${Math.floor(Math.random() * 10000)}`
    const duration = 26
    const path = svg.querySelector('path')
    if (!path) return
    path.setAttribute('id', pathId)
    path.setAttribute('fill', 'none')

    const textContent = 'HNK IOT SOLUTIONS • CIRCUIT BOARD TO CLOUD • '

    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textEl.setAttribute('fill', '#33c9ff')
    textEl.setAttribute('font-family', 'inherit')
    textEl.setAttribute('font-size', '17px')
    textEl.setAttribute('font-weight', '500')
    textEl.setAttribute('letter-spacing', '2px')

    const tp1 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp1.setAttribute('href', `#${pathId}`)
    tp1.setAttribute('startOffset', '0%')
    tp1.textContent = textContent

    const tp2 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp2.setAttribute('href', `#${pathId}`)
    tp2.setAttribute('startOffset', '0%')
    tp2.textContent = textContent

    textEl.appendChild(tp1)
    textEl.appendChild(tp2)
    svg.appendChild(textEl)

    const textPaths = svg.querySelectorAll('textPath')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let tween1, tween2
    if (!reduce) {
      tween1 = gsap.fromTo(textPaths[0], { attr: { startOffset: '0%' } }, { attr: { startOffset: '-100%' }, duration, ease: 'none', repeat: -1 })
      tween2 = gsap.fromTo(textPaths[1], { attr: { startOffset: '100%' } }, { attr: { startOffset: '0%' }, duration, ease: 'none', repeat: -1 })
    }

    return () => {
      tween1?.kill()
      tween2?.kill()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-15deg)' }}
      >
        <path d="M200,40 A160,160 0 1,1 199.99,40" fill="none" stroke="#33c9ff" strokeWidth="0.5" opacity="0.3" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '52%',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b1220',
          border: '1.5px solid rgba(51,201,255,0.4)',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: 'clamp(18px, 3vw, 28px)',
            letterSpacing: '0.04em',
            color: '#33c9ff',
          }}
        >
          HNK
        </span>
      </div>
    </div>
  )
}
