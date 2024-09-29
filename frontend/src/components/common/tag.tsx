"use client";

import Image from "next/image";
import x from "@/assets/icons/x.svg";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Tag(props: {
    onClick?: (e: any) => void;
    active?: boolean;
    children: string;
}) {
    const [selected, setSelected] = useState(false);
    return (
        <motion.button
            layout
            animate={{ backgroundColor: selected ? "#F5F5F5" : "#FFFFFF" }}
            onClick={e => {
                e.preventDefault();
                setSelected((prevState: boolean) => !prevState);
            }}
            className="bg-white border-pirmary border-2 rounded-3xl px-3 py-2 text-primary font-bold flex justify-center items-center gap-2 group text-nowrap"
        >
            <motion.p layout>{props.children}</motion.p>
            {selected && (
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ y: 10, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Image src={x} alt="Tag Image" className="w-4" />
                </motion.div>
            )}
        </motion.button>
    );
}
