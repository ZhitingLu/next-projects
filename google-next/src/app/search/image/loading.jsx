import React from "react";

export default function loading() {
  return (
    <div className="mx-2 pt-10 lg:pl-52 max-w-6xl flex sm:space-x-4 flex-col sm:flex-row pb-42 items-center">
      <div className="animate-pulse">
        <div className="h-48 w-48 mb-5 bg-gray-200 rounded-md"></div>
        <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
        <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
      </div>

      <div className="sm:inline-flex sm:space-x-4">
        <div className="animate-pulse">
          <div className="h-48 w-48 mb-5 bg-gray-200 rounded-md"></div>
          <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
          <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      <div className="">
        <div className="animate-pulse">
          <div className="h-48 w-48 mb-5 bg-gray-200 rounded-md"></div>
          <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
          <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
