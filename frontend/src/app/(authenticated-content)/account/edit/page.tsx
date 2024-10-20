import { Metadata } from "next";
import Title from "@/components/common/title";
import penIcon from "@/assets/icons/edit-gradient.svg";
import Image from "next/image";
import TextField from "@/components/common/text-field";
import userCircle from "@/assets/icons/user-circle.svg";
import Tag from "@/components/common/tag";
import Subtitle from "@/components/common/subtitle";
import getProfileAction from "@/proxy/get-profile-action";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserDataDto } from "@/dtos/user-data.dto";
import TextArea from "@/components/common/text-area";
import Label from "@/components/common/lable";
import Link from "next/link";
import Radio from "@/components/common/radio-group";

export const metadata: Metadata = {
    title: "تعديل معلومات الحساب",
};

export default async function Account() {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    let data: UserDataDto;
    if (token) {
        data = await getProfileAction(token.value);
        return (
            <section className="relative pb-10">
                <Title>
                    <Image src={penIcon} className="w-14" alt="" />
                    <span>تعديل معلومات الحساب</span>
                    <Link
                        href="/account"
                        className="bg-black text-white p-3 rounded-full font-bold absolute left-0 text-sm"
                    >
                        معلومات الحساب
                    </Link>
                </Title>
                <form action="" className="grid grid-cols-1 gap-10">
                    <div className="grid grid-cols-1 gap-10">
                        <Subtitle>المعلومات الاساسية</Subtitle>
                        <div className="w-56">
                            <TextField
                                placeholder="الاسم المستخدم"
                                name="username"
                                defaultValue={data.username}
                            />
                            <TextField
                                placeholder="البريد الالكتروني"
                                name="email"
                                defaultValue={data.email}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        <Subtitle>معلومات الملف الشخصية</Subtitle>

                        <div className="max-w-96 w-full grid grid-cols-1 gap-10">
                            <div className="grid grid-cols-2 gap-10">
                                <TextField
                                    placeholder="الاسم الاول"
                                    name="firstName"
                                    defaultValue={data.firstName}
                                />
                                <TextField
                                    placeholder="الاسم الاخير"
                                    name="lastName"
                                    defaultValue={data.lastName}
                                />
                            </div>
                            <TextField
                                placeholder="الاسم المعروض"
                                name="visibleName"
                                defaultValue={data.visibleName}
                            />
                            <Label label="صورة الملف الشخصي">
                                {data.profilePictureUrl ? (
                                    <Image
                                        src={data.profilePictureUrl}
                                        alt="preview"
                                        priority
                                        className="w-20"
                                    />
                                ) : (
                                    <Image
                                        src={userCircle}
                                        alt="user-circle"
                                        priority
                                        className="w-20"
                                    />
                                )}
                            </Label>
                            <TextArea
                                placeholder="الوصف"
                                name="description"
                                className=""
                                defaultValue={data.description}
                            ></TextArea>
                        </div>
                        <div className="grid gap-3 mt-5">
                            <label className="block text-lg text-custom-gray">
                                الجنس
                            </label>
                            <Radio name={"gender"} options={["ذكر", "انثى"]} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        <Subtitle>الاهتمامات</Subtitle>

                        <div className="flex gap-10 ">
                            {data.categories.map(category => (
                                <Tag checked active key={category}>
                                    {category}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </form>
            </section>
        );
    }
    redirect("/signin");
}
