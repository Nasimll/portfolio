import { NavBar } from "@/components/nav-bar";
import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { StatsSection } from "@/components/sections/stats-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <StatsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
