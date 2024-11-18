"use client";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import { motion } from "framer-motion";

export default function Return({ className }: { className?: string }) {
    return (
        <motion.div
            whileHover={"appear"}
            initial={"disapper"}
            className={"cursor-pointer z-10 grid place-items-center " + className}
        >
            <Image
                className="w-10"
                src={backIcon}
                onClick={() => window.history.back()}
                alt="return icon"
            />
            <motion.div
                variants={{
                    disapper: {
                        opacity: 0,
                        y: -10,
                    },
                    appear: {
                        opacity: 1,
                        y: 0,
                    },
                }}
            >
                العودة
            </motion.div>
        </motion.div>
    );
}
