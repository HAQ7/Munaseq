"use client";

import Button from "@/components/common/button";
import LoadingWrapper from "@/components/common/loading-wrapper";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/common/shadcn-ui/dialog";
import { Input } from "@/components/common/shadcn-ui/input";
import TextArea from "@/components/common/text-area";
import addAssignmentAction from "@/proxy/add-assignment-action";
import { useState, useRef } from "react";

export default function AddActivty({ eventId }: { eventId: string }) {
    const [error, setError] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [endDate, setEndDate] = useState(today);
    const ref = useRef<HTMLInputElement>(null);

    return (
        <Dialog>
            <DialogTrigger>
                <div className="border-4 border-[#949494] border-dashed w-56 aspect-square rounded-3xl grid place-items-center transition-colors group hover:border-[#666666] cursor-pointer">
                    <div className="grid place-items-center group-hover:text-[#666666] transition-colors text-custom-gray ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <p className="text-lg">أضف نشاط</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent dir="rtl" className="bg-white">
                <DialogHeader className=" !text-right  ps-4">
                    <DialogTitle>اضافة نشاط</DialogTitle>
                    <DialogDescription>
                        <form
                            className="grid gap-4"
                            action={async (formData: FormData) => {
                                if (!ref.current?.value) {
                                    setError("يجب تعبئة جميع الفراغات");
                                    return;
                                }

                                formData.delete("type");
                                formData.append("startDate", today)

                                const error: { message: string } | undefined =
                                    await addAssignmentAction(
                                        eventId,
                                        formData
                                    );
                                if (error?.message) {
                                    setError("حدث خطأ ما");
                                }
                            }}
                        >
                            <select name="type" className="p-4 outline-none">
                                <option value="assignment" selected>
                                    واجب
                                </option>
                                {/* <option value="quiz">اختبار</option> */}
                            </select>
                            <TextArea
                                name="questions"
                                placeholder="أسئلة النشاط"
                                className=""
                                ref={ref}
                            ></TextArea>
                            <label
                                htmlFor="startDateTime"
                                className="block text-lg text-custom-gray text-nowrap"
                            >
                                تاريخ انتهاء نشاط الفعالية
                            </label>
                            <Input
                                className="w-min"
                                type="date"
                                name="endDate"
                                min={today}
                                value={endDate}
                                onChange={e => {
                                    setEndDate(e.target.value);
                                }}
                            />
                            {error && <p className="text-red-500">{error}</p>}

                            <LoadingWrapper>
                                <Button className="mt-2" gradient>
                                    تثبيت
                                </Button>
                            </LoadingWrapper>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
