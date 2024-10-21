"use client";

import Subtitle from "@/components/common/subtitle";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CoordinatedEvents({
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
                        href="/coordinated-events/active"
                        className="relative text-nowrap"
                    >
                        الفعاليات الحالية
                        {pathname === "/coordinated-events/active" && (
                            <motion.div
                                layoutId="active-coordinated-events-tab"
                                className="w-full h-1 rounded-full bg-custom-gradient mt-1"
                            />
                        )}
                    </Link>
                    <Link
                        href="/coordinated-events/upcoming"
                        className="relative text-nowrap"
                    >
                        الفعاليات القادمة{" "}
                        {pathname === "/coordinated-events/upcoming" && (
                            <motion.div
                                layoutId="active-coordinated-events-tab"
                                className="w-full h-1 rounded-full bg-custom-gradient mt-1"
                            />
                        )}
                    </Link>
                    <Link
                        href="/coordinated-events/past"
                        className="relative text-nowrap"
                    >
                        الفعاليات الماضية{" "}
                        {pathname === "/coordinated-events/past" && (
                            <motion.div
                                layoutId="active-coordinated-events-tab"
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
