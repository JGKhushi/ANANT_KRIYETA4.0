import AboutSection from "../components/sections/AboutSection"
import FaqsSection from "../components/sections/FaqsSection"
import FeaturesSection from "../components/sections/FeaturesSection"
import GuideSection from "../components/sections/GuideSection"
import HeroSection from "../components/sections/HeroSection"
import PopularRecipesSection from "../components/sections/PopularRecipesSection"
import TestimonialsSection from "../components/sections/TestimonialsSection"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <GuideSection />
      <FaqsSection />
      <PopularRecipesSection />
      <TestimonialsSection />
    </main>
  )
}