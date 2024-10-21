import Menu from "@/components/authenticated-content/menu";
import Image from "next/image";
import logo from "@/assets/logo/munaseq-logo.svg";
import Link from "next/link";
import Button from "@/components/common/button";
import deco from "@/assets/auth-content-assets/deco.svg";
import LogoLoading from "@/components/common/logo-loading";
import MenuMobile from "@/components/authenticated-content/menu-mobile";

export default function AuthContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className=" flex grid-cols-2">
            <div className="h-screen w-[22rem] lg:block hidden">
                <Menu />
            </div>
            <div className="relative flex-1">
                <header className="flex items-center lg:justify-center  my-10 gap-2">
                    <div className="">
                        <MenuMobile />
                    </div>
                    <Image
                        src={deco}
                        alt="deco"
                        className="absolute -right-32 top-0 -z-10"
                    />
                    <Link href="/">
                        <Image
                            priority
                            className="w-52 xl:block hidden absolute left-0 top-5"
                            src={logo}
                            alt="Munaseq logo"
                        />
                    </Link>
                    <div className="w-3/4 max-w-[500px] min-w-[300px] bg-white rounded-full shadow-md flex items-center p-2">
                        <input
                            placeholder="ابحث عن فعالية"
                            type="text"
                            className="outline-none flex-1 ps-2"
                        />
                        <Button gradient className="px-5 h-8">
                            بحث
                        </Button>
                    </div>
                </header>
                <div className="px-20">{children}</div>
            </div>
        </section>
    );
}
