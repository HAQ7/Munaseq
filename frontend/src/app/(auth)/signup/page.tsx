"use client";
import Image from "next/image";
import logoIcon from "@/assets/logo/logo-small-white.svg";
import munaseq from "@/assets/logo/munaseq-text.svg";
import Progress from "@/components/auth/progress";
import TextField from "@/components/common/text-field";
import Button from "@/components/common/button";
import { motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
    const [scope, animate] = useAnimate();
    const router = useRouter();
    const animation = {
        x: 0,
        opacity: 1,
    };
    const transition = {
        type: "spring",
        duration: 0.5,
        bounce: 0,
    };

    // This function will be called when the user clicks on the sign in button and handles the transition to the sign in page
    const transitionToSignUpHandler = async () => {
        animate(
            "#card",
            {
                x: "-50%",
                opacity: 0,
            },
            { type: "spring", duration: 0.5, bounce: 0 }
        );

        await new Promise(resolve => setTimeout(resolve, 500));

        router.push("/signin");
    };

    return (
        <div ref={scope}>
            <motion.div initial={{x: '50%', opacity: 0}} animate={animation} transition={transition}  id="card" className="bg-white w-[min(900px,90vw)] min-h-[600px] shadow-strong rounded-[50px] md:p-14 p-8 overflow-hidden grid">
                <div
                    ref={scope}
                    className="grid md:grid-cols-2 md:gap-0 gap-3 h-full place-items-center relative"
                >
                    <div className="h-full w-full flex flex-col gap-5">
                        <Progress />
                        <Link className="w-full h-full" href={"/"}>
                            <div
                                className="w-full h-full rounded-[50px] bg-gradient-to-br from-primary to-secondary overflow-hidden items-center md:flex flex-col justify-center gap-14 hidden "
                            >
                                <Image
                                    src={logoIcon}
                                    className="w-32"
                                    alt="logo"
                                />
                                <Image
                                    src={munaseq}
                                    className="w-48"
                                    alt="munaseq"
                                />
                            </div>
                        </Link>
                    </div>

                    <div
                        className="w-full md:p-10 flex flex-col items-center exit-right"
                    >
                        <h1 className="font-bold text-3xl text-center">
                            {" "}
                            متحمسين لدخولك ! 🔥
                        </h1>
                        <form action="" className="max-w-96 w-full">
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
                            <Button className="mt-10 shadow-xl w-full">
                                تسجيل الدخول
                            </Button>
                        </form>
                        <p className="mt-4 text-[#949494]">
                            لديك حساب؟{" "}
                            <span
                                onClick={transitionToSignUpHandler}
                                className="text-primary text-nowrap cursor-pointer"
                            >
                                سجل دخولك الآن!
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
