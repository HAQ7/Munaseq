"use clint";
import React from "react";
import Button from "../common/button";
import Image from "next/image";
import userIcon from "@/assets/icons/ph_user.svg";
import eventIcon from "@/assets/icons/medical-icon_i-health-education.svg";
// import { Calendar } from "@/components/common/shadcn-ui/calendar"

export default function heroSection() {
  return (
    <div className="h-[90vh] relative">
      <div className="flex justify-center items-center h-[90vh]">
        <div className="text-center max-w-3xl">
          <h1 className="text-gray-900 text-6xl font-bold mb-4">
            ننسق <span className="text-purple-700">فعالياتك التعليمية</span>من
            الاف الى الياء
          </h1>
          <p className="text-gray-500 text-xl font-light mb-4">
            منسق هي منصة متكاملة لإدارة الفعاليات التعليمية الحضورية و
            الالكترونية مثل الدورات و ورش العمل و المحاضرات
          </p>
          <div className="flex justify-center">
            <Button>انضم الينا</Button>
          </div>
        </div>
      </div>
      <div className="absolute top-[10%] left-[10%]">
        <div className="w-48 h-48 bg-white border border-gray-200 rounded-2xl shadow text-center flex flex-col items-center justify-center">
          <h5 className=" text-5xl font-semibold tracking-tight text-gray-900">
            2167+
          </h5>
          <p className="font-light text-xl text-gray-500">مستفيد</p>
          <Image src={userIcon} alt={""} />
        </div>
      </div>
      <div className="absolute top-[15%] right-[10%]">
        <div className="w-48 h-48 bg-white border border-gray-200 rounded-2xl shadow text-center flex flex-col items-center justify-center">
          <h5 className=" text-5xl font-semibold tracking-tight text-gray-900">
            361+
          </h5>
          <p className="font-light text-xl text-gray-500">فعاليه</p>
          <Image src={eventIcon} alt={""} />
        </div>
      </div>
    </div>
  );
}
