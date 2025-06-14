"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/providers/auth";

import Sidebar from "./dashboard/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

//export const metadata: Metadata = {
//title: "Gold Informàtica",
//description: "Loja de periféricos e acessórios de informática",
//};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div className="flex h-full flex-col">
            <AuthProvider>
              <div className="flex overflow-hidden">
                <Sidebar />
                {children}
              </div>
            </AuthProvider>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
