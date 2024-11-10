import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/common/shadcn-ui/sheet";
import Button from "@/components/common/button";
import Image from "next/image";
import bars from "@/assets/icons/bars.svg";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: any, sectionId: string) => {
    setIsOpen(false);

    e.preventDefault();
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="block sm:hidden">
        <Image src={bars} alt="menu" className="w-10" />
      </SheetTrigger>
      <SheetContent className="bg-white flex flex-col justify-center">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <SheetDescription className="flex flex-col gap-3">
          <a
            className="w-full text-left"
            onClick={(e) => handleLinkClick(e, "#features")}
          >
            <Button outline>المميزات</Button>
          </a>
          <button
            className="w-full text-left"
            onClick={(e) => handleLinkClick(e, "#events")}
          >
            <Button outline>الفعاليات</Button>
          </button>
          <button
            className="w-full text-left"
            onClick={(e) => handleLinkClick(e, "#footer")}
          >
            <Button outline>حول منسق</Button>
          </button>

          <a href="/signin">
            <Button outline>تسجيل دخول</Button>
          </a>
          <a href="/signup">
            <Button gradient>انشاء الحساب</Button>
          </a>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
