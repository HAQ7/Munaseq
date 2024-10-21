"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TabIndicator({ tab }: { tab: string }) {
    const pathname = usePathname();
    return (
        <>
            {pathname === tab && (
                <motion.div
                    layoutId="active-joined-events-tab"
                    className="w-full h-1 rounded-full bg-custom-gradient mt-1"
                />
            )}
        </>
    );
}
