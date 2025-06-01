import Input from "./components/Input";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto">
      <div
        className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-100
      flex justify-around items-center"
      >
        <div className="text-center ">
          <h2 className="text-xl sm:text-sm font-bold mb-4">For you</h2>
        </div>
        <div className="text-center">
          <h2 className="text-2xl sm:text-sm font-bold mb-4">Following</h2>
        </div>
       
      </div>
      <Input />
    </div>
  );
}
