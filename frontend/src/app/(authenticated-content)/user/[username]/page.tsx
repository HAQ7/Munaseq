import Image from "next/image";
import userCircle from "@/assets/icons/user-circle.svg";
import Link from "next/link";
import edit from "@/assets/icons/edit.svg";
import Subtitle from "@/components/common/subtitle";
import { cookies } from "next/headers";
import getProfileAction from "@/proxy/get-profile-action";
import { notFound, redirect } from "next/navigation";
import tag from "@/assets/auth-content-assets/tag.svg";
import Tag from "@/components/common/category";
import { UserDataDto } from "@/dtos/user-data.dto";
import getUserAction from "@/proxy/get-user-action";

export function generateImageMetadata({
    params,
}: {
    params: { username: string };
}) {
    return {
        title: params.username,
    };
}

export default async function UserProfile({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username;
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    let data: UserDataDto;
    if (token) {
        data = await getUserAction(username);
        if (!data) {
            notFound();
        }
        const profile: UserDataDto = await getProfileAction(token.value);
        const hisProfile: boolean = data.username === profile.username;
        return (
            <section>
                <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                        <div className="lg:w-32 w-24 aspect-square relative rounded-full overflow-hidden">
                            {data.profilePictureUrl ? (
                                <Image
                                    src={data.profilePictureUrl}
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
                            <div className="font-bold text-nowrap overflow-ellipsis overflow-hidden w-96 text-3xl">
                                {data.firstName + " " + data.lastName}
                            </div>
                            <div className="text-custom-gray text-nowrap overflow-ellipsis overflow-hidden w-96 text-xl">
                                {data.username}
                            </div>
                        </div>
                    </div>
                    {hisProfile && (
                        <div className="flex gap-5">
                            <Link
                                href="/account"
                                className="bg-black text-white p-3 rounded-full font-bold"
                            >
                                معلومات الحساب
                            </Link>
                            <Link href={'/account/edit'} className="grid place-items-center">
                                <Image
                                    src={edit}
                                    alt="edit icon"
                                    className="w-10"
                                />
                            </Link>
                        </div>
                    )}
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
                    <p className="p-5 w-full">{data.description}</p>
                ) : (
                    <p className="p-5 text-gray-500">لا يوجد وصف للمستخدم</p>
                )}
            </section>
        );
    }
    redirect("/signin");
}
