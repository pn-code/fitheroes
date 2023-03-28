import "./globals.css";
import { Roboto } from "@next/font/google";
import Navbar from "../components/Navbar";

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body className={`${roboto.className} mx-6`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
