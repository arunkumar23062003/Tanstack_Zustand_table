import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topnavbar from "@/components/navbar/topnavbar";
import SideNavbar from "@/components/navbar/sidenavbar";
import Provider from "@/query-client/provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tanstack table",
  description: "tanstack table,react query and zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full h-full flex flex-row items-center justify-center`}>
        <Provider>
          <div className="h-full">
            <SideNavbar />
          </div>
          <div className="flex-1 h-full">
            <Topnavbar />
            <div className="w-full h-[95%] p-2 bg-blue-50">
              <div className="w-full h-[100%] shadow-sm">{children}</div>
            </div>
          </div>
        </Provider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
