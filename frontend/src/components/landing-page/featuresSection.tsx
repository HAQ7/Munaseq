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
    <div className="container mx-auto px-4 pt-44">
      <div>
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: -80 }}
          animate={isInView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-16 rounded-3xl shadow-xl md:flex-row md:justify-between max-w-full"
        >
          <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-right md:w-1/2">
            <h5 className="mb-6 pb-2 text-5xl font-bold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              نسق فعالياتك بسهوله
            </h5>
            <p className="mb-3 font-light text-gray-500 text-2xl">
              قم بإنشاء الأحداث التعليمية وإدارتها دون عناء باستخدام أدوات
              متكاملة للجدولة والتواصل ومشاركة الموارد.
            </p>
          </div>
          <Image
            className="w-full md:h-auto md:w-[450px]"
            src={computerIcon}
            alt=""
          />
        </motion.div>

        <motion.div
          ref={ref2}
          initial={{ opacity: 0, x: 250 }}
          animate={isInView2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-16 rounded-3xl shadow-xl md:flex-row-reverse md:justify-between max-w-full"
        >
          <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-right md:w-1/2">
            <h5 className="mb-6 pb-2 text-5xl font-bold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              نسق فعالياتك بسهوله
            </h5>
            <p className="mb-3 font-light text-gray-500 text-2xl">
              قم بإنشاء الأحداث التعليمية وإدارتها دون عناء باستخدام أدوات
              متكاملة للجدولة والتواصل ومشاركة الموارد.
            </p>
          </div>
          <Image
            className="w-full md:h-auto md:w-[450px]"
            src={computerIcon}
            alt=""
          />
        </motion.div>

        <motion.div
          ref={ref3}
          initial={{ opacity: 0, x: -250 }}
          animate={isInView3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center bg-white border border-gray-200 p-4 rounded-3xl shadow-xl md:flex-row md:justify-between max-w-full"
        >
          <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-right md:w-1/2">
            <h5 className="mb-6 pb-2 text-5xl font-bold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              نسق فعالياتك بسهوله
            </h5>
            <p className="mb-3 font-light text-gray-500 text-2xl">
              قم بإنشاء الأحداث التعليمية وإدارتها دون عناء باستخدام أدوات
              متكاملة للجدولة والتواصل ومشاركة الموارد.
            </p>
          </div>
          <Image
            className="w-full md:h-auto md:w-[450px]"
            src={computerIcon}
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
}
