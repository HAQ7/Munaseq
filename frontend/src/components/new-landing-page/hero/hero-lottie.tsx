'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

export default function HeroLottie() {
  return (
    <motion.div
      className="aspect-square sm:w-3/4 w-full"
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -100, opacity: 0 }}
      transition={{ bounce: 0, type: 'spring' }}
    >
      <DotLottieReact
        src="hero.lottie"
        className="w-full aspect-square"
        loop
        autoplay
      />
    </motion.div>
  );
}
