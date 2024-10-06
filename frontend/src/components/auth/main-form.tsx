import TextField from "@/components/common/text-field";
import Button from "@/components/common/button";
import { motion, Variants } from "framer-motion";
import { useRef, useState } from "react";
import LogoLoading from "../common/logo-loading";
import isEmailUniqueAction from "@/proxy/is-email-unique-action";
import isUsernameUniqueAction from "@/proxy/is-username-unique-action";

export default function mainForm(props: {
    step: number;
    nextStepHandler: (e: MouseEvent) => void;
}) {
    const emailRef = useRef({} as HTMLInputElement);
    const usernameRef = useRef({} as HTMLInputElement);
    const passwordRef = useRef({} as HTMLInputElement);
    const confirmPasswordRef = useRef({} as HTMLInputElement);
    const [formError, setFormError] = useState([] as string[]);
    const [isLoading, setIsLoading] = useState(false);

    console.log(formError)

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
    const isEmailCorrect: () => boolean = () => {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(emailRef.current.value)) {
            if (!formError.includes("EMAIL_INVALID")) {
                setFormError(prev => [...prev, "EMAIL_INVALID"]);
            }
            return false;
        }
        setFormError(prev => prev.filter(e => e !== "EMAIL_INVALID"));
        return true;
    };
    const isEmailNotEmpty: () => boolean = () => {
        if (emailRef.current.value.length < 3) {
            if (!formError.includes("EMAIL_EMPTY")) {
                setFormError(prev => [...prev, "EMAIL_EMPTY"]);
            }
            return false;
        }
        setFormError(prev => prev.filter(e => e !== "EMAIL_EMPTY"));
        return true;
    };

    const isEmailUnique = async () => {
        setIsLoading(true);
        const data = await isEmailUniqueAction(emailRef.current.value);
        console.log(data);
        if (!data.passed) {
            if (!formError.includes(data.error)) {
                setFormError(prev => [...prev, data.error]);
            }
            setIsLoading(false);
            return false;
        }
        setFormError(prev => prev.filter(e => e !== 'EMAIL_NOT_UNIQUE' && e !== 'ERROR'));
        setIsLoading(false);
        return true;
    };
    const isUsernameUnique = async () => {
        const data = await isUsernameUniqueAction(usernameRef.current.value);
        if (!data.passed) {
            if (!formError.includes(data.error)) {
                setFormError(prev => [...prev, data.error]);
            }
            setIsLoading(false);
            return false;
        }
        setFormError(prev => prev.filter(e => e !== 'USERNAME_NOT_UNIQUE' && e !== 'ERROR'));
        setIsLoading(false);
        return true;
    };

    const isUsernameNotEmpty: () => boolean = () => {
        if (usernameRef.current.value.length < 3) {
            if (!formError.includes("USERNAME_EMPTY")) {
                setFormError(prev => [...prev, "USERNAME_EMPTY"]);
            }
            return false;
        }
        setFormError(prev => prev.filter(e => e !== "USERNAME_EMPTY"));
        return true;
    };

    const isPasswordNotEmpty: () => boolean = () => {
        if (passwordRef.current.value.length < 3) {
            if (!formError.includes("PASSWORD_EMPTY")) {
                setFormError(prev => [...prev, "PASSWORD_EMPTY"]);
            }
            return false;
        }
        setFormError(prev => prev.filter(e => e !== "PASSWORD_EMPTY"));
        return true;
    };

    const doesPassswordMatch: () => boolean = () => {
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            if (!formError.includes("PASSWORD")) {
                setFormError(prev => [...prev, "PASSWORD_MISMATCH"]);
            }
            return false;
        }
        setFormError(prev => prev.filter(e => e !== "PASSWORD_MISMATCH"));
        return true;
    };

    const validateInputs = async () => {
        if (
            isEmailNotEmpty() &&
            isUsernameNotEmpty() &&
            isPasswordNotEmpty() &&
            doesPassswordMatch() &&
            isEmailCorrect() &&
            (await isEmailUnique()) &&
            (await isUsernameUnique())
        ) {
            setFormError([]);
            return true;
        }
        return false;
    };

    const getError: () => string = () => {
        if (formError.includes("EMAIL_INVALID")) {
            return "الايميل غير صحيح";
        }
        if (formError.includes("EMAIL_NOT_UNIQUE")) {
            return "الايميل موجود بالفعل";
        }
        if (formError.includes("USERNAME_NOT_UNIQUE")) {
            return "اسم المستخدم موجود بالفعل";
        }
        if (formError.includes("EMAIL_EMPTY")) {
            return "الايميل لا يمكن ان يكون اقل من 3 احرف";
        }
        if (formError.includes("USERNAME_EMPTY")) {
            return "اسم المستخدم لا يمكن ان يكون اقل من 3 احرف";
        }
        if (formError.includes("PASSWORD_EMPTY")) {
            return "كلمة المرور لا يمكن ان تكون اقل من 3 احرف";
        }
        if (formError.includes("PASSWORD_MISMATCH")) {
            return "كلمة المرور غير متطابقة";
        }
        if (formError.includes("ERROR")) {
            return "حدث خطأ, الرجاء المحاولة في وقت لاحق";
        }
        return "";
    };
    return (
        <motion.div
            layout
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            animate={props.step === 1 ? "active" : "past"}
            variants={variants}
            className="absolute w-full"
        >
            <motion.h1 layout className="font-bold text-3xl text-center">
                {" "}
                متحمسين لدخولك 🔥
            </motion.h1>
            <motion.div layout>
                <TextField
                    placeholder="الايميل الالكتروني*"
                    name="email"
                    className="w-full"
                    ref={emailRef}
                    onBlur={() => {
                        isEmailCorrect();
                        isEmailNotEmpty();
                        // await isEmailUnique();
                    }}
                    error={
                        formError.includes("EMAIL_INVALID") ||
                        formError.includes("EMAIL_EMPTY") ||
                        formError.includes("EMAIL_NOT_UNIQUE")
                    }
                />
                <TextField
                    placeholder="اسم المستخدم*"
                    name="username"
                    className="w-full"
                    ref={usernameRef}
                    onBlur={() => {
                        isUsernameNotEmpty();
                        // await isUsernameUnique();
                    }}
                    error={
                        formError.includes("USERNAME_EMPTY") ||
                        formError.includes("USERNAME_NOT_UNIQUE")
                    }
                />
                <TextField
                    placeholder="كلمة المرور*"
                    name="password"
                    type="password"
                    ref={passwordRef}
                    onBlur={isPasswordNotEmpty}
                    error={
                        formError.includes("PASSWORD_MISMATCH") ||
                        formError.includes("PASSWORD_EMPTY")
                    }
                />
                <TextField
                    placeholder="تأكيد كلمة المرور*"
                    name="confirmPassword"
                    type="password"
                    ref={confirmPasswordRef}
                    onBlur={doesPassswordMatch}
                    error={formError.includes("PASSWORD_MISMATCH")}
                />
            </motion.div>
            <motion.div layout className="mt-5">
                {formError.length > 0 && (
                    <motion.div
                        layout
                        animate={{ y: 0, opacity: 1 }}
                        initial={{ y: 12, opacity: 0 }}
                        transition={{ delay: 0.225 }}
                        className="text-red-500 text-center mt-5"
                    >
                        {getError()}
                    </motion.div>
                )}
                <motion.div
                    layout
                    className="mt-5 h-10 grid place-items-center"
                >
                    {!isLoading ? (
                        <Button
                            disabled={props.step > 1}
                            onClick={async e => {
                                e.preventDefault();
                                if (await validateInputs()) {
                                    props.nextStepHandler(e);
                                }
                            }}
                            className="shadow-xl min-w-full"
                        >
                            انتقل الى الحساب التعريفي
                        </Button>
                    ) : (
                        <LogoLoading
                            className={"w-14 aspect-square absolute"}
                        />
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
