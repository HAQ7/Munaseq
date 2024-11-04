"use client";

// import CreateEventProgress from "@/components/authenticated-content/create-event/create-event-progress";
import Image from "next/image";
import plusCricle from "@/assets/icons/plus-circle-gradient.svg";
import Title from "@/components/common/title";
import { Metadata } from "next";
import MainForm from "@/components/authenticated-content/create-event/main-form";
import { useRef, useState } from "react";
import ParticipantsForm from "@/components/authenticated-content/create-event/participants-form";
import TimeForm from "@/components/authenticated-content/create-event/time-form";
import createEventAction from "@/proxy/create-event-action";

// export const metadata: Metadata = {
//     title: "انشاء فعالية",
// };

export default function CreateEvent() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState({ message: "" });
    const nextStepHandler = () => {
        setStep(prevStep => prevStep + 1);
    };
    const prevStepHandler = () => {
        setStep(prevStep => prevStep - 1);
    };
    const selectedCategories = useRef([] as string[]);
    const categoriesHandler = (categories: string[]) => {
        selectedCategories.current = categories;
    }
    return (
        <div className="">
            <Title>
                <Image src={plusCricle} alt="plus icon" />
                نسق فعاليتك
            </Title>
            <div className="grid place-items-center">
                {/* <CreateEventProgress step={1} /> */}
                <form
                    action={async (formData) => {
                        for (const category of selectedCategories.current) {
                            formData.append("categories", category);
                        }
                        const error : { message: string } = await createEventAction(formData);
                        if (error.message) {
                            setError(error);
                        }
                    }}
                    className="overflow-x-hidden p-10 grid place-items-center"
                >
                    <div className="absolute overflow-hidden p-10">
                        <div className="absolute">
                            <TimeForm
                                prevStepHandler={prevStepHandler}
                                onCategoriesChange={categoriesHandler}
                                error={error}
                                step={step}
                            />
                        </div>
                        <ParticipantsForm
                            nextStepHandler={nextStepHandler}
                            prevStepHandler={prevStepHandler}
                            step={step}
                        />
                    </div>
                    <MainForm nextStepHandler={nextStepHandler} step={step} />
                </form>
            </div>
        </div>
    );
}