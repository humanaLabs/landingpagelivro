import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { AuthorSection } from "@/components/marketing/author-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { BrowserCompatibilityMonitor } from "@/components/BrowserCompatibilityMonitor";
import { LeadForm } from "@/components/marketing/lead-form.section";
// ajuste o caminho conforme seu projeto


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <AuthorSection />
      <FaqSection />
      <LeadForm />
       </div>
  );
}
