"use client";

import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Comment({ comment, id }) {
  return (
    <div className={`w-full flex p-3 border-b border-gray-100 px-10`}>
      <img
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200 mr-4 
       "
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-md truncate">{comment?.name} </h4>
            <span className="text-sm truncate text-gray-600">
              @{comment?.username}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <p className="text-gray-800 text-xs my-3">{comment?.comment}</p>
      </div>
    </div>
  );
}
