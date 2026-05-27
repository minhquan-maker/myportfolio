import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'
import { projects } from '../data/projects'

const TOTAL_CARDS = projects.length

function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        background: '#0C0C0C',
        borderTopLeftRadius: 'clamp(2.5rem, 8vw, 6rem)',
        borderTopRightRadius: 'clamp(2.5rem, 8vw, 6rem)',
        marginTop: '-2.5rem',
        position: 'relative',
        zIndex: 10,
        padding: '0 1.25rem 5rem',
      }}
      className="px-5 sm:px-8 md:px-10 -mt-10 sm:-mt-12 md:-mt-14"
    >
      {/* Heading */}
      <FadeIn delay={0}>
        <h2
          className="hero-heading"
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            lineHeight: 1,
            paddingTop: 'clamp(3rem, 8vw, 7rem)',
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          Project
        </h2>
      </FadeIn>

      {/* Cards */}
      <div style={{ maxWidth: '1024px', margin: '0 auto', width: '100%' }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div
      ref={containerRef}
      style={{
        height: '85vh',
        position: 'relative',
        marginBottom: '2rem',
      }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 'clamp(6rem, 10vw, 8rem)',
          height: 'clamp(400px, 70vh, 700px)',
          scale,
          border: '2px solid #D7E2EA',
          borderRadius: 'clamp(2.5rem, 6vw, 6rem)',
          background: '#0C0C0C',
          padding: 'clamp(1rem, 3vw, 2rem)',
          overflow: 'hidden',
        }}
        className="p-4 sm:p-6 md:p-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
      >
        {/* Top Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Number */}
            <span
              style={{
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(4rem, 12vw, 120px)',
                lineHeight: 1,
                background: 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {project.number}
            </span>
            {/* Category */}
            <span
              style={{
                color: '#D7E2EA',
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                opacity: 0.6,
              }}
            >
              {project.category} — {project.type}
            </span>
          </div>

          {/* Project Name + Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h3
              style={{
                color: '#D7E2EA',
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              {project.name}
            </h3>
            <LiveProjectButton
              onClick={() => {
                if (project.link && project.link !== '#') {
                  window.open(project.link, '_blank')
                }
              }}
            />
          </div>
        </div>

        {/* Image Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            gap: 'clamp(0.75rem, 2vw, 1.25rem)',
            height: 'calc(100% - clamp(5rem, 12vw, 10rem))',
          }}
        >
          {/* Left Column - 2 stacked images */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              height: '100%',
            }}
          >
            <img
              src={project.col1Image1}
              alt={`${project.name} work 1`}
              style={{
                flex: 1,
                borderRadius: 'clamp(1.5rem, 4vw, 3rem)',
                objectFit: 'cover',
                width: '100%',
                height: 'clamp(130px, 16vw, 230px)',
                border: '1px solid rgba(215, 226, 234, 0.1)',
                minHeight: '100px',
              }}
              onError={(e) => {
                e.currentTarget.style.background = 'rgba(215, 226, 234, 0.1)'
                e.currentTarget.style.display = 'flex'
                e.currentTarget.style.alignItems = 'center'
                e.currentTarget.style.justifyContent = 'center'
                e.currentTarget.src = ''
              }}
            />
            <img
              src={project.col1Image2}
              alt={`${project.name} work 2`}
              style={{
                flex: 1,
                borderRadius: 'clamp(1.5rem, 4vw, 3rem)',
                objectFit: 'cover',
                width: '100%',
                height: 'clamp(160px, 22vw, 340px)',
                border: '1px solid rgba(215, 226, 234, 0.1)',
                minHeight: '120px',
              }}
              onError={(e) => {
                e.currentTarget.style.background = 'rgba(215, 226, 234, 0.1)'
                e.currentTarget.src = ''
              }}
            />
          </div>

          {/* Right Column - 1 tall image */}
          <img
            src={project.col2Image}
            alt={`${project.name} main work`}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'clamp(1.5rem, 4vw, 3rem)',
              objectFit: 'cover',
              border: '1px solid rgba(215, 226, 234, 0.1)',
              minHeight: '200px',
            }}
            onError={(e) => {
              e.currentTarget.style.background = 'rgba(215, 226, 234, 0.1)'
              e.currentTarget.src = ''
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectsSection
