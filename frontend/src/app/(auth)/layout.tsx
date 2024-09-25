import type { Metadata } from "next";
import { Rubik } from "next/font/google";

export const metadata: Metadata = {
    title: "منسق",
    description: "منسق هي منصة متكاملة لإدارة الفعاليات التعليمية الحضورية و الالكترونية مثل الدورات و ورش العمل و المحاضرات",
};

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" dir="rtl">
            <body className={rubik.className}>{children}</body>
        </html>
    );
}
