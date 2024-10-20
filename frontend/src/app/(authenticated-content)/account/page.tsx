import { Metadata } from "next";
import Title from "@/components/common/title";
import userIcon from "@/assets/icons/user-gradiant.svg";
import editIcon from "@/assets/icons/edit.svg";
import Image from "next/image";
import userCircle from "@/assets/icons/user-circle.svg";
import Label from "@/components/common/lable";
import Subtitle from "@/components/common/subtitle";
import Tag from "@/components/common/tag";
import { cookies } from "next/headers";
import getProfileAction from "@/proxy/get-profile-action";
import { redirect } from "next/navigation";
import { UserDataDto } from "@/dtos/user-data.dto";
import Link from "next/link";

export const metadata: Metadata = {
    title: "معلومات الحساب",
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
                    <Link className="absolute left-10" href={"account/edit"}>
                        <Image
                            className=" left-0 w-10"
                            src={editIcon}
                            alt="edit icon"
                        />
                    </Link>
                    <Image src={userIcon} className="w-14" alt="" />
                    <span>معلومات الحساب</span>
                </Title>
                <div className="grid grid-cols-1 gap-10">
                    <div className="grid grid-cols-1 gap-10">
                        <Subtitle>المعلومات الاساسية</Subtitle>

                        <Label label="الاسم المستخدم">{data.username}</Label>
                        <Label label="البريد الالكتروني">{data.email}</Label>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        <Subtitle>معلومات الملف الشخصية</Subtitle>

                        <div className="flex gap-10 ">
                            <Label label="الاسم الاول">{data.firstName}</Label>
                            <Label label="الاسم الاخير">{data.lastName}</Label>
                        </div>
                        <Label label="الاسم المعروض">{data.visibleName}</Label>
                        <Label label="صورة الملف الشخصي">
                            {data.profilePictureUrl ? (
                                <Image
                                    src={data.profilePictureUrl}
                                    alt="preview"
                                    priority
                                    width={80}
                                    height={80}
                                    className="rounded-full"
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
                        <Label label="الوصف">{data.description}</Label>
                        <Label label="الجنس">
                            {data.gender === "MALE" ? "ذكر" : "انثى"}
                        </Label>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        <Subtitle>الاهتمامات</Subtitle>

                        <div className="flex flex-wrap gap-2">
                            {data.categories.map(category => (
                                <Tag key={category}>{category}</Tag>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    redirect("/signin");
}
