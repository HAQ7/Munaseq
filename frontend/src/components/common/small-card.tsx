"use client";

import { useEffect, useState } from "react";
import dateIcon from "@/assets/land-assets/date-icon.svg";
import timeIcon from "@/assets/land-assets/time-icon.svg";
import presenterIcon from "@/assets/land-assets/presenter-icon.svg";
import rateIcon from "@/assets/land-assets/rate-icon.svg";
import Image from "next/image";
import Button from "./button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import getUserAction from "@/proxy/get-user-using-id-action";
import { UserDataDto } from "@/dtos/user-data.dto";
import { Skeleton } from "./shadcn-ui/skeleton";

export default function SmallCard({
    image,
    title,
    time,
    date,
    userId,
    rate,
    cost,
    badges = [],
}: {
    image: StaticImport;
    title: string;
    time?: string;
    date: string;
    userId: string;
    rate?: number;
    cost?: string;
    badges: string[];
}) {
    const [user, setUser] = useState<UserDataDto>();
    const [loading, setLoading] = useState(true);
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
        <div className="max-w-[340px] w-full min-h-[350px] bg-white border border-gray-200 rounded-3xl shadow-lg ">
            <div className="p-0 relative h-40">
                {!loading ? (
                    <Image
                        className="rounded-t-3xl object-cover"
                        src={image}
                        fill
                        sizes="100%"
                        alt=""
                    />
                ) : (
                    <Skeleton className="rounded-t-3xl h-40" />
                )}
            </div>

            <div className="p-5 pt-0">
                <div className="mb-2 mt-2">
                    {badges.map((badge, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-purple-100 px-2.5 py-1 ml-2 text-sm font-medium text-purple-800"
                        >
                            {badge}
                        </span>
                    ))}
                </div>

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-custom-black">
                    {!loading ? title : <Skeleton className="w-3/4 h-8 mt-10" />}
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
                        <Button gradient>انضم الان</Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
