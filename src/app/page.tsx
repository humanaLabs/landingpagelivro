import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { AuthorSection } from "@/components/marketing/author-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FloatingChat } from "@/components/chat/floating-chat";
import { BrowserCompatibilityMonitor } from "@/components/BrowserCompatibilityMonitor";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <AuthorSection />
      <FaqSection />
      <FloatingChat />
      
    </div>
  );
}
