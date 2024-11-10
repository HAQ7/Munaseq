"use client";

import Image from "next/image";
import puzzleIcon from "@/assets/icons/time-gradient.svg";
import tagIcon from "@/assets/icons/tag-gradient.svg";
import CreateEventCard from "./create-event-card";
import { Input } from "@/components/common/shadcn-ui/input";
import Button from "@/components/common/button";
import Radio from "@/components/common/radio-group";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Catagory from "@/components/common/category";
import AddCatagoryDropdown from "@/components/common/add-category-dropdown";
import LoadingWrapper from "@/components/common/loading-wrapper";
import { set } from "date-fns";
export default function TimeForm({
    onCategoriesChange,
    step,
    prevStepHandler,
    error,
}: Readonly<{
    onCategoriesChange: (categories: string[]) => void;
    step: number;
    prevStepHandler: () => void;
    error: { message: string };
}>) {
    const today = new Date().toISOString().split('T')[0];
    const [endDateMin, setEndDateMin] = useState(today);
    const [endDateVal, setEndDateVal] = useState(today);
    const [startDate, setStartDate] = useState(today);
    const [selectedCatagories, setSelectedCatagories] = useState(
        [] as string[]
    );

    useEffect(() => {
        onCategoriesChange(selectedCatagories);
    }, [selectedCatagories]);

    return (
        <CreateEventCard actual={step} goal={3}>
            <h1 className="flex items-center gap-2 font-bold text-xl">
                <Image src={puzzleIcon} alt="puzzle icon" />
                جدولة الفعالية
            </h1>
            <div className="w-1/2 grid gap-5 mt-2">
                <div className="flex gap-4">
                    <label
                        htmlFor="startDateTime"
                        className="block text-lg text-custom-gray text-nowrap"
                    >
                        تاريخ بدأ الفعالية
                    </label>
                    <Input
                        type="date"
                        name="startDateTime"
                        min={today}
                        value={startDate}
                        onChange={(e) => {
                            setEndDateMin(e.target.value);
                            setEndDateVal(e.target.value);
                            setStartDate(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="endDateTime"
                        className="block text-lg text-custom-gray text-nowrap"
                    >
                        تاريخ انتهاء الفعالية
                    </label>
                    <Input

                        type="date"
                        name="endDateTime"
                        min={endDateMin}
                        value={endDateVal}
                        onChange={(e) => {
                            setEndDateVal(e.target.value);
                        }}
                    />
                </div>
                <label className="block text-lg text-custom-gray">
                    هل هي فعالية عامة ام خاصة
                </label>
                <Radio
                    name={"isPublic"}
                    options={["عامة", "خاصة"]}
                    values={["true", "false"]}
                />
                <h1 className="flex items-center gap-2 font-bold text-xl">
                    <Image src={tagIcon} alt="puzzle icon" />
                    لمن توجه اليه الفعالية
                </h1>
                <motion.div layout className="flex flex-wrap gap-2">
                    {selectedCatagories.map(category => (
                        <Catagory
                            onClick={() => {
                                if (selectedCatagories.length === 1) {
                                    return;
                                }
                                setSelectedCatagories(prevState => {
                                    return prevState.filter(
                                        t => t !== category
                                    );
                                });
                            }}
                            selected={selectedCatagories.includes(category)}
                            checked
                            active
                            key={category}
                        >
                            {category}
                        </Catagory>
                    ))}
                    <motion.div layout className="grid place-items-center">
                        {selectedCatagories.length < 3 && (
                            <AddCatagoryDropdown
                                onCatagorySelect={(catagory: string) => {
                                    if (selectedCatagories.includes(catagory)) {
                                        return;
                                    }
                                    setSelectedCatagories(prevState => [
                                        ...prevState,
                                        catagory,
                                    ]);
                                }}
                            />
                        )}
                    </motion.div>
                </motion.div>
            </div>
            {error.message && (
                <p className="text-red-500 text-center mt-5">
                    حدث خطأ, الرجاء المحاولة مره اخرى.
                </p>
            )}
            <LoadingWrapper>
                <div className="flex flex-row-reverse justify-between w-full mt-20">
                    <Button gradient className="!px-10">
                        تنسيق الفعالية
                    </Button>
                    <Button
                        onClick={e => {
                            e.preventDefault();
                            prevStepHandler();
                        }}
                        className="!px-10"
                    >
                        السابق
                    </Button>
                </div>
            </LoadingWrapper>
        </CreateEventCard>
    );
}
