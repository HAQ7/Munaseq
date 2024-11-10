"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/common/shadcn-ui/sheet";
import Image from "next/image";
import bars from "@/assets/icons/bars.svg";
import { useState } from "react";
import Menu from "./menu";

export default function MenuMobile() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="block lg:hidden">
                <Image src={bars} alt="menu" className="w-10" />
            </SheetTrigger>
            <SheetContent className="w-[22rem] h-screen rounded-e-3xl fixed bg-white shadow-menu">
                
            </SheetContent>
        </Sheet>
    );
}
