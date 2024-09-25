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

export default function Menu() {
    return (
        <Sheet>
            <SheetTrigger className="block sm:hidden">
                <Image src={bars} alt="menu" className="w-10" />
            </SheetTrigger>
            <SheetContent className="bg-white flex justify-center">
                <SheetHeader>
                    <SheetTitle className="hidden">Menu</SheetTitle>
                    <SheetDescription className="flex gap-3 flex-col">
                        <Link href={"/signin"}>
                            <Button outline>تسجيل دخول</Button>
                        </Link>
                        <Link href={"/signup"}>
                            <Button>انشاء الحساب</Button>
                        </Link>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
