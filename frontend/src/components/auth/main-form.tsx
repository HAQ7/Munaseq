import TextField from "@/components/common/text-field";
import Button from "@/components/common/button";
import { motion, Variants } from "framer-motion";

export default function mainForm(props: {
    step: number;
    nextStepHandler: (e: MouseEvent) => void;
}) {
    const variants: Variants = {
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
            animate={props.step === 1 ? "active" : "past"}
            variants={variants}
        >
            <h1 className="font-bold text-3xl text-center">
                {" "}
                متحمسين لدخولك ! 🔥
            </h1>
            <TextField
                placeholder="الايميل الالكتروني"
                name="email"
                className="w-full"
            />
            <TextField
                placeholder="اسم المستخدم"
                name="username"
                className="w-full"
            />
            <TextField
                placeholder="كلمة المرور"
                name="password"
                type="password"
            />
            <TextField
                placeholder="تأكيد كلمة المرور"
                name="confirmPassword"
                type="password"
            />
            <Button
                disabled={props.step > 1}
                onClick={props.nextStepHandler}
                className="mt-10 shadow-xl w-full"
            >
                انتقل الى الحساب التعريفي
            </Button>
        </motion.div>
    );
}
