import Header from "@/components/landing-page/header";
import HeroSection from "@/components/landing-page/heroSection";
import FeaturesSection from "@/components/landing-page/featuresSection";
import FooterSection from "@/components/landing-page/footerSection";
import Hero from "@/components/new-landing-page/hero/hero";
import EventSection from "@/components/landing-page/eventSection";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <EventSection />
      <FooterSection />
      {/* <Hero/> */}
    </div>
  );
}
