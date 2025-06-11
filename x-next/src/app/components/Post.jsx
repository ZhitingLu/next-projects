import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import Icons from "./Icons";

export default function Post({ post, id, hideIcons = false, noBorder = false }) {
  return (
    <div className={`w-full flex p-3 ${noBorder ? '' : 'border-b border-gray-200'} hover:bg-gray-50`}>
      <img
        src={post?.profileImg}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200 mr-4 
       "
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-md truncate">{post?.name} </h4>
            <span className="text-xs truncate">@{post?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <Link href={`/posts/${id}`}>
          <p className="text-slate-800 text-sm my-3 whitespace-normal break-words">
            {post?.text}{" "}
          </p>
        </Link>

        <Link href={`/posts/${id}`}>
          <img
            src={post?.image}
            alt=""
            className="rounded-2xl mr-2 max-w-full h-auto"
          />
        </Link>
        {!hideIcons && <Icons id={id} uid={post.uid} />}
      </div>
    </div>
  );
}
