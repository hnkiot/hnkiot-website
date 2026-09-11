import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const shots = [
  { img: '/images/gallery-01.webp', caption: 'Reviewing live device data on a fleet dashboard' },
  { img: '/images/gallery-02.webp', caption: 'IoT gateway hardware, ready for deployment' },
  { img: '/images/gallery-03.webp', caption: 'Walking through an IoT system architecture' },
  { img: '/images/gallery-04.webp', caption: 'Scoping a project before the first line of code' },
  { img: '/images/gallery-05.webp', caption: 'Briefing a client on a connected systems rollout' },
]

export default function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#f4f4f5', padding: 'clamp(56px, 10vw, 120px) clamp(20px, 4vw, 60px)' }}>
      <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: 'clamp(28px, 4.5vw, 48px)',
            borderBottom: '1px solid #0b1220',
            paddingBottom: '20px',
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: '#0b1220' }}>
            A Closer Look
          </h2>
          <span style={{ fontSize: '12px', letterSpacing: '0.16em', color: '#666666', textTransform: 'uppercase' }}>
            Real work, not stock photos
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(12px, 2vw, 20px)',
          }}
        >
          {shots.map((shot) => (
            <figure key={shot.img} className="gallery-item" style={{ margin: 0, border: '1px solid #0b1220', backgroundColor: '#ffffff' }}>
              <img
                src={shot.img}
                alt={shot.caption}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', display: 'block', aspectRatio: '4 / 3', objectFit: 'cover' }}
              />
              <figcaption style={{ padding: '14px 16px', fontSize: '13px', lineHeight: 1.5, color: '#333333', borderTop: '1px solid #e5e5e5' }}>
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
