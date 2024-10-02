"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { usePathname } from "next/navigation";
import user from "@/assets/icons/user.svg";
import userActive from "@/assets/icons/user-active.svg";
import discover from "@/assets/icons/discover.svg";
import discoverActive from "@/assets/icons/discover-active.svg";
import calender from "@/assets/icons/calender.svg";
import calenderActive from "@/assets/icons/calender-active.svg";
import join from "@/assets/icons/join.svg";
import joinActive from "@/assets/icons/join-active.svg";
import userCircle from "@/assets/icons/user-circle.svg";
import Image from "next/image";
import Link from "next/link";

type NavLink = {
    name: string;
    path: string;
    icon: StaticImport;
    iconActive: StaticImport;
};

export default function Menu() {
    const pathname = usePathname();
    const navLinks: NavLink[] = [
        {
            name: "اكتشف",
            path: "/discover",
            icon: discover,
            iconActive: discoverActive,
        },
        {
            name: "الملف الشخصي",
            path: "/profile",
            icon: user,
            iconActive: userActive,
        },
        {
            name: "الفعاليات المنسقة",
            path: "/organized-events",
            icon: calender,
            iconActive: calenderActive,
        },
        {
            name: "الفعاليات المنضمة",
            path: "/joined-events",
            icon: join,
            iconActive: joinActive,
        },
    ];
    return (
        <div className="w-80 h-screen rounded-3xl fixed bg-white shadow-menu">
            <div className="flex gap-3 p-5">
                <div className="w-20 aspect-square relative rounded-full overflow-hidden">
                    <Image src={userCircle} alt="preview" fill priority />
                </div>
                <div className="mt-2">
                    <p className="font-bold text-lg">حسام القنام</p>
                    <p className="text-custom-gray">HQ7</p>
                </div>
            </div>

            <nav className="mt-20 text-xl grid gap-5 text-[#525252] relative">
                {navLinks.map((link: NavLink) => {
                    const isActive: boolean = link.path === pathname;
                    return (
                        <Link key={link.name} href={link.path}>
                            <div className="flex gap-5 items-center py-1 relative w-full">
                                <Image
                                    priority
                                    className="w-10 ms-5"
                                    src={isActive ? link.iconActive : link.icon}
                                    alt="link image"
                                />
                                <p
                                    className={
                                        isActive
                                            ? "bg-custom-gradient text-transparent bg-clip-text font-bold"
                                            : ""
                                    }
                                >
                                    {link.name}
                                </p>
                                {isActive ? (
                                    <span className="absolute right-0 w-1 h-full bg-custom-gradient" />
                                ) : null}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
