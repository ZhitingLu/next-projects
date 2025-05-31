import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import News from "./components/News";
import SessionWrapper from "./components/SessionWrapper";
import { FiSearch } from "react-icons/fi";
import Subscription from "./components/Subscription";
import FollowSuggestions from "./components/FollowSuggestions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next X",
  description:
    "A clone of X (formerly Twitter) built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex justify-between max-w-7xl mx-auto min-h-screen">
            <div className="hidden sm:flex flex-col border-r border-gray-200 h-screen pr-4">
              <Sidebar />
            </div>

            <div className="flex-grow min-w-0 max-w-[600px] mx-auto">
              {children}
            </div>

            <aside className="hidden lg:flex flex-col w-80 border-l border-gray-200">
              <div className="sticky top-0 bg-white py-2 ">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-200 rounded-3xl bg-white
              text-sm w-full px-4 py-2.5 pl-10 placeholder-gray-700
               placeholder:font-semibold focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                ></input>
              </div>
              <Subscription />
              <FollowSuggestions />
              <News />
            </aside>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
