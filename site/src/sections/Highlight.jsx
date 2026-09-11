import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Highlight() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from([imgRef.current, textRef.current], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#f4f4f5',
        padding: 'clamp(56px, 10vw, 120px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'center',
        }}
      >
        <div ref={imgRef} style={{ border: '1px solid #0b1220', backgroundColor: '#ffffff', padding: '10px' }}>
          <img
            src="/images/highlight.webp"
            alt="HNK engineers servicing a rooftop solar telemetry installation"
            loading="lazy"
            decoding="async"
            style={{ width: '100%', display: 'block', aspectRatio: '4 / 3', objectFit: 'cover' }}
          />
        </div>

        <div ref={textRef}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: '#666666',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            How we work
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 50px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#0b1220',
              marginBottom: '22px',
            }}
          >
            Every project starts with a free consultation
          </h2>
          <p
            style={{
              fontSize: '15.5px',
              lineHeight: 1.7,
              color: '#333333',
              maxWidth: '540px',
              marginBottom: '28px',
            }}
          >
            Tell us what you are building or what is broken. We will talk it
            through, give you a clear scope and a fair quote before any work
            begins, and stay on the project from first prototype to
            handover. No jargon, no surprise costs.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: '#ffffff',
              backgroundColor: '#0b1220',
              border: '1px solid #0b1220',
              padding: '15px 32px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
            }}
          >
            Tell Us About Your Project
          </button>
        </div>
      </div>
    </section>
  )
}
