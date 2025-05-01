import React, { Suspense } from "react";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
  return (
    <div
      className="flex gap-6 bg-amber-100 dark:bg-gray-700 
    p-4 lg:text-lg justify-center"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <NavBarItem title="Trending" param="fetchTrending" />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBarItem title="Top Rated" param="fetchTopRated" />
      </Suspense>
    </div>
  );
}
