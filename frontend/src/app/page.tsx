import Header from "@/components/landing-page/header";
import HeroSection from "@/components/landing-page/heroSection";
import FeaturesSection from "@/components/landing-page/featuresSection";
import FooterSection from "@/components/landing-page/footerSection";
import EventSection from "@/components/landing-page/eventSection";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <EventSection />
      <FooterSection />
    </div>
  );
}
