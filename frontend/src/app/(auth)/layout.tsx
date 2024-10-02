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
        <div className="grid place-items-center overflow-hidden">
            <div className="absolute overflow-hidden -z-10">
                <Image
                    alt="deco"
                    src={strange}
                    priority
                    className="fixed w-screen h-screen scale-125 lg:block hidden top-0 right-0"
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
            <section className="min-h-screen grid place-items-center">
                {children}
            </section>
        </div>
    );
}
