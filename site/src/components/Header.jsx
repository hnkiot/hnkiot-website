import { useEffect, useRef, useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const navItems = ['Services', 'Why HNK', 'Contact']
const sectionIds = ['#works', '#capabilities', '#contact']

export default function Header({ scrollRef }) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 100)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 820)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompact])

  const overHero = overHeroRaw
  const textColor = overHero ? '#ffffff' : '#0b1220'
  const headerHeight = isCompact ? '64px' : '84px'

  const handleNavClick = (index) => {
    const target = document.querySelector(sectionIds[index])
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: headerHeight,
          backgroundColor: overHero ? 'transparent' : 'rgba(255,255,255,0.96)',
          borderBottom: overHero ? '1px solid rgba(255,255,255,0.18)' : '1px solid #e5e5e5',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 4vw, 56px)',
          transition:
            'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease',
          boxSizing: 'border-box',
          backdropFilter: overHero ? 'none' : 'blur(10px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            cursor: 'pointer',
            color: textColor,
            transition: 'color 0.4s ease',
            flexShrink: 1,
            minWidth: 0,
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setMobileMenuOpen(false)
          }}
        >
          <span
            style={{
              fontSize: 'clamp(13px, 1.8vw, 18px)',
              fontWeight: 600,
              letterSpacing: '0.16em',
              whiteSpace: 'nowrap',
            }}
          >
            HNK IOT SOLUTIONS
          </span>
          {!isMobile && (
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                opacity: 0.65,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              From circuit board to cloud
            </span>
          )}
        </div>

        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
            {navItems.map((item, i) => (
              <NavItem key={item} label={item} overHero={overHero} onClick={() => handleNavClick(i)} />
            ))}
            <a
              href="https://wa.me/27614719400"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '8px',
                padding: '0 18px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: '#ffffff',
                backgroundColor: '#25d366',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontFamily: 'inherit',
              }}
            >
              <WhatsAppIcon size={14} color="#ffffff" />
              WhatsApp
            </a>
          </nav>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '44px',
              height: '44px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: textColor,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transformOrigin: 'center',
                transform: mobileMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: textColor,
                opacity: mobileMenuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: textColor,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transformOrigin: 'center',
                transform: mobileMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        )}
      </header>

      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: headerHeight,
            left: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            borderBottom: mobileMenuOpen ? '1px solid #e5e5e5' : 'none',
            zIndex: 99,
            overflow: 'hidden',
            maxHeight: mobileMenuOpen ? '420px' : '0',
            transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(i)}
              style={{
                display: 'block',
                width: '100%',
                padding: '18px clamp(16px, 4vw, 56px)',
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#0b1220',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'inherit',
              }}
            >
              {item}
            </button>
          ))}
          <a
            href="https://wa.me/27614719400"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '18px clamp(16px, 4vw, 56px)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: '#ffffff',
              backgroundColor: '#25d366',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          >
            <WhatsAppIcon size={16} color="#ffffff" />
            WhatsApp Us Now
          </a>
        </div>
      )}
    </>
  )
}

function NavItem({ label, overHero, onClick }) {
  const [hovered, setHovered] = useState(false)
  const baseColor = overHero ? '#ffffff' : '#0b1220'
  const hoverBg = overHero ? '#ffffff' : '#0b1220'
  const hoverFg = overHero ? '#0b1220' : '#ffffff'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(10px, 1.4vw, 22px)',
        fontSize: '13px',
        fontWeight: 400,
        letterSpacing: '0.06em',
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: hovered ? hoverFg : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: 'inherit',
        textTransform: 'uppercase',
        height: '100%',
      }}
    >
      {label}
    </button>
  )
}
