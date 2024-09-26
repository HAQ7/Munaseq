import Button from "../common/button";
import Image from "next/image";
import logo from "@/assets/logo/munaseq-logo.svg";
import Menu from "./menu";
import Link from "next/link";

export default function Header() {
    return (
        <header className="p-3 flex justify-between items-center">
            <a href="./">
                <Image
                    priority
                    className="sm:w-52 w-40"
                    src={logo}
                    alt="Munaseq logo"
                />
            </a>
            <div className="gap-2 sm:flex hidden">
                <Link href={"/signin"}>
                    <Button outline>تسجيل دخول</Button>
                </Link>
                <Link href={"/signup"}>
                    <Button>انشاء الحساب</Button>
                </Link>
            </div>
            <Menu />
        </header>
    );
}
