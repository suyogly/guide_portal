import Hero from "@/components/Hero";
import OrganicGrid from "@/components/OrganicGrid";
import HowItWorks from "@/components/HowItWorks";
import AudienceSelector from "@/components/AudienceSelector";
import GuideSpotlight from "@/components/GuideSpotlight";
import SeoContentBlock from "@/components/SeoContentBlock";
import Testimonials from "@/components/Testimonials";
import WhyIndependentGuide from "@/components/WhyIndependentGuide";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. Hero */}
      <Hero />

      {/* 2. How It Works (Process) */}
      <HowItWorks />

      {/* 3. Meet the Locals - Guide Strip */}
      <GuideSpotlight />

      {/* 4. Why Independent Guide (Objection Killer) */}
      <WhyIndependentGuide />

      {/* 5. Find Guides for Popular Routes */}
      <section className="py-20">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Find Guides for Popular Routes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find verified, independent local guides who specialized in Nepal's most iconic trails. Your journey, your terms.
          </p>
        </div>
        <OrganicGrid />
      </section>

      {/* 6. Solo Doesn't Mean Alone (Safety & SEO) */}
      <SeoContentBlock />

      {/* 7. Community Testimonials */}
      <Testimonials />

      {/* 8. Final CTA Strip */}
      <AudienceSelector />
    </main>
  );
}
