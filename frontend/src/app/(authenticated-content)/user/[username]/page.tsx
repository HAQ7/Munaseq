import Image from "next/image";
import userCircle from "@/assets/icons/user-circle.svg";
import Link from "next/link";
import edit from "@/assets/icons/edit.svg";
import Subtitle from "@/components/authenticated-content/subtitle";
import { cookies, headers } from "next/headers";
import getProfileAction from "@/proxy/get-profile-action";
import convertBase64ToImage from "@/util/convertBase64ToImage";
import { redirect } from "next/navigation";
import tag from "@/assets/auth-content-assets/tag.svg";
import Tag from "@/components/common/tag";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: username
// };

export default async function UserProfile() {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    let data: any;
    if (token) {
        data = await getProfileAction(token.value);
        return (
            <section>
                <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                        <div className="lg:w-32 w-24 aspect-square relative rounded-full overflow-hidden">
                            {data.profilePicture ? (
                                <Image
                                    src={convertBase64ToImage(
                                        data.profilePicture
                                    )}
                                    alt="preview"
                                    fill
                                    priority
                                />
                            ) : (
                                <Image
                                    src={userCircle}
                                    alt="user-circle"
                                    fill
                                    priority
                                />
                            )}
                        </div>
                        <div className="mt-2">
                            <div className="font-bold text-nowrap overflow-ellipsis overflow-hidden w-44 text-3xl">
                                {data.firstName + " " + data.lastName}
                            </div>
                            <div className="text-custom-gray text-nowrap overflow-ellipsis overflow-hidden w-44 text-xl">
                                {data.username}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <Link
                            href="/account"
                            className="bg-black text-white p-3 rounded-full font-bold"
                        >
                            معلومات الحساب
                        </Link>
                        <Image src={edit} alt="edit icon" className="w-10" />
                    </div>
                </div>
                <div className="mt-5 flex gap-1">
                    <Image src={tag} alt="catigory icon" className="w-10" />
                    <div className="flex flex-wrap">
                        {data.categories.map((category: string) => {
                            return <Tag key={category}>{category}</Tag>;
                        })}
                    </div>
                </div>
                <Subtitle>الوصف</Subtitle>
                {data.description ? (
                    <p className="p-5">{data.description}</p>
                ) : (
                    <p className="p-5 text-gray-500">لا يوجد وصف للمستخدم</p>
                )}
            </section>
        );
    }
    redirect("/signin");
}

