"use client";

import { usePathname } from "next/navigation";
import user from "@/assets/icons/user.svg";
import userActive from "@/assets/icons/user-active.svg";
import discover from "@/assets/icons/discover.svg";
import discoverActive from "@/assets/icons/discover-active.svg";
import calender from "@/assets/icons/calender.svg";
import calenderActive from "@/assets/icons/calender-active.svg";
import join from "@/assets/icons/join.svg";
import joinActive from "@/assets/icons/join-active.svg";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type NavLink = {
    name: string;
    path: string;
    icon: StaticImport;
    iconActive: StaticImport;
};

export default function Nav() {
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
        <nav className="mt-20 text-xl grid gap-5 text-[#525252] relative">
            {navLinks.map((link: NavLink) => {
                const isActive: boolean = link.path === pathname;
                return (
                    <Link key={link.name} href={link.path}>
                        <motion.div
                            whileHover={"active"}
                            className="flex gap-5 items-center py-1 relative w-full group"
                        >
                            <div>
                                <span
                                    className={
                                        "absolute transition-opacity z-10 " +
                                        (isActive
                                            ? "opacity-1"
                                            : "group-hover:opacity-100 opacity-0")
                                    }
                                >
                                    <Image
                                        priority
                                        className="w-10 ms-5"
                                        src={link.iconActive}
                                        alt="link image"
                                    />
                                </span>
                                <span className={" transition-opacity "}>
                                    <Image
                                        priority
                                        className="w-10 ms-5"
                                        src={link.icon}
                                        alt="link image"
                                    />
                                </span>
                            </div>
                            <p
                                className={
                                    "bg-custom-gradient bg-clip-text transition-colors " +
                                    (isActive
                                        ? "text-transparent font-bold"
                                        : "group-hover:text-transparent")
                                }
                            >
                                {link.name}
                            </p>
                            {isActive ? (
                                <motion.span
                                    layoutId="active-bar"
                                    className="absolute right-0 w-1 h-full bg-custom-gradient"
                                />
                            ) : null}
                        </motion.div>
                    </Link>
                );
            })}
        </nav>
    );
}
