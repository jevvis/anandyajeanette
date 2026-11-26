import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WorkGallery, { ReelSection, ProjectGallery, MediaGallery, VentureGallery, VolunteerGallery } from '@/components/WorkGallery'
import {
  AboutSection,
  EducationSection,
  AwardsSection,
  SkillsSection,
  PersonalSkillsSection,
} from '@/components/Sections'
import Contact from '@/components/Contact'
import FadeInSection from '@/components/FadeInSection'
import Intro from '@/components/Intro'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Intro />
      <Navbar />
      <Hero />
      <FadeInSection>
        <AboutSection />
      </FadeInSection>
      <FadeInSection>
        <EducationSection />
      </FadeInSection>
      <FadeInSection>
        <WorkGallery />
      </FadeInSection>
      <FadeInSection>
        <ReelSection />
      </FadeInSection>
      <FadeInSection>
        <ProjectGallery />
      </FadeInSection>
      <FadeInSection>
        <MediaGallery />
      </FadeInSection>
      <FadeInSection>
        <VentureGallery />
      </FadeInSection>
      <FadeInSection>
        <VolunteerGallery />
      </FadeInSection>
      <FadeInSection>
        <AwardsSection />
      </FadeInSection>
      <FadeInSection>
        <SkillsSection />
      </FadeInSection>
      <FadeInSection>
        <PersonalSkillsSection />
      </FadeInSection>
      <FadeInSection>
        <Contact />
      </FadeInSection>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-[var(--card-border)]">
        <p className="text-[var(--muted)] text-sm">
          © {new Date().getFullYear()} Anandya Jeanette Bintang Maharani. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
