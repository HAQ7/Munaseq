"use client";
import Image from "next/image";
import logoIcon from "@/assets/logo/logo-small-white.svg";
import munaseq from "@/assets/logo/munaseq-text.svg";
import Progress from "@/components/auth/progress";
import { motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
import { MutableRefObject, useRef, useState } from "react";
import Link from "next/link";
import MainForm from "@/components/auth/main-form";
import ProfileForm from "@/components/auth/profile-form";
import TagForm from "@/components/auth/tag-form";
import FinalForm from "@/components/auth/final-form";





export default function SignUp() {

    
    const [step, setStep] = useState(1);
    const [scope, animate] = useAnimate();
    const tags:MutableRefObject<string[]> = useRef([]);
    const ref = useRef({} as HTMLFormElement);
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

    const nextStepHandler = (e:MouseEvent) => {
        e.preventDefault();
        if (step === 4) {
            return;
        }
        setStep(prevStep => prevStep + 1);
    }
    const prevStepHandler = (e:MouseEvent) => {
        e.preventDefault();
        if (step === 1) {
            return;
        }
        setStep(prevStep => prevStep - 1);
    }

    const submitTags = (selectedTags:string[]) => {
        tags.current = selectedTags;
        console.log(tags.current)
    }

    let formData: FormData = new FormData();

    if (step === 4) {
        formData = new FormData(ref.current);
    }

    return (
        <div ref={scope}>
            <motion.div
                initial={{ x: "-50%", opacity: 0 }}
                animate={animation}
                transition={transition}
                id="card"
                className="bg-white w-[min(900px,90vw)] min-h-[600px] shadow-strong rounded-[50px] md:p-14 p-8 overflow-hidden grid"
            >
                <div
                    ref={scope}
                    className="grid md:grid-cols-2 md:gap-0 gap-3 h-full place-items-center relative"
                >
                    <div className="h-full w-full flex flex-col gap-5 z">
                        <Progress step={step} />
                        <Link className="w-full h-full" href={"/"}>
                            <div className="w-full h-full rounded-[50px] bg-gradient-to-br from-primary to-secondary overflow-hidden items-center md:flex flex-col justify-center gap-14 hidden ">
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

                    <div className="w-full md:p-10 flex flex-col items-center exit-right overflow-hidden">
                        
                        <form ref={ref} action="" className="max-w-96 w-full relative ">
                            <MainForm step={step} nextStepHandler={nextStepHandler} />
                            <ProfileForm step={step} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
                            <TagForm step={step} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} submitTags={submitTags} />
                            <FinalForm step={step} prevStepHandler={prevStepHandler} formData={formData}/>
                        </form>
                        <p className="mt-4 text-[#949494] text-center">
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
