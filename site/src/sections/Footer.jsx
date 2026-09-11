import WhatsAppIcon from '../components/WhatsAppIcon'

const socials = [
  ['GitHub', 'https://github.com/hnkiot'],
  ['LinkedIn', 'https://www.linkedin.com/in/hnk-iot-solutions/'],
  ['Instagram', 'https://www.instagram.com/hnkiotsolutions/'],
  ['X', 'https://x.com/HnkIotSolutions'],
  ['Facebook', 'https://www.facebook.com/HnkIoTSolutions'],
  ['YouTube', 'https://www.youtube.com/@HNKIoTSolutions'],
]

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #0b1220',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 60px) 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '36px',
          paddingBottom: 'clamp(48px, 8vw, 80px)',
        }}
      >
        <div>
          <p style={headingStyle}>STUDIO</p>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#0b1220', marginBottom: '8px' }}>
            HNK IoT Solutions
          </p>
          <p style={{ fontSize: '14px', color: '#666666', lineHeight: 1.6, marginBottom: '8px', maxWidth: '260px' }}>
            Embedded systems, IoT and software, from the circuit board to the
            cloud.
          </p>
          <p style={{ fontSize: '14px', color: '#0b1220', fontWeight: 500, marginBottom: '4px' }}>
            Cape Town, South Africa
          </p>
          <p style={metaStyle}>
            Working with clients worldwide.
            <br />
            Remote and on-site support.
          </p>
        </div>

        <div>
          <p style={headingStyle}>AVAILABILITY</p>
          <p style={{ fontSize: '14px', color: '#0b1220', fontWeight: 500, marginBottom: '4px' }}>
            Monday to Friday
          </p>
          <p style={{ fontSize: '14px', color: '#666666', lineHeight: 2 }}>
            09:00 to 17:00 SAST
            <br />
            Remote enquiries any time
            <br />
            We reply within one business day
          </p>
        </div>

        <div>
          <p style={headingStyle}>WHAT WE DO</p>
          <p style={{ fontSize: '14px', color: '#666666', lineHeight: 2 }}>
            Embedded systems and firmware
            <br />
            IoT and telemetry
            <br />
            Software and dashboards
            <br />
            Electronics and prototyping
            <br />
            Technical support and training
          </p>
        </div>

        <div>
          <p style={headingStyle}>CONTACT</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="https://wa.me/27614719400"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#25d366',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                width: 'fit-content',
              }}
            >
              <WhatsAppIcon size={16} color="#ffffff" />
              WhatsApp: +27 61 471 9400
            </a>
            <p style={{ fontSize: '14px', color: '#666666', lineHeight: 2, margin: 0 }}>
              <a href="mailto:hello@hnkiot.com" style={{ color: '#0b1220', textDecoration: 'none' }}>
                hello@hnkiot.com
              </a>
              <br />
              <a href="https://hnkiot.com" style={{ color: '#0b1220', textDecoration: 'none' }}>
                hnkiot.com
              </a>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 16px', marginTop: '4px' }}>
              {socials.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', letterSpacing: '0.06em', color: '#666666', textDecoration: 'none', textTransform: 'uppercase' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', overflow: 'hidden', padding: 'clamp(12px, 2vw, 24px) 0' }}>
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(48px, 14vw, 240px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.04em',
            color: '#0b1220',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          HNKIOT
        </span>
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: '18px 0',
          borderTop: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '12px',
          color: '#999999',
        }}
      >
        <span>&copy; {new Date().getFullYear()} HNK IoT Solutions (Pty) Ltd.</span>
        <span>Embedded Systems | IoT | Software | Training</span>
      </div>
    </footer>
  )
}

const headingStyle = {
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.16em',
  color: '#0b1220',
  marginBottom: '18px',
}

const metaStyle = {
  fontSize: '11px',
  letterSpacing: '0.04em',
  color: '#666666',
  lineHeight: 1.8,
}
