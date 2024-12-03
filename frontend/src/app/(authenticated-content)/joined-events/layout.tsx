"use client";

import Subtitle from "@/components/common/subtitle";
import { motion } from "framer-motion";
import Link from "next/link";
import SelectEvents from "@/components/common/select-events";
import { usePathname } from "next/navigation";
import TabIndicator from "@/components/common/tab-indicator";

export default function JoinedEvents({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <>
            <Subtitle>
                <div className="gap-8 sm:flex hidden">
                    <Link
                        href="/joined-events/active"
                        className="relative text-nowrap"
                    >
                        الفعاليات الحالية
                        <TabIndicator layoutId="active-joined-events-tab" tab="/joined-events/active" />
                    </Link>
                    <Link
                        href="/joined-events/upcoming"
                        className="relative text-nowrap"
                    >
                        الفعاليات القادمة{" "}
                        <TabIndicator layoutId="active-joined-events-tab" tab="/joined-events/upcoming" />
                    </Link>
                    <Link
                        href="/joined-events/past"
                        className="relative text-nowrap"
                    >
                        الفعاليات الماضية{" "}
                        <TabIndicator layoutId="active-joined-events-tab" tab="/joined-events/past" />
                    </Link>
                </div>
                <div className="sm:hidden block">
                    <SelectEvents />
                </div>
            </Subtitle>
            {children}
        </>
    );
}
