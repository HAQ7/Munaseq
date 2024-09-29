import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        template: "منسق | %s",
        default: "منسق",
    },
    
    description:
        "منسق هي منصة متكاملة لإدارة الفعاليات التعليمية الحضورية و الالكترونية مثل الدورات و ورش العمل و المحاضرات",
};

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html dir="rtl">
            <body className={rubik.className}>{children}</body>
        </html>
    );
}
