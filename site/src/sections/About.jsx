import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
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
        backgroundColor: '#ffffff',
        padding: 'clamp(56px, 10vw, 120px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'center',
        }}
      >
        <div ref={imgRef} style={{ maxWidth: '340px' }}>
          <div style={{ border: '1px solid #0b1220', backgroundColor: '#ffffff', padding: '10px' }}>
            <img
              src="/images/founder.webp"
              alt="Henock Hnk, Founder and Lead Engineer at HNK IoT Solutions"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', display: 'block', aspectRatio: '4 / 5', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div ref={textRef}>
          <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: '#666666', textTransform: 'uppercase', marginBottom: '16px' }}>
            Who&rsquo;s behind it
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 50px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#0b1220',
              marginBottom: '22px',
            }}
          >
            Henock Hnk, Founder and Lead Engineer
          </h2>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#333333', maxWidth: '560px', marginBottom: '16px' }}>
            HNK IoT Solutions (Pty) Ltd is registered with the CIPC
            (Companies and Intellectual Property Commission). It is
            engineer led, not a reseller: the same person and team who
            design the circuit and write the firmware also build the cloud
            backend, so a support call never dead ends at someone who has
            never seen the schematic.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#333333', maxWidth: '560px', marginBottom: '28px' }}>
            Based in Cape Town, working in English and French, with clients
            across South Africa and internationally.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Embedded Systems', 'IoT', 'Software', 'English & French'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: '#0b1220',
                  padding: '9px 14px',
                  border: '1px solid #0b1220',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
