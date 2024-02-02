import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/navBar/NavBar";
import AuthContainer from "./ui/AuthContainer";
import TopLoading from "./ui/TopLoading";

const vazirmatn = Vazirmatn({ subsets: ["latin", "arabic", "latin-ext"] });

export const metadata: Metadata = {
  title: "Priority Manager",
  description: "Priority manager",
  manifest: "manifest.json",
};
export const viewport: Viewport = {
  themeColor: "#faf7f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={vazirmatn.className}>
        <AuthContainer>
          <TopLoading>
            <NavBar />
            {children}
          </TopLoading>
        </AuthContainer>
        <div id="page-bottom" />
      </body>
    </html>
  );
}
