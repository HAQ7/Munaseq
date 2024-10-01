import Menu from "@/components/authenticated-content/menu";
import LogoLoading from "@/components/common/logo-loading";

export default function AuthContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="w-screen flex grid-cols-2">
            <div className="h-screen w-80">
                <Menu />
            </div>
            <div className="relative flex-1">
                {children}
            </div>
        </section>
    );
}
