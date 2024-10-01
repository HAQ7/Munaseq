import React from "react";
import LargeCard from "@/components/common/large-card";
import Image from "next/image";
import courseImage from "@/assets/land-assets/event-image.svg"; // For testing
import titleEffect from "@/assets/land-assets/title-effect.svg"; // For testing
import Button from "../common/button";

export default function EventSection() {
  return (
    <div id="events" className="container mx-auto px-4 py-24 relative">
      <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center">
        فعاليات{" "}
        <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
          منسقين
        </span>{" "}
        المنصة
      </h1>
      <div className="absolute top-[1%] left-1/2 -translate-x-1/2 -z-10 hidden md:block">
        <Image src={titleEffect} alt="" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية..."
          time="3 ساعات"
          date="24/10/10"
          location="جامعة الملك سعود، كلية الحاسب"
          cost="200 ريال"
          badges={[]}
        />
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية..."
          time="3 ساعات"
          date="24/10/10"
          location="جامعة الملك سعود، كلية الحاسب"
          cost="200 ريال"
          badges={[]}
        />
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية..."
          time="3 ساعات"
          date="24/10/10"
          location="جامعة الملك سعود، كلية الحاسب"
          cost="200 ريال"
          badges={[]}
        />
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية..."
          time="3 ساعات"
          date="24/10/10"
          location="جامعة الملك سعود، كلية الحاسب"
          cost="200 ريال"
          badges={[]}
        />
      </div>
      <div className="w-fit mx-auto pt-20">
        <Button gradient>المزيد..</Button>
      </div>
    </div>
  );
}
