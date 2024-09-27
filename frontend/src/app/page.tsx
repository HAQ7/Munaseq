import Image from "next/image";
import Header from "@/components/landing-page/header";
import LargeCard from "@/components/common/largeCard";
import HeroSection from "@/components/landing-page/heroSection";
import courseImage from "@/assets/icons/Rectangle 45.svg"; // For testing

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
    </div>
  );
}
