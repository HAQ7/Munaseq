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
import { signupAction } from "@/proxy/signup-action";

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [scope, animate] = useAnimate();
    const [isLoading, setIsLoading] = useState(false);
    const tags: MutableRefObject<string[]> = useRef([]);
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

    const nextStepHandler = (e: MouseEvent) => {
        e.preventDefault();
        if (step === 4) {
            return;
        }
        setStep(prevStep => prevStep + 1);
    };
    const prevStepHandler = (e: MouseEvent) => {
        e.preventDefault();
        if (step === 1) {
            return;
        }
        setStep(prevStep => prevStep - 1);
    };

    let formData: MutableRefObject<FormData> = useRef(new FormData());

    const fileToBase64: (file: File) => Promise<string> = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
        });
    };

    const formFinalization = async (selectedTags: string[]) => {
        // Save the selected tags in a ref
        tags.current = selectedTags;
        formData.current = new FormData(ref.current);
        for (const tag of tags.current) {
            formData.current.append("tags", tag);
        }

        // Convert the image to base64
        const image = formData.current.get("profileImage") as File;
        const base64Image: string = await fileToBase64(image);
        formData.current.set("profileImage", base64Image);

        // translates gender to english
        const formGender = formData.current.get("gender");
        switch (formGender) {
            case "ذكر":
                formData.current.set("gender", "MALE");
                break;
            case "انثى":
                formData.current.set("gender", "FEMALE");
                break;
        }
    };

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const token = await signupAction(formData.current);
        // Save the token in the cookies give 3 days expiry
        document.cookie = "token=;max-age=0;path=/";
        document.cookie = `token=${token};max-age=259200;path=/`;
        router.push("/discover");
    };

    return (
        <div ref={scope}>
            <motion.div
                initial={{ x: "-50%", opacity: 0 }}
                animate={animation}
                transition={transition}
                id="card"
                className="bg-white w-[min(900px,90vw)] min-h-[600px] shadow-strong rounded-[50px] 2xl:p-14 p-4 py-8 overflow-hidden grid"
            >
                <div
                    ref={scope}
                    className="grid md:grid-cols-2 md:gap-0 gap-3 h-full place-items-center relative"
                >
                    <div className="h-full w-full flex flex-col md:gap-5 ">
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

                    <div className="w-full sm:px-10 flex flex-col items-center exit-right overflow-hidden pt-5">
                        <form
                            ref={ref}
                            onSubmit={formSubmitHandler}
                            className="max-w-96 w-full relative 2xl:h-[550px] md:h-[530px] h-[550px] grid place-items-center"
                        >
                            <MainForm
                                step={step}
                                nextStepHandler={nextStepHandler}
                            />
                            <ProfileForm
                                step={step}
                                nextStepHandler={nextStepHandler}
                                prevStepHandler={prevStepHandler}
                            />
                            <TagForm
                                step={step}
                                nextStepHandler={nextStepHandler}
                                prevStepHandler={prevStepHandler}
                                submitTags={formFinalization}
                            />

                            <FinalForm
                                step={step}
                                prevStepHandler={prevStepHandler}
                                formData={formData.current}
                                isLoading={isLoading}
                            />
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
