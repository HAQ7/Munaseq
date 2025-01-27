import Image from 'next/image';
import heroBg from '@/assets/new-landing-assets/hero-bg.svg';
import heroLeftDeco from '@/assets/new-landing-assets/hero-left-deco.png';
import HeroLottie from './hero-lottie';

export default function Hero() {
  return (
    <section className="flex justify-end sm:flex-row flex-col-reverse">
      <div className="grid place-items-center flex-1">test</div>
      <div className="grid place-items-center relative">
        <Image
          className="sm:w-[45vw] sm:min-w-96 w-full"
          src={heroBg}
          alt="background image"
          priority
        />
        <div className="absolute w-full grid place-items-center">
          <HeroLottie/>
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
