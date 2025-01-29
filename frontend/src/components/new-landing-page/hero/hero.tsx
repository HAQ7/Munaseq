import Image from "next/image";
import heroBg from "@/assets/new-landing-assets/hero/hero-bg.svg";
import heroLeftDeco from "@/assets/new-landing-assets/hero/hero-left-deco.png";
import HeroLottie from "./hero-lottie";
import HeroText from "./hero-text";
import heroRightDeco from "@/assets/new-landing-assets/hero/hero-right-deco.png";

export default function Hero() {
    return (
        <section className="flex lg:justify-end items-end lg:items-stretch lg:flex-row flex-col-reverse">
            
            <div className="flex lg:justify-between justify-center items-center flex-1  lg:w-auto w-full">
            <div className="h-full lg:block hidden ">
                <Image
                    src={heroRightDeco}
                    alt="deco"
                    className="h-full aspect-square min-w-24"
                />
            </div>
            <HeroText/>
        </div>
            <div className="grid place-items-center relative">
                <Image
                    className="md:w-[45vw] md:min-w-[600px] w-full drop-shadow-2xl"
                    src={heroBg}
                    alt="background image"
                    priority
                />
                <div className="absolute w-[90%] max-w-[900px] grid place-items-center">
                    <HeroLottie />
                    <Image
                        src={heroLeftDeco}
                        alt="deco"
                        className="absolute -z-10 w-full aspect-square"
                    />
                </div>
            </div>
        </section>
    );
}
