"use client";

import Step from "./step";
import userIcon from "@/assets/new-landing-assets/steps/icons/user-icon.svg";
import infoIcon from "@/assets/new-landing-assets/steps/icons/info-icon.svg";
import optionsIcon from "@/assets/new-landing-assets/steps/icons/options-icon.svg";
import { motion, Variants } from "framer-motion";

export default function Steps() {
    const variants: Variants = {
        beforeSlide: { y: 100, opacity: 0 },
        afterSlide: { y: 0, opacity: 1 },
    };

    return (
        <section className="grid place-items-center relative ">
            <h1 className="text-5xl/snug  font-semibold my-10 text-center max-w-[27rem]">
                خطوات قليلة
                <span className="bg-custom-gradient text-transparent bg-clip-text">
                    {" "}
                    لتنسيق{" "}
                </span>
                فعاليتك الخاصة
            </h1>
            <motion.div
                initial={"beforeSlide"}
                whileInView={"afterSlide"}
                viewport={{ margin: "-100px 0px", once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
                className="flex lg:flex-row flex-col justify-center items-center gap-20 mb-10 px-2"
            >
                <motion.div variants={variants}>
                    <Step
                        title="كون ملفك الشخصي"
                        icon={userIcon}
                        number={"١"}
                        desc="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
                    />
                </motion.div>
                <motion.div variants={variants}>
                    <Step
                        title="ادخل معلومات الفعالية"
                        icon={infoIcon}
                        number={"٢"}
                        desc="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
                    />
                </motion.div>
                <motion.div variants={variants}>
                    <Step
                        title="نظم فعاليتك"
                        icon={optionsIcon}
                        number={"٣"}
                        desc="تقدم هذه الدورة مقدمة شاملة في مهارات الحاسب الآلي الأساسية، وتهدف إلى تمكين المشاركين من استخدام الكمبيوتر بكفاءة في حياتهم اليومية والعملية. تتضمن الدورة التعرف على مكونات الحاسب، أنظمة التشغيل، وتطبيقات المكتب الأساسية."
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
