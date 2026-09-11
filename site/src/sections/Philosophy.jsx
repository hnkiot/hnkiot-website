import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tags = ['Embedded', 'IoT', 'Software']

export default function Philosophy() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const tagsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const tagsEl = tagsRef.current
    if (!section || !text || !tagsEl) return

    const ctx = gsap.context(() => {
      gsap.from(text, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })
      gsap.from(tagsEl.children, {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 65%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        padding: 'clamp(64px, 12vw, 160px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: 'clamp(32px, 6vw, 80px)',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <p
          ref={textRef}
          style={{
            flex: '1 1 min(100%, 700px)',
            fontSize: 'clamp(24px, 4.2vw, 58px)',
            fontWeight: 400,
            lineHeight: 1.28,
            letterSpacing: '-0.02em',
            color: '#0b1220',
            maxWidth: '1200px',
          }}
        >
          We believe good engineering is measured in honesty: a clear scope,
          a fair quote, and a system that keeps working after we leave. One
          team designs the circuit, writes the firmware, and builds the
          cloud backend, so support never dead ends at someone who never saw
          the schematic.
        </p>

        <div
          ref={tagsRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingTop: '10px',
            flex: '0 0 auto',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                color: '#0b1220',
                padding: '10px 18px',
                border: '1px solid #0b1220',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
