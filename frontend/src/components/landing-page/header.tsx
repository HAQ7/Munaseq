import Button from "../common/button";
import Image from "next/image";
import logo from "@/assets/munaseq-logo.svg";

export default function Header() {
    return (
        <header className="p-3 flex justify-between items-center">
            <a href="./">
                <Image priority className="w-52" src={logo} alt="Munaseq logo" />
            </a>
            <div className="flex gap-2">
                <Button outline>تسجيل دخول</Button>
                <Button>انشاء الحساب</Button>
            </div>
        </header>
    );
}
