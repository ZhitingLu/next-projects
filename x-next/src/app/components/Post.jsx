import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import Icons from "./Icons";
import { formatTimestamp } from "@/lib/hooks/formatTimestamp";

export default function Post({
  post,
  id,
  hideIcons = false,
  commentStyle = false,
  noLink = false,
  hideImg = false,
}) {
  const displayTime = formatTimestamp(post?.timestamp);

  return (
    <div
      className={`w-full flex p-3 ${
        commentStyle
          ? ""
          : "border-b border-gray-200 dark:border-gray-700 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      } `}
    >
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
            <span className="text-sm truncate text-gray-600 dark:text-gray-400">
              @{post?.username}
            </span>
            {commentStyle && displayTime && (
              <span className="text-sm text-gray-600 dark:text-gray-400 w-2">·{displayTime}</span>
            )}
          </div>
          {!commentStyle && (
            <HiDotsHorizontal className="text-sm text-gray-600 dark:text-gray-400" />
          )}
        </div>

        {noLink ? (
          <p className="text-slate-800 hover:text-black dark:text-gray-200 dark:hover:text-white text-sm my-3 whitespace-normal break-words">
            {post?.text}{" "}
          </p>
        ) : (
          <Link href={`/posts/${id}`}>
            <p className="text-slate-800 dark:text-gray-200  text-sm my-3 whitespace-normal break-words">
              {post?.text}{" "}
            </p>
          </Link>
        )}

        {!hideImg && (
          <Link href={`/posts/${id}`}>
            <img
              src={post?.image}
              alt=""
              className="rounded-2xl mr-2 max-w-full h-auto"
            />
          </Link>
        )}

        {!hideIcons && <Icons id={id} uid={post.uid} />}
      </div>
    </div>
  );
}
