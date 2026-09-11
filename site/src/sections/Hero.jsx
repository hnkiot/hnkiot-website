import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import WhatsAppIcon from '../components/WhatsAppIcon'

export default function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.35,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(560px, 100vh, 980px)',
        overflow: 'hidden',
        backgroundColor: '#070b14',
      }}
    >
      <img
        src="/images/hero.webp"
        alt="HNK engineering team reviewing live IoT device telemetry"
        fetchPriority="high"
        decoding="async"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(5,10,20,0.72) 0%, rgba(5,10,20,0.4) 35%, rgba(5,10,20,0.78) 100%)',
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          minHeight: 'clamp(560px, 100vh, 980px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 'clamp(18px, 3vw, 28px)',
          padding: 'clamp(96px, 14vh, 140px) clamp(20px, 4.5vw, 72px) clamp(40px, 6vh, 72px)',
          boxSizing: 'border-box',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(10px, 1.2vw, 12px)',
            fontWeight: 500,
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
          }}
        >
          Embedded Systems &middot; IoT &middot; Software &middot; Cape Town, South Africa
        </span>

        <h1
          style={{
            fontSize: 'clamp(34px, 7vw, 100px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            color: '#ffffff',
            maxWidth: '18ch',
            textShadow: '0 2px 24px rgba(0,0,0,0.3)',
          }}
        >
          Engineering
          <br />
          connected solutions
        </h1>

        <p
          style={{
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.88)',
            maxWidth: '58ch',
          }}
        >
          We build embedded systems, IoT and software from the circuit board
          through to the cloud dashboard, then support it after. Based in
          Cape Town, working with clients across South Africa and
          internationally.
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid rgba(255,255,255,0.4)',
            padding: 'clamp(10px, 1.4vw, 12px) clamp(16px, 2vw, 22px)',
            backgroundColor: 'rgba(5,10,20,0.4)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <span style={{ width: '8px', height: '8px', backgroundColor: '#33c9ff', flex: '0 0 auto' }} />
          <span
            style={{
              fontSize: 'clamp(10px, 1.1vw, 12px)',
              fontWeight: 500,
              letterSpacing: '0.16em',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Free initial consultation on every project
          </span>
        </div>

        <div style={{ display: 'flex', gap: '14px', marginTop: '4px', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: hovered ? '#070b14' : '#ffffff',
              backgroundColor: hovered ? '#ffffff' : 'transparent',
              border: '1px solid #ffffff',
              padding: '15px 32px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
            }}
          >
            Start a Project
          </button>
          <a
            href="https://wa.me/27614719400"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: '#ffffff',
              backgroundColor: '#25d366',
              border: '1px solid #25d366',
              padding: '15px 22px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <WhatsAppIcon size={14} color="#ffffff" />
            WhatsApp Us
          </a>
          <button
            onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: '#ffffff',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '15px 6px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              textDecoration: 'underline',
              textUnderlineOffset: '6px',
            }}
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  )
}
