"use clint";
import React from "react";
import Image from "next/image";
import computerIcon from "@/assets/icons/undraw_computer_apps_9ssq 1.svg";

export default function featuresSection() {
  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-6 rounded-lg shadow md:flex-row max-w-96 md:max-w-5xl">
          <div className="flex flex-col justify-between p-4 md:pl-28 leading-normal text-center md:text-right">
            <h5 className="mb-8 text-5xl font-bold tracking-tight text-purple-600">
              نسق فعالياتك بسهوله
            </h5>
            <p className="mb-3 font-light text-gray-500 text-2xl">
              قم بإنشاء الأحداث التعليمية وإدارتها دون عناء باستخدام أدوات
              متكاملة للجدولة والتواصل ومشاركة الموارد.
            </p>
          </div>
          <Image
            className="w-full rounded-t-lg md:h-auto md:w-[450px] md:rounded-none md:rounded-s-lg"
            src={computerIcon}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center bg-white border border-gray-200 p-4 mb-6 rounded-lg shadow md:flex-row max-w-96 md:max-w-5xl">
          <div className="flex flex-col justify-between p-4 md:pl-28 leading-normal text-center md:text-right">
            <h5 className="mb-8 text-5xl font-bold tracking-tight text-purple-600">
              نسق فعالياتك بسهوله
            </h5>
            <p className="mb-3 font-light text-gray-500 text-2xl">
              قم بإنشاء الأحداث التعليمية وإدارتها دون عناء باستخدام أدوات
              متكاملة للجدولة والتواصل ومشاركة الموارد.
            </p>
          </div>
          <Image
            className="w-full rounded-t-lg md:h-auto md:w-[450px] md:rounded-none md:rounded-s-lg"
            src={computerIcon}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center bg-white border border-gray-200 p-4 rounded-lg shadow md:flex-row max-w-96 md:max-w-5xl">
          <div className="flex flex-col justify-between p-4 md:pl-28 leading-normal text-center md:text-right">
            <h5 className="mb-8 text-5xl font-bold tracking-tight text-purple-600">
              نسق فعالياتك بسهوله
            </h5>
            <p className="mb-3 font-light text-gray-500 text-2xl">
              قم بإنشاء الأحداث التعليمية وإدارتها دون عناء باستخدام أدوات
              متكاملة للجدولة والتواصل ومشاركة الموارد.
            </p>
          </div>
          <Image
            className="w-full rounded-t-lg md:h-auto md:w-[450px] md:rounded-none md:rounded-s-lg"
            src={computerIcon}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
