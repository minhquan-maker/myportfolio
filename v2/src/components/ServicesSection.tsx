import FadeIn from './FadeIn'

const services = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

function ServicesSection() {
  return (
    <section
      id="work"
      style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 'clamp(2.5rem, 8vw, 6rem)',
        borderTopRightRadius: 'clamp(2.5rem, 8vw, 6rem)',
        padding: '5rem 1.25rem 5rem',
      }}
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <FadeIn delay={0}>
        <h2
          style={{
            color: '#0C0C0C',
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            lineHeight: 1,
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          Services
        </h2>
      </FadeIn>

      {/* Service Items */}
      <div
        style={{ maxWidth: '1024px', margin: '0 auto', width: '100%' }}
        className="max-w-5xl"
      >
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(1rem, 3vw, 3rem)',
                padding: 'clamp(2rem, 4vw, 3rem) 0',
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
              }}
              className="py-8 sm:py-10 md:py-12"
            >
              {/* Number */}
              <span
                style={{
                  color: '#0C0C0C',
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  lineHeight: 0.85,
                  flexShrink: 0,
                }}
              >
                {service.number}
              </span>

              {/* Name + Description */}
              <div style={{ paddingTop: '0.5rem' }}>
                <h3
                  style={{
                    color: '#0C0C0C',
                    fontFamily: "'Kanit', sans-serif",
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.2,
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    color: '#0C0C0C',
                    fontFamily: "'Kanit', sans-serif",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    maxWidth: '672px',
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
