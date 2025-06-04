import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import Icons from "./Icons";

export default function Post({ post, id }) {
  return (
    <div className="w-full flex p-3 border-b border-gray-200 hover:bg-gray-50">
      <img
        src={post?.profileImg}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200 mr-4
       "
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{post?.name} </h4>
            <span className="text-xs truncate">@{post?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <Link href={`/posts/${id}`}>
          <p className="text-gray-800 text-sm my-3">{post?.text} </p>
        </Link>

        <Link href={`/posts/${id}`}>
          <img src={post?.image} alt="" className="rounded-2xl mr-2" />
        </Link>
        <Icons id={id} />
      </div>

    </div>
  );
}
