"use clint";
import React from "react";
import Button from "../common/button";
import Image from "next/image";
import userIcon from "@/assets/icons/ph_user.svg";
import eventIcon from "@/assets/icons/medical-icon_i-health-education.svg";
import effect from "@/assets/icons/landing-page-effect.svg";
import userImage from "@/assets/icons/user-testimonial-1.svg";
// import { Calendar } from "@/components/common/shadcn-ui/calendar"

export default function heroSection() {
  return (
    <div className="h-[90vh] relative">
      <div className="flex justify-center items-center h-[80vh] px-8">
        <div className="text-center max-w-xl">
          <h1 className="text-gray-900 text-5xl font-bold mb-4 leading-snug">
            ننسق <span className="text-purple-700">فعالياتك التعليمية </span>من
            الاف الى الياء
          </h1>
          <p className="text-gray-500 text-lg font-light mb-4">
            منسق هي منصة متكاملة لإدارة الفعاليات التعليمية الحضورية و
            الالكترونية مثل الدورات و ورش العمل و المحاضرات
          </p>
          <div className="flex justify-center">
            <Button gradient>انضم الينا</Button>
          </div>
        </div>
      </div>
      <div className="absolute top-[10%] left-[10%] hidden md:block">
        <div className="w-48 h-48 bg-white border border-gray-200 rounded-3xl shadow-xl text-center flex flex-col items-center justify-center">
          <h5 className=" text-5xl font-semibold tracking-tight text-gray-900">
            2167+
          </h5>
          <p className="font-light text-xl text-gray-500">مستفيد</p>
          <Image src={userIcon} alt={""} />
        </div>
      </div>
      <div className="absolute top-[15%] right-[10%] hidden md:block">
        <div className="w-48 h-48 bg-white border border-gray-200 rounded-3xl shadow-xl text-center flex flex-col items-center justify-center">
          <h5 className=" text-5xl font-semibold tracking-tight text-gray-900">
            361+
          </h5>
          <p className="font-light text-xl text-gray-500">فعاليه</p>
          <Image src={eventIcon} alt={""} />
        </div>
      </div>
      <div className="absolute top-[60%] left-[12%] hidden md:block">
        <div className="w-80 max-w-md p-4 bg-white border border-gray-200 rounded-3xl shadow-xl sm:p-4">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              <li className="py-3 sm:py-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={userImage}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      حسام القنام
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      خدمة جميله جداً وتصميم الموقع أجمل
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-2">
                <div className="flex items-center ">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={userImage}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      هشام السحباني
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      خدمة جميله جداً وتصميم الموقع أجمل
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute -top-[10%] left-0 -z-10">
        <Image src={effect} alt="" />
      </div>
    </div>
  );
}
