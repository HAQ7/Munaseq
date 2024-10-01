"use client";
import { motion } from "framer-motion";
import Button from "../common/button";
import Image from "next/image";
import logo from "@/assets/logo/munaseq-logo.svg";
import Menu from "./menu";
import Link from "next/link";

const contentVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
};

export default function Header() {
  return (
    <header className="p-3 flex justify-between items-center">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeOut" }}
        variants={contentVariants}
      >
        <Link href="/">
          <Image
            priority
            className="sm:w-52 w-40"
            src={logo}
            alt="Munaseq logo"
          />
        </Link>
      </motion.div>

      <motion.div
        className="hidden md:flex w-full md:w-auto"
        id="navbar-solid-bg"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeOut" }}
        variants={contentVariants}
      >
        <ul className="flex font-normal text-xl space-x-20 rtl:space-x-reverse flex-row mt-0">
          <li>
            <Link
              href="#features"
              scroll={true}
              className="md:hover:bg-gradient-to-l md:hover:from-primary md:hover:to-secondary md:hover:bg-clip-text md:hover:text-transparent"
            >
              المميزات
            </Link>
          </li>
          <li>
            <Link
              href="#events"
              scroll={true}
              className="md:hover:bg-gradient-to-l md:hover:from-primary md:hover:to-secondary md:hover:bg-clip-text md:hover:text-transparent"
            >
              الفعاليات
            </Link>
          </li>
          <li>
            <Link
              href="#footer"
              scroll={true}
              className="md:hover:bg-gradient-to-l md:hover:from-primary md:hover:to-secondary md:hover:bg-clip-text md:hover:text-transparent"
            >
              حول منسق
            </Link>
          </li>
        </ul>
      </motion.div>

      <motion.div
        className="hidden sm:flex gap-2"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeOut" }}
        variants={contentVariants}
      >
        <Link href="/signin">
          <Button outline>تسجيل دخول</Button>
        </Link>
        <Link href="/signup">
          <Button gradient>انشاء الحساب</Button>
        </Link>
      </motion.div>

      <div className="md:hidden">
        <Menu />
      </div>
    </header>
  );
}
