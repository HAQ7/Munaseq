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
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
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
          <Link href="#features" scroll={true} onClick={handleLinkClick}>
            <Button outline className="w-full text-left">
              المميزات
            </Button>
          </Link>
          <Link href="#events" scroll={true} onClick={handleLinkClick}>
            <Button outline className="w-full text-left">
              الفعاليات
            </Button>
          </Link>
          <Link href="#footer" scroll={true} onClick={handleLinkClick}>
            <Button outline className="w-full text-left">
              حول منسق
            </Button>
          </Link>
          <Link href="/signin" onClick={handleLinkClick}>
            <Button outline>تسجيل دخول</Button>
          </Link>
          <Link href="/signup" onClick={handleLinkClick}>
            <Button gradient>انشاء الحساب</Button>
          </Link>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
