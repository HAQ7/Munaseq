import TextField from "@/components/common/text-field";
import Button from "@/components/common/button";
import { motion, Variants } from "framer-motion";
import Radio from "../common/radio-group";
import { Input } from "../common/shadcn-ui/input";
import Image from "next/image";
import { useRef, useState } from "react";
import { set } from "date-fns";

export default function ProfileForm(props: {
    step: number;
    nextStepHandler: (e: MouseEvent) => void;
    prevStepHandler: (e: MouseEvent) => void;
}) {
    const [image, setImage] = useState("");
    const [formError, setFormError] = useState([] as string[]);
    const firstNameRef = useRef({} as HTMLInputElement);
    const lastNameRef = useRef({} as HTMLInputElement);
    const ref = useRef({} as HTMLInputElement);

    const handleImageUpload = (e: any) => {
        if (e.target.files.length === 0) {
            return;
        }
        setImage(URL.createObjectURL(e.target.files[0]));
    };
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
    const checkFirstNameEmpty: () => boolean = () => {
        if (firstNameRef.current.value.length < 3) {
            if (!formError.includes("FIRSTNAME_EMPTY")) {
                setFormError(prev => [...prev, "FIRSTNAME_EMPTY"]);
            }
            return false;
        }

        setFormError(prev => prev.filter(e => e !== "FIRSTNAME_EMPTY"));
        return true;
    };

    const checkLastNameEmpty: () => boolean = () => {
        if (lastNameRef.current.value.length < 3) {
            if (!formError.includes("LASTNAME_EMPTY")) {
                setFormError(prev => [...prev, "LASTNAME_EMPTY"]);
            }
            return false;
        }

        setFormError(prev => prev.filter(e => e !== "LASTNAME_EMPTY"));
        return true;
    };

    const validateInputs: () => boolean = () => {
        if (!checkFirstNameEmpty() || !checkLastNameEmpty()) {
            return false;
        }
        return true;
    };

    return (
        <motion.div
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            initial={"next"}
            animate={
                props.step === 2 ? "active" : props.step > 2 ? "past" : "next"
            }
            variants={variants}
            className="top-0 w-full"
        >
            <h1 className="font-bold text-3xl text-center">
                {" "}
                بيشوفونها الناس 😎
            </h1>
            <div className="grid grid-cols-2 gap-5">
                <TextField
                    placeholder="الاسم الاول*"
                    name="firstName"
                    ref={firstNameRef}
                    onBlur={checkFirstNameEmpty}
                    error={formError.includes("FIRSTNAME_EMPTY")}
                />
                <TextField
                    placeholder="الاسم الاخير*"
                    name="lastName"
                    ref={lastNameRef}
                    onBlur={checkLastNameEmpty}
                    error={formError.includes("LASTNAME_EMPTY")}
                />
            </div>
            <TextField placeholder="الاسم المعروض" name="displayName" />
            <div className="grid gap-3 mt-5">
                <label className="block text-lg text-custom-gray">الجنس</label>
                <Radio name={"gender"} options={["ذكر", "انثى"]} />
            </div>
            <div className="grid gap-3 mt-5">
                <label
                    htmlFor="profileImage"
                    className="block text-lg text-custom-gray"
                >
                    صورة العرض
                </label>

                {image ? (
                    <div className="flex items-center gap-5">
                        <div className="w-20 aspect-square relative rounded-full overflow-hidden">
                            <Image src={image} alt="preview" fill />
                        </div>
                        <button
                            className="rounded-3xl p-2"
                            onClick={e => {
                                e.preventDefault();
                                ref.current.click();
                            }}
                        >
                            تغيير الصورة
                        </button>
                    </div>
                ) : null}
                <Input
                    name="profileImage"
                    id="profileImage"
                    type="file"
                    className={"cursor-pointer " + (image ? "hidden" : "")}
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    ref={ref}
                />
            </div>
            <motion.div layout className="mt-5">
                {formError.length > 0 && (
                    <motion.div
                        layout
                        animate={{ y: 0, opacity: 1 }}
                        initial={{ y: 12, opacity: 0 }}
                        transition={{ delay: 0.225 }}
                        className="text-red-500 text-center mt-5"
                    >
                        الاسم الاول والاخير يجب ان يكون 3 احرف على الاقل
                    </motion.div>
                )}
                <motion.div layout className="flex justify-between mt-5">
                    <Button
                        disabled={props.step !== 2}
                        onClick={props.prevStepHandler}
                        className="bg-transparent !text-custom-gray"
                    >
                        السابق
                    </Button>
                    <Button
                        disabled={props.step !== 2}
                        onClick={e => {
                            e.preventDefault();
                            if (validateInputs()) {
                                props.nextStepHandler(e);
                            }
                        }}
                        className="shadow-xl px-9 "
                    >
                        التالي
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
