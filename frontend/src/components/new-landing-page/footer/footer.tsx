import waveTop from "@/assets/new-landing-assets/features/wave-top.png";
import deco from "@/assets/new-landing-assets/features/top-right-deco.png";
import logo from "@/assets/logo/munaseq-logo-white.svg";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="pt-10 overflow-hidden relative">
            <Image
                src={waveTop}
                className="w-screen z-10 relative"
                alt="wave top"
            />
            <Image src={deco} className="absolute right-0 top-0" alt="deco" />
            <div className="bg-gradient-to-r to-[#AE00FE] from-[#652BB7] w-screen grid place-items-center z-10 relative py-10 gap-10">
                <Image className="w-40" src={logo} alt="Icon" />
                <p className="text-white">
                    جميع الحقوق محفوظة منصة منسق 2024 ©
                </p>
            </div>
        </footer>
    );
}
