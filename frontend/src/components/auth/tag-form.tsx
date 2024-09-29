import Tag from "@/components/common/tag";
import Button from "@/components/common/button";
import { motion, Variants } from "framer-motion";
import { tags } from "@/util/tags";


export default function TagForm(props: {
    step: number;
    nextStepHandler: (e: MouseEvent) => void;
    prevStepHandler: (e: MouseEvent) => void;
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
                props.step === 3 ? "active" : props.step > 3 ? "past" : "next"
            }
            variants={variants}
            className="absolute top-0 w-full"
        >
            <h1 className="font-bold text-3xl text-center">
                {" "}
                اختر اللي تحب 🎒
            </h1>

            <motion.div className="flex flex-wrap gap-2 mt-10 sm:text-[0.75rem] text-xs">
                {tags.map((tag,index) => [
                    <Tag key={index}>{tag}</Tag>,
                ])}
            </motion.div>

            <div className="flex justify-between">
                <Button
                    disabled={props.step !== 3}
                    onClick={props.prevStepHandler}
                    className="mt-10 bg-transparent !text-custom-gray"
                >
                    السابق
                </Button>
                <Button
                    disabled={props.step !== 3}
                    onClick={props.nextStepHandler}
                    className="mt-10 shadow-xl px-10"
                >
                    التالي
                </Button>
            </div>
        </motion.div>
    );
}
