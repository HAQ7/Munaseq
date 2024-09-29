import React from "react";
import Image from "next/image";
import computerIcon from "@/assets/icons/computer-icon.svg";

export default function featuresSection() {
  return (
    <div className="container mx-auto px-4 pt-24">
      <div>
        <div className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-8 rounded-3xl shadow-xl md:flex-row md:justify-between max-w-full">
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
        </div>
        <div className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-8 rounded-3xl shadow-xl md:flex-row-reverse md:justify-between max-w-full">
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
        </div>
        <div className="flex flex-col items-center bg-white border border-gray-200 p-4 rounded-3xl shadow-xl md:flex-row md:justify-between max-w-full">
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
        </div>
      </div>
    </div>
  );
}
