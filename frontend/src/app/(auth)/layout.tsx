import Image from "next/image";
import strange from "@/assets/auth-assets/strange.svg";
import rightDeco from "@/assets/auth-assets/right-deco.png";
import leftDeco from "@/assets/auth-assets/left-deco.png";
import rightGlow from "@/assets/auth-assets/right-glow.png";
import leftGlow from "@/assets/auth-assets/left-glow.png";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'التسجيل'
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <>
            <div className="absolute overflow-hidden w-screen h-screen -z-10">
                <Image
                    alt="deco"
                    src={strange}
                    priority
                    className="absolute w-screen h-screen scale-125 lg:block hidden "
                />
                <Image
                    alt="deco"
                    src={rightDeco}
                    priority
                    className="fixed bottom-0 right-0"
                />
                <Image
                    alt="deco"
                    src={leftDeco}
                    priority
                    className="fixed top-0 left-0"
                />
                <Image
                    alt="deco"
                    src={rightGlow}
                    priority
                    className="fixed top-0 right-0"
                />
                <Image
                    alt="deco"
                    src={leftGlow}
                    priority
                    className="fixed bottom-0 left-0"
                />
            </div>
            <section className="w-screen min-h-screen grid place-items-center overflow-hidden">
                {children}
            </section>
        </>
    );
}
