import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import NavBar from "./navBar/NavBar";
import AuthContainer from "./AuthContainer";
import TopLoading from "./components/TopLoading";

const vazirmatn = Vazirmatn({ subsets: ["latin", "arabic", "latin-ext"] });

export const metadata: Metadata = {
  title: "Priority Manager",
  description: "Priority manager with time management",
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
