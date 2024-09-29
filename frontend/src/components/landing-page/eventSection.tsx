import React from "react";
import LargeCard from "@/components/common/large-card";
import courseImage from "@/assets/icons/event-image.svg"; // For testing
import Button from "../common/button";

export default function eventSection() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-gray-900 text-5xl font-bold mb-24 text-center">
        فعاليات{" "}
        <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
          منسقين
        </span>{" "}
        المنصة
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
          time="3 ساعات"
          date="24/10/10"
          location="جامعة الملك سعود، كلية الحاسب"
          cost="200 ريال"
          badges={[]}
        />
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
          time="3 ساعات"
          date="24/10/10"
          location="جامعة الملك سعود، كلية الحاسب"
          cost="200 ريال"
          badges={[]}
        />
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
          time="3 ساعات"
          date="24/10/10"
          location="جامعة الملك سعود، كلية الحاسب"
          cost="200 ريال"
          badges={[]}
        />
        <LargeCard
          image={courseImage}
          title="اسم الفعالية"
          description="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
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
