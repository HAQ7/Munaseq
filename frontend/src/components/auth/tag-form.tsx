import Tag from "@/components/common/tag";
import Button from "@/components/common/button";
import { motion, Variants } from "framer-motion";
import { tags } from "@/util/tags";
import { MutableRefObject, useRef, useState } from "react";

export default function TagForm(props: {
    step: number;
    nextStepHandler: (e: MouseEvent) => void;
    prevStepHandler: (e: MouseEvent) => void;
    submitTags: (tags: string[]) => void;
}) {
    const [formError, setFormError] = useState(false);
    const addedTags: MutableRefObject<string[]> = useRef([]);

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

    const validateInputs: () => boolean = () => {
        if (addedTags.current.length === 0) {
            setFormError(true);
            return false;
        }
        setFormError(false);
        return true;
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

            <motion.div className="flex flex-wrap gap-2 mt-10 sm:text-[0.75rem] text-xs ">
                {tags.map((tag, index) => [
                    <Tag
                        active
                        onClick={() => {
                            if (addedTags.current.includes(tag)) {
                                addedTags.current = addedTags.current.filter(
                                    t => t !== tag
                                );
                                return;
                            }
                            addedTags.current.push(tag);
                        }}
                        key={index}
                    >
                        {tag}
                    </Tag>,
                ])}
            </motion.div>

            <motion.div layout className="mt-5">
                {formError && (
                    <motion.div
                        layout
                        animate={{ y: 0, opacity: 1 }}
                        initial={{ y: 12, opacity: 0 }}
                        transition={{ delay: 0.225 }}
                        className="text-red-500 text-center mt-5"
                    >
                        يجب اختيار واحد على الاقل
                    </motion.div>
                )}
                <motion.div layout className="flex justify-between">
                    <Button
                        disabled={props.step !== 3}
                        onClick={props.prevStepHandler}
                        className="mt-10 bg-transparent !text-custom-gray"
                    >
                        السابق
                    </Button>
                    <Button
                        disabled={props.step !== 3}
                        onClick={async e => {
                            e.preventDefault();
                            if (validateInputs()) {
                                props.submitTags(addedTags.current);
                                props.nextStepHandler(e);
                            }
                        }}
                        className="mt-10 shadow-xl px-9 "
                    >
                        التالي
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
