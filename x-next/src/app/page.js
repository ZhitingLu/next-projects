import Input from "./components/Input";

export default function Home({ searchParams }) {
  const tab = searchParams.tab || "foryou";
  return (
    <div className="max-w-xl mx-auto">
      <div
        className="sticky top-0 z-50 bg-white border-b border-gray-100
      flex justify-between items-center "
      >
         <a
            href="/?tab=foryou"
            className={`w-1/2 px-4 py-3 hover:bg-gray-200 text-center pb-3 font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
              tab === "foryou"
                ? "border-b-4 border-blue-400 text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            For you
          </a>
      
         <a
            href="/?tab=following"
            className={`w-1/2 px-4 py-3 hover:bg-gray-200 text-center pb-3 font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
              tab === "following"
                ? "border-b-4 border-blue-400 text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Following
          </a>
       
      </div>
      <Input />
    </div>
  );
}
