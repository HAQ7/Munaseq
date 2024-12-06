"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TabIndicator({ tab, layoutId }: { tab: string, layoutId: string }) {
    const pathname = usePathname();
    return (
        <>
            {pathname.includes(tab) && (
                <motion.div
                    layoutId={layoutId}
                    className="w-full h-1 rounded-full bg-custom-gradient mt-1"
                />
            )}
        </>
    );
}
