import Feed from "./components/Feed";
import Input from "./components/Input";
import Link from "next/link";

export default function Home({ searchParams }) {
  const tab = searchParams.tab || "foryou";
  return (
    <div className="">
      <div
        className="sticky top-0 z-30 bg-white border-b border-gray-100
      flex justify-between items-center "
      >
        <Link
          href="/?tab=foryou"
          className={`w-1/2 px-4 py-3 hover:bg-gray-200 text-center pb-3 font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
            tab === "foryou"
              ? "border-b-4 border-blue-400 ring-blue-400 text-black"
              : "border-b-4 border-transparent text-gray-500 hover:text-black"
          }`}
        >
          For you
        </Link>

        <Link
          href="/?tab=following"
          className={`w-1/2 px-4 py-3 hover:bg-gray-200 text-center pb-3 font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
            tab === "following"
              ? "border-b-4 border-blue-400 ring-blue-400 text-black"
              : "border-b-4 border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Following
        </Link>
      </div>
      <Input />
      <Feed />
    </div>
  );
}
