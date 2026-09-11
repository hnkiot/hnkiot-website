import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { services } from '../data/services'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

// Retinted toward navy / cyan to match the HNK palette.
const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;

void main() {
  vec2 coord = gl_FragCoord.xy / resolution;
  vec2 st = coord;
  coord *= 10.0;

  float len;
  for (int i = 0; i < 5; i++) {
    len = length(vec2(coord.x, coord.y));
    coord.x += cos(coord.y + sin(len)) + cos(time * 0.06) * 0.2;
    coord.y += sin(coord.x + cos(len)) + sin(time * 0.09);
  }

  len *= cos(len * 0.4);
  len -= 10.0;

  for (float i = 0.0; i < 5.0; i++) {
    len += 1.0 / abs(mod(st.x, 0.09 * i) * 200.0) * 1.0;
  }

  float r = cos(len + 0.6) * 0.14 + 0.08;
  float g = cos(len + 0.15) * 0.28 + 0.34;
  float b = cos(len - 0.1) * 0.34 + 0.56;

  vec3 color = vec3(r, g, b);
  color = smoothstep(0.05, 0.9, color);
  color *= 0.85;

  gl_FragColor = vec4(color, 1.0);
}
`

const serviceOptions = ['Not sure, general enquiry', ...services.map((s) => s.title)]

export default function Contact({ presetService, onConsumePreset }) {
  const canvasRef = useRef(null)
  const canvasHostRef = useRef(null)
  const uniformsRef = useRef({
    resolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
    time: new THREE.Uniform(0),
  })

  const [submitHovered, setSubmitHovered] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: 'Not sure, general enquiry',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  useEffect(() => {
    if (presetService) {
      setFormData((prev) => ({ ...prev, serviceType: presetService }))
      onConsumePreset?.()
    }
  }, [presetService, onConsumePreset])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvasHostRef.current
    if (!canvas || !host) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { resolution: uniformsRef.current.resolution, time: uniformsRef.current.time },
      depthTest: false,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleResize = () => {
      const rect = host.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height, false)
      uniformsRef.current.resolution.value.set(rect.width, rect.height)
    }
    handleResize()

    const ro = new ResizeObserver(handleResize)
    ro.observe(host)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId
    const startTime = performance.now()
    const animate = () => {
      uniformsRef.current.time.value = reduce ? 0 : (performance.now() - startTime) / 1000
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.name || !formData.email) {
      setSubmitError('Please fill in your name and email.')
      return
    }

    setIsSubmitting(true)
    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

    if (formspreeEndpoint) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            serviceType: formData.serviceType,
            message: formData.message,
            _subject: `Project enquiry from ${formData.name}, ${formData.serviceType}`,
          }),
        })
        if (res.ok) {
          setSubmitted(true)
        } else {
          setSubmitError('Something went wrong. Please try again or WhatsApp us directly.')
        }
      } catch {
        setSubmitError('Network error. Please try again or WhatsApp us directly.')
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    // No form backend configured yet: fall back to opening a pre-filled email.
    const subject = encodeURIComponent(`Project enquiry: ${formData.serviceType}`)
    const bodyLines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone / WhatsApp: ${formData.phone}` : null,
      formData.company ? `Company: ${formData.company}` : null,
      `Service: ${formData.serviceType}`,
      '',
      formData.message || '(no additional message)',
    ].filter(Boolean)
    const body = encodeURIComponent(bodyLines.join('\n'))
    window.location.href = `mailto:hello@hnkiot.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(600px, 90vh, 760px)',
        backgroundColor: '#070b14',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
      }}
    >
      <div ref={canvasHostRef} style={{ position: 'relative', width: '100%', minHeight: '360px', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(22px, 4vw, 48px)',
            left: 'clamp(22px, 4vw, 48px)',
            right: 'clamp(22px, 4vw, 48px)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 4.5vw, 60px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '14px',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)',
              maxWidth: '18ch',
            }}
          >
            Let&rsquo;s build something
          </h2>
          <p style={{ fontSize: '13px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>
            HNK IoT Solutions &middot; Project Enquiries
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#070b14',
          color: '#ffffff',
          padding: 'clamp(36px, 5vw, 72px) clamp(22px, 4vw, 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '520px', width: '100%' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '14px' }}>
            Free consultation, no obligation
          </p>
          <h3 style={{ fontSize: 'clamp(22px, 3.2vw, 38px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '18px' }}>
            Start a project or ask us a question.
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
            Email{' '}
            <a href="mailto:hello@hnkiot.com" style={{ color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
              hello@hnkiot.com
            </a>{' '}
            or WhatsApp us directly.
          </p>

          <div style={{ marginBottom: '26px' }}>
            <a
              href="https://wa.me/27614719400"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 18px',
                backgroundColor: '#25d366',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              <WhatsAppIcon size={14} color="#ffffff" />
              WhatsApp HNK
            </a>
          </div>

          {submitted ? (
            <div style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '30px 26px', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
              Thank you. Your enquiry is on its way. We will get back to you
              within one business day.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {submitError && (
                <div style={{ border: '1px solid rgba(255,100,100,0.5)', padding: '12px 16px', fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,150,150,0.9)' }}>
                  {submitError}
                </div>
              )}
              <SelectField label="Service needed" name="serviceType" value={formData.serviceType} onChange={handleChange} options={serviceOptions} />
              <Row>
                <Field label="Full name" type="text" name="name" placeholder="Jane Doe" value={formData.name} onChange={handleChange} />
                <Field label="Email" type="email" name="email" placeholder="you@domain.com" value={formData.email} onChange={handleChange} />
              </Row>
              <Row>
                <Field label="Phone / WhatsApp (optional)" type="tel" name="phone" placeholder="+27 00 000 0000" value={formData.phone} onChange={handleChange} />
                <Field label="Company (optional)" type="text" name="company" placeholder="Your company" value={formData.company} onChange={handleChange} />
              </Row>
              <TextareaField label="Tell us about the project" name="message" placeholder="What are you building, or what needs fixing?" value={formData.message} onChange={handleChange} />
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  marginTop: '10px',
                  padding: '17px 24px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  color: submitHovered ? '#070b14' : '#ffffff',
                  backgroundColor: submitHovered ? '#ffffff' : 'transparent',
                  border: '1px solid #ffffff',
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  fontFamily: 'inherit',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Row({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '18px' }}>{children}</div>
}

const fieldBase = {
  width: '100%',
  padding: '11px 0',
  fontSize: '15px',
  backgroundColor: 'transparent',
  color: '#ffffff',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.35)',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const labelBase = {
  fontSize: '11px',
  letterSpacing: '0.16em',
  color: 'rgba(255,255,255,0.6)',
  textTransform: 'uppercase',
  marginBottom: '4px',
  display: 'block',
}

function Field({ label, type, name, placeholder, value, onChange }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={fieldBase}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#ffffff')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
      />
    </label>
  )
}

function SelectField({ label, name, options, value, onChange }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, paddingRight: '20px' }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#ffffff')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: '#000', backgroundColor: '#fff' }}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextareaField({ label, name, placeholder, value, onChange }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, resize: 'vertical', paddingTop: '10px' }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#ffffff')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
      />
    </label>
  )
}
