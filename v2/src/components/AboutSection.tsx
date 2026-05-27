import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import AnimatedText from './AnimatedText'

const DECORATIVE_IMAGES = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    className: 'w-[120px] sm:w-[160px] md:w-[210px]',
    position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    className: 'w-[100px] sm:w-[140px] md:w-[180px]',
    position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    className: 'w-[120px] sm:w-[160px] md:w-[210px]',
    position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    className: 'w-[130px] sm:w-[170px] md:w-[220px]',
    position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    delay: 0.3,
    x: 80,
  },
]

const ABOUT_TEXT =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: '#0C0C0C',
        padding: '5rem 1.25rem 5rem',
      }}
      className="px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative Images */}
      {DECORATIVE_IMAGES.map((img, i) => (
        <FadeIn key={i} delay={img.delay} x={img.x} y={0} duration={0.9}>
          <img
            src={img.src}
            alt=""
            className={`absolute ${img.className} ${img.position}`}
            style={{
              maxWidth: '210px',
            }}
          />
        </FadeIn>
      ))}

      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading"
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            textAlign: 'center',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            marginBottom: 'clamp(2.5rem, 6vw, 5rem)',
          }}
        >
          About me
        </h2>
      </FadeIn>

      {/* Animated Paragraph */}
      <FadeIn delay={0.1} y={20}>
        <AnimatedText
          text={ABOUT_TEXT}
          className="text-center leading-relaxed max-w-[560px] mx-auto"
          style={{
            color: '#D7E2EA',
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 500,
            lineHeight: 1.7,
            maxWidth: '560px',
            textAlign: 'center',
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            marginBottom: 'clamp(4rem, 8vw, 6rem)',
          }}
        />
      </FadeIn>

      {/* Contact Button */}
      <FadeIn delay={0.2} y={20}>
        <ContactButton />
      </FadeIn>
    </section>
  )
}

export default AboutSection
