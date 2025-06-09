import { Geist, Geist_Mono } from "next/font/google";
import FollowSuggestions from "./components/FollowSuggestions";
import News from "./components/News";
import SearchBar from "./components/SearchBar";
import SessionWrapper from "./components/SessionWrapper";
import Sidebar from "./components/Sidebar";
import Subscription from "./components/Subscription";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthModal from "./components/AuthModal";
import PostInputModal from "./components/PostInputModal";
import CommentModal from "./components/CommentModal";

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
          <Toaster />
          <AuthModal />
          <PostInputModal />
          <CommentModal />

          <div className="flex justify-between max-w-7xl mx-auto min-h-screen px-4 sm:px-0 lg:px-8">

            <div className="hidden sm:flex w-16 xl:w-[280px] border-r border-gray-100 flex-col h-screen sticky top-0">
              <Sidebar />
            </div>

            <div className="flex-grow min-w-0 max-w-[600px] mx-auto border-r border-gray-100 w-2xl flex-1" >
              {children}
            </div>

            <div className="hidden lg:flex flex-col gap-3 w-[22rem] h-screen pl-4">
              <SearchBar />
              <Subscription />
              <FollowSuggestions />
              <News />
            </div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
