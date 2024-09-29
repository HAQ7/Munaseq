import Tag from "@/components/common/tag";
import Button from "@/components/common/button";
import { motion, Variants } from "framer-motion";
import { tags } from "@/util/tags";

export default function FinalForm(props: {
    step: number;
    prevStepHandler: (e: MouseEvent) => void;
    formData: FormData;
}) {
    const variants: Variants = {
        next: {
            x: "-50%",
            opacity: 0,
            visibility: "hidden",
        },
        past: {
            x: "50%",
            opacity: 0,
            visibility: "hidden",
        },
        active: {
            x: 0,
            opacity: 1,
            visibility: "visible",
        },
    };
    return (
        <motion.div
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            initial={"next"}
            animate={
                props.step === 4 ? "active" : props.step > 4 ? "past" : "next"
            }
            variants={variants}
            className="absolute top-0 w-full"
        >
            <h1 className="font-bold text-3xl text-center">
                {" "}
                تأكد من المعلومات 🔍
            </h1>
            

            <div className="flex justify-between">
                <Button
                    disabled={props.step !== 3}
                    onClick={props.prevStepHandler}
                    className="mt-10 bg-transparent !text-custom-gray"
                >
                    السابق
                </Button>
                <Button
                    className="mt-10 shadow-xl px-10"
                    gradient
                >
                    تأكيد الحساب
                </Button>
            </div>
        </motion.div>
    );
}
