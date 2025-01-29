// import Header from "@/components/landing-page/header";
// import HeroSection from "@/components/landing-page/heroSection";
// import FeaturesSection from "@/components/landing-page/featuresSection";
// import FooterSection from "@/components/landing-page/footerSection";
// import EventSection from "@/components/landing-page/eventSection";

import Hero from "@/components/new-landing-page/hero/hero";
import Header from "@/components/new-landing-page/header/header";
import Features from "@/components/new-landing-page/features/features";
import Steps from "@/components/new-landing-page/steps/steps";
import Footer from "@/components/new-landing-page/footer/footer";

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* <Header />
      <HeroSection />
      <FeaturesSection />
      <EventSection />
      <FooterSection /> */}
            <Header />
            <Hero />
            <Features />
            <Steps />
            <Footer />
        </div>
    );
}
