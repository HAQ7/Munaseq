"use client";

import MenuProfile from "./menu-profile";
import { useEffect, useState } from "react";
import MenuProfileSkeleton from "./menu-profile-skeleton";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import plus from "@/assets/icons/plus-circle-white.svg";
import Cookies from "js-cookie";
import { UserDataDto } from "@/dtos/user-data.dto";
import getProfileAction from "@/proxy/user/get-profile-action";

export default function Menu({
    mobile,
    onLinkClick,
}: {
    mobile?: boolean;
    onLinkClick?: () => void;
}) {
    const [profileData, setProfileData] = useState(null as UserDataDto | null);
    useEffect(() => {
        const getProfile = async () => {
            // get cookies
            const token = Cookies.get("token");
            const data = await getProfileAction();
            setProfileData(data);
        };
        getProfile();
    }, []);
    if (profileData) {
        return (
            <div
                className={
                    " flex flex-col flex-1 " +
                    (!mobile
                        ? "max-w-[22rem] h-screen rounded-3xl fixed bg-white lg:shadow-menu"
                        : "")
                }
            >
                <MenuProfile
                    onLinkClick={onLinkClick}
                    profileData={profileData}
                />
                <div className="!overflow-y-auto flex-1 h-min">
                    <Nav
                        onLinkClick={onLinkClick}
                        username={profileData?.username}
                    />
                </div>
                <div className=" grid place-items-center w-full p-10">
                    <Link
                        onClick={onLinkClick}
                        href="/create-event"
                        className="bg-custom-gradient  px-6 py-4 text-white  text-xl flex justify-center gap-3 bg-[length:120%] hover:bg-right transition-all rounded-full font-semibold text-nowrap "
                    >
                        نسق فعاليتك{" "}
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

    return (
        <div
            className={
                !mobile ? "w-[20rem] h-screen rounded-3xl shadow-menu" : ""
            }
        >
            <MenuProfileSkeleton />
        </div>
    );
}
