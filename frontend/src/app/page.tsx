import Image from "next/image";
import Header from "@/components/landing-page/header";
import LargeCard from "@/components/common/largeCard";
import courseImage from "@/assets/icons/Rectangle 45.svg"; // For testing

export default function Home() {
  return (
    <div>
      <Header />
      <LargeCard
        image={courseImage}
        title={"اسم الفعاليه"}
        description={
          "تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
        }
        time={"3 ساعات"}
        date={"24/10/10"}
        location={"جامعة الملك سعود، كلية الحاسب"}
        cost={"200 ريال"}
        badges={["حاسب", "حاسب"]}
      />
    </div>
  );
}
