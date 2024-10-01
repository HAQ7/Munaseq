"use client";
import React from "react";
import Image from "next/image";
import computerIcon from "@/assets/land-assets/computer-icon.svg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FeaturesSection() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const isInView1 = useInView(ref1, { once: true, amount: 0.8 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.6 });
  const isInView3 = useInView(ref3, { once: true, amount: 0.6 });

  return (
    <div
      id="features"
      className="container mx-auto px-4 pt-44 pb-10 overflow-hidden"
    >
      <div>
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-16 rounded-3xl shadow-xl md:flex-row md:justify-between max-w-full"
        >
          <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-right md:w-1/2">
            <h5 className="mb-6 pb-2 text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              جدولة وترتيب الفعالية بسهولة
            </h5>
            <p className="mb-3 font-light text-custom-gray text-lg sm:text-xl">
              المحاضر يقدر يحدد مواعيد الفعاليات وينظم المحتوى بكل سهولة، مما
              يساعده في تقديم تجربة تعليمية مرتبة وفعّالة للطلاب
            </p>
          </div>
          <Image
            className="w-full md:h-auto md:w-[350px] lg:w-[450px]"
            src={computerIcon}
            alt=""
          />
        </motion.div>

        <motion.div
          ref={ref2}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-16 rounded-3xl shadow-xl md:flex-row-reverse md:justify-between max-w-full"
        >
          <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-right md:w-1/2">
            <h5 className="mb-6 pb-2 text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              اختبارات قصيرة أثناء الفعالية
            </h5>
            <p className="mb-3 font-light text-custom-gray text-lg sm:text-xl">
              المحاضر يقدر يضيف اختبارات قصيرة خلال الفعالية، والطلاب يحلونها
              بشكل مباشر، مما يعزز فهمهم ويخليهم يتفاعلون أكثر.
            </p>
          </div>
          <Image
            className="w-full md:h-auto md:w-[350px] lg:w-[450px]"
            src={computerIcon}
            alt=""
          />
        </motion.div>

        <motion.div
          ref={ref3}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView3 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center bg-white border border-gray-200 p-4 rounded-3xl shadow-xl md:flex-row md:justify-between max-w-full"
        >
          <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-right md:w-1/2">
            <h5 className="mb-6 pb-2 text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              شهاده بعد اتمام الفعالية
            </h5>
            <p className="mb-3 font-light text-custom-gray text-lg sm:text-xl">
              بعد ما تكمل الفعالية، تاخذ شهادة معتمدة تعزز سيرتك الذاتية وتفتح
              لك أبواب فرص جديدة.
            </p>
          </div>
          <Image
            className="w-full md:h-auto md:w-[350px] lg:w-[450px]"
            src={computerIcon}
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
}
