import Image from "next/image";
import Header from "@/components/landing-page/header";
import LargeCard from "@/components/common/largeCard";
import HeroSection from "@/components/landing-page/heroSection";
import FeaturesSection from "@/components/landing-page/featuresSection";
import FooterSection from "@/components/landing-page/footerSection";
import EventSection from "@/components/landing-page/eventSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <EventSection />
      <FooterSection />
    </div>
  );
}
