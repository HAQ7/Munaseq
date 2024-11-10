"use client";

import Subtitle from "@/components/common/subtitle";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JoinedEvents({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <>
            <Subtitle>
                <div className="flex gap-8">
                    <Link
                        href="/joined-events/active"
                        className="relative text-nowrap"
                    >
                        الفعاليات الحالية
                        {pathname === "/joined-events/active" && (
                            <motion.div
                                layoutId="active-joined-events-tab"
                                className="w-full h-1 rounded-full bg-custom-gradient mt-1"
                            />
                        )}
                    </Link>
                    <Link
                        href="/joined-events/upcoming"
                        className="relative text-nowrap"
                    >
                        الفعاليات القادمة{" "}
                        {pathname === "/joined-events/upcoming" && (
                            <motion.div
                                layoutId="active-joined-events-tab"
                                className="w-full h-1 rounded-full bg-custom-gradient mt-1"
                            />
                        )}
                    </Link>
                    <Link
                        href="/joined-events/past"
                        className="relative text-nowrap"
                    >
                        الفعاليات الماضية{" "}
                        {pathname === "/joined-events/past" && (
                            <motion.div
                                layoutId="active-joined-events-tab"
                                className="w-full h-1 rounded-full bg-custom-gradient mt-1"
                            />
                        )}
                    </Link>
                </div>
            </Subtitle>
            {children}
        </>
    );
}
