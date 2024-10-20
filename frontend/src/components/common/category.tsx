"use client";

import Image from "next/image";
import x from "@/assets/icons/x.svg";
import { motion } from "framer-motion";

export default function Catagory(props: {
    onClick?: (e: any) => void;
    checked?: boolean;
    active?: boolean;
    children: string;
    selected?: boolean;
}) {
    return (
        <motion.button
            layout
            animate={{ backgroundColor: props.selected ? "#F5F5F5" : "#FFFFFF" }}
            onClick={e => {
                e.preventDefault();
                if (props.active) {
                  
                    if (props.onClick) {
                        props.onClick(e);
                    }
                }
            }}
            className={
                "bg-white border-pirmary border-2 rounded-3xl px-3 py-2 text-primary font-bold flex justify-center items-center gap-2 group text-nowrap " +
                (!props.active ? " cursor-default" : "")
            }
        >
            <motion.div layout>{props.children}</motion.div>
            {props.selected && (
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
