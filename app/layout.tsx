"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Search as CustomSearch } from "@/components/ui/search";

import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EVENTUM" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/icons/e.ico" type="image/x-icon" />
        <title>EVENTUM</title>
      </head>
      <body className={montserrat.className}>
        <div className="max-w-md mx-auto min-h-screen w-full bg-gradient-to-br from-pink-200 via-pink-300 to-pink-200">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white opacity-20 pointer-events-none"></div>
          {/* Header */}
          <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/" className="font-semibold text-xl">
                  EVENTUM
                </Link>
                <div className="flex items-center text-sm text-gray-600">
                  <span>Москва</span>
                </div>
              </div>
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Меню</SheetTitle>
                  </SheetHeader>
                  <nav className="mt-4">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/"
                          className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Главная
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/map"
                          className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Карта
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/faq"
                          className="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Search Bar */}
            <div className="px-4 pb-3">
              <div className="relative">
                <CustomSearch />
              </div>
            </div>
          </header>

          <div className="mt-4 backdrop-blur-sm bg-transparent">{children}</div>

          <style jsx global>{`
            * {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            *::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            html {
              scroll-behavior: smooth;
            }
          `}</style>
        </div>
      </body>
    </html>
  );
}
