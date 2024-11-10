

import { Metadata } from "next";
import Title from "@/components/common/title";
import penIcon from "@/assets/icons/edit-gradient.svg";
import Image from "next/image";
import getProfileAction from "@/proxy/get-profile-action";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserDataDto } from "@/dtos/user-data.dto";
import Link from "next/link";
import EditForm from "@/components/authenticated-content/account/edit-form";


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

                <EditForm token={token.value} userData={data} />
            </section>
        );
    }
    redirect("/signin");
}
