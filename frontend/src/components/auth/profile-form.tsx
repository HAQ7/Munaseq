import TextField from "@/components/common/text-field";
import Button from "@/components/common/button";
import { motion, Variants } from "framer-motion";
import Radio from "../common/radio-group";

export default function ProfileForm(props: {
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
            animate={
                props.step === 2 ? "active" : props.step > 2 ? "past" : "next"
            }
            variants={variants}
            className="absolute top-0 w-full"
        >
            <h1 className="font-bold text-3xl text-center">
                {" "}
                بيشوفونها الناس 😎
            </h1>
            <div className="grid grid-cols-2 gap-5">
                <TextField placeholder="الاسم الاول" name="firstName" />
                <TextField placeholder="الاسم الاخير" name="lastName" />
            </div>
            <TextField placeholder="الاسم المعروض" name="displayName" />
            <div className="grid gap-5 mt-5">
                <label className="block text-lg font-bold">الجنس</label>
                <Radio options={["ذكر", "انثى"]} />
            </div>

            <div className="flex justify-between">
                <Button
                    disabled={props.step !== 2}
                    onClick={props.prevStepHandler}
                    className="mt-10 bg-transparent !text-custom-gray"
                >
                    السابق
                </Button>
                <Button
                    disabled={props.step !== 2}
                    onClick={props.nextStepHandler}
                    className="mt-10 shadow-xl"
                >
                    انتقل الى الاهتمامات
                </Button>
            </div>
        </motion.div>
    );
}
