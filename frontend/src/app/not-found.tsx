"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/button";
import logo from "@/assets/logo/munaseq-logo.svg";
const contentVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};
export default function error() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <motion.div
        className="flex flex-col items-center space-y-6"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut" }}
        variants={contentVariants}
      >
        <Image
          src={logo}
          alt="Munaseq logo"
          className="w-36 sm:w-48 md:w-52 lg:w-64 mb-8"
        />

        <h1 className="text-custom-black text-5xl sm:text-6xl md:text-7xl font-bold text-center">
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
            404
          </span>{" "}
          - الصفحة غير موجودة
        </h1>

        <p className="text-gray-500 text-md sm:text-lg md:text-xl text-center px-4 sm:px-8 lg:px-16">
          حدث خطا
        </p>

        <Link href="/">
          <Button gradient>العودة إلى الصفحة الرئيسية</Button>
        </Link>
      </motion.div>
    </div>
  );
}
