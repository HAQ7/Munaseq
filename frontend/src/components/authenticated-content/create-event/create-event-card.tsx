"use client";

import decoLeft from "@/assets/create-event/deco-left-top.png";
// import decoRight from "@/assets/create-event/deco-right-bottom.svg";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function CreateEventCard({
    children,
    goal,
    actual,
}: Readonly<{ children: React.ReactNode; goal: number; actual: number }>) {
    const variants: Variants = {
        next: {
            x: "-50%",
            opacity: 0,
            visibility: "hidden",
            zIndex: -1,
        },
        past: {
            x: "50%",
            opacity: 0,
            visibility: "hidden",
            zIndex: -1,
        },
        active: {
            x: 0,
            opacity: 1,
            visibility: "visible",
            zIndex: 1
        },
    };
    return (
        <motion.div
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            initial={2 <= goal ? "next" : "active"}
            animate={
                actual === goal ? "active" : actual > goal ? "past" : "next"
            }
            variants={variants}
            className={
                "max-w-[45rem] w-[98%] bg-white shadow-md rounded-3xl overflow-hidden p-5 " + 
                (goal !== 2 ? "absolute" : "relative")
            }
        >
            <Image
                alt="deco"
                src={decoLeft}
                className="absolute left-0 top-0"
            />
            {/* <Image
                alt="deco"
                src={decoRight}
                className="absolute right-0 bottom-0"
            /> */}
            <div className="z-10 relative">{children}</div>
        </motion.div>
    );
}
