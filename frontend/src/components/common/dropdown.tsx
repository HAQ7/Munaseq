"use client";

import dots from "@/assets/icons/dots.svg";
import user from "@/assets/icons/user-black.svg";
import signout from "@/assets/icons/signout.svg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../common/shadcn-ui/dropdown-menu";
import Link from "next/link";
import { Separator } from "../common/shadcn-ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dropdown() {
    const router = useRouter();
    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger className="absoulte left-2">
                <Image className="left-2" src={dots} alt="options" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white relative p-0">
                <Link
                    href={"/account"}
                    className="flex gap-3 items-center p-3 transition-colors hover:bg-[#ebebeb]"
                >
                    {" "}
                    <Image src={user} alt="user icon" className="w-8" />
                    معلومات الحساب
                </Link>
                <Separator orientation="horizontal" className="bg-[#d3d3d3]" />
                <button
                    onClick={() => {
                        document.cookie = "token=;max-age=0;path=/";
                        router.push("/signin");
                    }}
                    className="flex gap-3  items-center p-3 transition-colors hover:bg-[#ebebeb] w-full"
                >
                    {" "}
                    <Image src={signout} alt="user icon" className="w-8" />
                    تسجيل الخروج
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
