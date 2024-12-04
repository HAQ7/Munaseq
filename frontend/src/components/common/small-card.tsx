"use client";

import { useEffect, useState } from "react";
import dateIcon from "@/assets/land-assets/date-icon.svg";
import timeIcon from "@/assets/land-assets/time-icon.svg";
import presenterIcon from "@/assets/land-assets/presenter-icon.svg";
import signout from "@/assets/icons/signout.svg";
import dots from "@/assets/icons/dots-white.svg";
import { Separator } from "./shadcn-ui/separator";
import rateIcon from "@/assets/land-assets/rate-icon.svg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./shadcn-ui/dropdown-menu";
import Image from "next/image";
import Button from "./button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import getUserAction from "@/proxy/get-user-using-id-action";
import { UserDataDto } from "@/dtos/user-data.dto";
import { Skeleton } from "./shadcn-ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import cancelEventAction from "@/proxy/cancel-event-action";
import leaveEventAction from "@/proxy/leave-event-action";
import LogoLoading from "./logo-loading";

export default function SmallCard({
    image,
    title,
    time,
    date,
    userId,
    eventId,
    rate,
    cost,
    badges = [],
    asEventCreator = false,
    asEventParticipant = false,
    isJoined = false,
}: {
    image: StaticImport;
    title: string;
    time?: string;
    date: string;
    userId: string;
    eventId: string;
    rate?: number;
    cost?: string;
    badges: string[];
    asEventCreator?: boolean;
    asEventParticipant?: boolean;
    isJoined?: boolean;
}) {
    const [user, setUser] = useState<UserDataDto>();
    const [loading, setLoading] = useState(true);
    const [cancelOrLeaveLoading, setCancelOrLeaveLoading] = useState(false);
    const { toast } = useToast();
    const leaveEvent = async () => {

        const res = await leaveEventAction(eventId);
        console.log(res);
        toast({
            duration: 5000,
            title: "تم الخروج من الفعالية",
        }); 
    };
    const cancelEvent = async () => {
        const res = await cancelEventAction(eventId);
        console.log(res);
        toast({
            duration: 5000,
            title: "تم الغاء الفعالية",
        });
    };

    useEffect(() => {
        async function getUser() {
            if (userId) {
                const user = await getUserAction(userId).then(
                    (user: UserDataDto) => {
                        return user;
                    }
                );
                setUser(user);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        getUser();
    }, []);

    return (
        <div className="max-w-[340px] w-full min-h-[350px] bg-white border border-gray-200 rounded-3xl shadow-lg relative">
            <div className="p-0 relative h-40">
                {!loading ? (
                    <>
                        <Image
                            className="rounded-t-3xl object-cover"
                            src={image}
                            fill
                            sizes="100%"
                            alt=""
                        />
                        {(asEventCreator || asEventParticipant) && (
                            <DropdownMenu dir="rtl">
                                <DropdownMenuTrigger className="absolute top-2 right-2 z-30">
                                    <Image src={dots} alt="options" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white relative">
                                    {cancelOrLeaveLoading && (
                                        <LogoLoading className="w-10" />
                                    )}
                                    {asEventCreator &&
                                        !cancelOrLeaveLoading && (
                                            <div
                                                onClick={() => cancelEvent()}
                                                className="px-4 py-2 flex items-center gap-2 transition-colors hover:bg-[#ebebeb] cursor-pointer"
                                            >
                                                الغاء الفعالية{" "}
                                                <Image
                                                    src={signout}
                                                    alt="user icon"
                                                    className="w-8"
                                                />
                                            </div>
                                        )}
                                    {asEventParticipant &&
                                        !cancelOrLeaveLoading && (
                                            <div
                                                onClick={() => leaveEvent()}
                                                className="px-4 py-2 flex items-center gap-2 transition-colors hover:bg-[#ebebeb] cursor-pointer"
                                            >
                                                {" "}
                                                الخروج من الفعالية{" "}
                                                <Image
                                                    src={signout}
                                                    alt="user icon"
                                                    className="w-8"
                                                />
                                            </div>
                                        )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </>
                ) : (
                    <Skeleton className="rounded-t-3xl h-40" />
                )}
            </div>

            <div className="p-5 pt-0">
                <div className="mb-2 mt-2 absolute top-0">
                    {badges.map((badge, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-purple-100 px-2.5 py-1 ml-2 text-sm font-medium text-purple-800"
                        >
                            {badge}
                        </span>
                    ))}
                </div>

                <h5 className="my-2 text-2xl font-bold tracking-tight text-custom-black">
                    {!loading ? (
                        title
                    ) : (
                        <Skeleton className="w-3/4 h-8 mt-10" />
                    )}
                </h5>

                {!loading ? (
                    <div className="flex gap-5 mb-3 font-medium items-center">
                        {/* <div className="flex gap-2 items-center">
                        <Image src={timeIcon} alt="" />
                        <p className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent text-base">
                            {time}
                        </p>
                    </div> */}
                        <div className="flex gap-2 items-center">
                            <Image src={dateIcon} alt="" className="" />
                            <p className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent text-base">
                                {date}
                            </p>
                        </div>
                    </div>
                ) : (
                    <Skeleton className="w-3/4 h-8 mt-2" />
                )}

                {!loading && user ? (
                    <div className="flex gap-5 font-medium items-center">
                        <div className="flex gap-2">
                            <Image src={presenterIcon} alt="" className="" />
                            <Link
                                href={"/user/" + user.username}
                                className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent text-base"
                            >
                                {user.firstName + " " + user.lastName}
                            </Link>
                        </div>
                        <div className="flex gap-2 items-center">
                            {/* <Image src={rateIcon} alt="" />
                        <p className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent text-base">
                            {rate}
                        </p> */}
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {!loading ? (
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-2xl font-bold text-custom-black">
                            {cost}
                        </p>
                        <Button gradient>
                            <Link
                                className="w-full h-full grid place-items-center"
                                href={`/event/${eventId}${isJoined ? "/about" : ""}`}
                            >
                                التفاصيل
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
