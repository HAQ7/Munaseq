import MenuProfile from "./menu-profile";
import { Suspense } from "react";
import MenuProfileSkeleton from "./menu-profile-skeleton";
import Nav from "./Nav";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import plus from "@/assets/icons/plus-circle-white.svg";

export default function Menu() {
    const headersList = headers();
    const username: string = headersList.get("x-username") as string;

    if (!username) {
        redirect("/signin");
    }

    return (
        <div className="w-[22rem] h-screen rounded-3xl fixed bg-white shadow-menu">
            <Suspense fallback={<MenuProfileSkeleton />}>
                <MenuProfile />
            </Suspense>
            <Nav username={username} />
            <div className="absolute bottom-0 grid place-items-center w-full p-10">
                <Link
                    href="/create-event"
                    className="bg-custom-gradient  px-6 py-4 text-white  text-xl flex justify-center gap-3 bg-[length:120%] hover:bg-right transition-all rounded-full font-semibold text-nowrap "
                >
                    نسق فعالية{" "}
                    <Image
                        src={plus}
                        className="w-7 aspect-square"
                        alt="add icon"
                    />
                </Link>
            </div>
        </div>
    );
}
