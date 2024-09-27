"use clint";
import React from "react";
import Button from "../common/button";
// import { Calendar } from "@/components/common/shadcn-ui/calendar"

export default function heroSection() {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="bg-red-800 text-center max-w-3xl">
        <h1 className="text-gray-900 text-6xl font-bold mb-4">
          ننسق <span className="text-purple-700">فعالياتك التعليمية</span>من
          الاف الى الياء
        </h1>
        <p className="text-gray-500 text-xl font-light mb-4">
          منسق هي منصة متكاملة لإدارة الفعاليات التعليمية الحضورية و الالكترونية
          مثل الدورات و ورش العمل و المحاضرات
        </p>
        <div className="flex justify-center">
          <Button>انضم الينا</Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
