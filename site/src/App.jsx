import React, { useEffect, useState } from 'react'

const NAV = [
  ['Services', 'services'],
  ['Engineering & IoT', 'engineering'],
  ['Software', 'software'],
  ['Technical Support', 'support'],
  ['Training', 'training'],
  ['Projects', 'projects'],
  ['About', 'about'],
  ['Contact', 'contact'],
]

const CONTACT_EMAIL = 'hello@hnkiot.com'

const SERVICE_GROUPS = [
  {
    id: 'engineering',
    kicker: 'Embedded • Hardware • IoT',
    title: 'Engineering & IoT',
    lead:
      'Device-to-cloud systems built end to end — from the microcontroller and the PCB to the dashboard your team logs into.',
    items: [
      'Embedded systems development (ESP32, STM32, Arduino)',
      'IoT systems, sensors and telemetry',
      'Device-to-cloud architecture and integration',
      'Hardware / software integration',
      'PCB-related work and prototype development',
      'Proof-of-concept development',
      'Electronics, circuit and hardware troubleshooting',
      'Automation and IoT dashboards',
    ],
  },
  {
    id: 'software',
    kicker: 'Web • Apps • APIs',
    title: 'Software Development',
    lead:
      'Clean, maintainable software for the web and connected devices, delivered by an engineer who also knows the hardware side.',
    items: [
      'Web development — React / JavaScript / TypeScript',
      'Backend and API development',
      'Python',
      'C / C++',
      'C# / .NET',
      'IoT dashboards and data visualisation',
      'Automation scripts and tooling',
    ],
  },
  {
    id: 'support',
    kicker: 'Remote • On-site • Ongoing',
    title: 'Technical & IT Support',
    lead:
      'Practical support for engineering teams, small businesses and individuals — remotely for clients anywhere, or on-site in Cape Town.',
    items: [
      'IT support and computer hardware support',
      'Networking',
      'Remote technical support',
      'Electrical, electronic and computer engineering support',
      'Solar / PV / BESS technical support',
      'AutoCAD support and training',
    ],
  },
  {
    id: 'training',
    kicker: 'Tutoring • Workshops • Upskilling',
    title: 'Training & Tutoring',
    lead:
      'Engineering and programming taught by someone who works in the field — for university students, high-school learners and professionals.',
    items: [
      'Engineering tutoring and university technical tutoring',
      'Programming tutoring',
      'Technical training and STEM workshops',
      'High-school Mathematics, Physics, Coding and Electronics',
      'Remote training for international learners',
    ],
  },
]

const PROJECTS = [
  {
    tag: 'IoT / Telemetry',
    title: 'Device-to-cloud monitoring',
    body:
      'Sensor nodes streaming live telemetry to a hosted dashboard, with alerting and historical logging.',
  },
  {
    tag: 'Embedded',
    title: 'Custom firmware & prototypes',
    body:
      'ESP32 / STM32 firmware and prototype boards taken from concept to a working proof of concept.',
  },
  {
    tag: 'Software',
    title: 'Dashboards & automation',
    body:
      'React dashboards and automation tooling that turn raw device data into decisions.',
  },
]

const CAPABILITIES = [
  'Embedded systems',
  'ESP32 / STM32 / Arduino',
  'Sensors & telemetry',
  'PCB & prototyping',
  'React / TypeScript',
  'Python / C / C++ / .NET',
  'IoT dashboards',
  'Automation',
  'Networking & IT support',
  'Solar / PV / BESS support',
  'Engineering training',
  'STEM workshops',
]

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrolled
}

export default function App() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const year = new Date().getFullYear()

  const close = () => setMenuOpen(false)

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
        <div className="wrap header-inner">
          <a href="#home" className="brand" onClick={close}>
            <span className="brand-mark" aria-hidden="true">HNK</span>
            <span className="brand-text">
              <strong>HNK IoT Solutions</strong>
              <small>Engineering • Software • Embedded • IoT</small>
            </span>
          </a>

          <nav className={'nav' + (menuOpen ? ' is-open' : '')} aria-label="Primary">
            {NAV.map(([label, id]) => (
              <a key={id} href={'#' + id} onClick={close}>{label}</a>
            ))}
            <a className="nav-cta" href="#contact" onClick={close}>Start a project</a>
          </nav>

          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="home" className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">South African engineering company · working worldwide</p>
              <h1>
                Embedded systems, IoT and software —
                <span className="accent"> built and supported end to end.</span>
              </h1>
              <p className="lead">
                HNK IoT Solutions designs connected hardware, writes the software that
                runs on it and in the cloud, and supports the people who use it. Based in
                Cape Town, delivering to clients across Africa, Europe, the UK and the US.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">Start a project</a>
                <a className="btn btn-ghost" href="#services">See what we do</a>
              </div>
              <ul className="hero-points">
                <li>Device-to-cloud systems</li>
                <li>Prototype to production</li>
                <li>Remote-first delivery</li>
              </ul>
            </div>

            <div className="hero-card" aria-hidden="true">
              <div className="hero-card-head">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span className="hero-card-title">telemetry.hnkiot.com</span>
              </div>
              <pre className="hero-code">
{`// ESP32 node -> cloud
sensor.read(&t, &h);
mqtt.publish("hnk/site-01", json({
  temp:  t,
  hum:   h,
  rssi:  WiFi.RSSI(),
  ts:    now()
}));
// -> live dashboard + alerts`}
              </pre>
              <div className="hero-metrics">
                <div><strong>24/7</strong><span>monitoring</span></div>
                <div><strong>&lt;1s</strong><span>ingest</span></div>
                <div><strong>100%</strong><span>your data</span></div>
              </div>
            </div>
          </div>

          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES OVERVIEW */}
        <section id="services" className="section">
          <div className="wrap">
            <header className="section-head">
              <p className="eyebrow">What we do</p>
              <h2>One partner across hardware, software and support</h2>
              <p className="section-lead">
                Most projects need more than one discipline. HNK IoT Solutions covers the
                whole path — so the firmware engineer, the web developer and the person
                doing support are the same team.
              </p>
            </header>

            <div className="cards">
              {SERVICE_GROUPS.map((g) => (
                <a className="card" href={'#' + g.id} key={g.id}>
                  <p className="card-kicker">{g.kicker}</p>
                  <h3>{g.title}</h3>
                  <p>{g.lead}</p>
                  <span className="card-link">Explore →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* DETAIL SECTIONS */}
        {SERVICE_GROUPS.map((g, idx) => (
          <section id={g.id} className={'section detail' + (idx % 2 ? ' detail-alt' : '')} key={g.id}>
            <div className="wrap detail-grid">
              <div className="detail-copy">
                <p className="eyebrow">{g.kicker}</p>
                <h2>{g.title}</h2>
                <p className="section-lead">{g.lead}</p>
                <a className="btn btn-primary" href="#contact">Discuss a {g.title.toLowerCase()} project</a>
              </div>
              <ul className="ticklist">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="wrap">
            <header className="section-head">
              <p className="eyebrow">Projects & portfolio</p>
              <h2>Representative work</h2>
              <p className="section-lead">
                A snapshot of the kind of systems we build. Detailed case studies are
                available on request — some client work is under NDA.
              </p>
            </header>
            <div className="cards">
              {PROJECTS.map((p) => (
                <article className="card project" key={p.title}>
                  <p className="card-kicker">{p.tag}</p>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section detail detail-alt">
          <div className="wrap detail-grid">
            <div className="detail-copy">
              <p className="eyebrow">About</p>
              <h2>Engineering from Cape Town, delivered anywhere</h2>
              <p className="section-lead">
                HNK IoT Solutions is a registered South African private company. We work
                with startups, established businesses, researchers and students who need
                embedded, IoT and software engineering done properly — and explained clearly.
              </p>
              <p className="section-lead">
                Our work is remote-first. Most of it can be done for clients anywhere in
                the world; on-site work is available in and around Cape Town.
              </p>
            </div>
            <ul className="ticklist">
              <li>Registered private company in South Africa</li>
              <li>Serving South African, African and international clients</li>
              <li>Remote engineering, software and training delivery</li>
              <li>Prototype, proof-of-concept and production work</li>
              <li>Clear communication and documentation</li>
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact">
          <div className="wrap">
            <header className="section-head">
              <p className="eyebrow">Contact</p>
              <h2>Tell us what you&rsquo;re building</h2>
              <p className="section-lead">
                Send a short description of your project, system or the support you need.
                You&rsquo;ll get a considered reply — not a sales script.
              </p>
            </header>

            <div className="contact-grid">
              <form
                className="contact-form"
                action={'mailto:' + CONTACT_EMAIL}
                method="post"
                encType="text/plain"
              >
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="field">
                  <label htmlFor="message">Project / enquiry</label>
                  <textarea id="message" name="message" rows="5" required />
                </div>
                <button className="btn btn-primary" type="submit">Send enquiry</button>
                <p className="form-note">
                  Opens your email app. Prefer to write directly?{' '}
                  <a href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>
                </p>
              </form>

              <aside className="contact-aside">
                <h3>Direct</h3>
                <p>
                  <a href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL}</a><br />
                  <span className="muted">General enquiries &amp; new projects</span>
                </p>
                <h3>Location</h3>
                <p>Cape Town, South Africa<br />
                  <span className="muted">Remote delivery worldwide</span></p>
                <h3>Areas</h3>
                <p className="muted">
                  South Africa · Africa · Europe · UK · United States · remote clients everywhere
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div>
            <span className="brand-mark" aria-hidden="true">HNK</span>
            <p>
              <strong>HNK IoT Solutions</strong><br />
              Embedded Systems | IoT | Software Development | Technical Support | Engineering Training
            </p>
          </div>
          <nav aria-label="Footer">
            {NAV.map(([label, id]) => (
              <a key={id} href={'#' + id}>{label}</a>
            ))}
          </nav>
        </div>
        <div className="wrap footer-legal">
          <span>© {year} HNK IoT Solutions. Registered private company, South Africa.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}
