"use client";

import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "../firebase";
import toast from "react-hot-toast";

export default function Post({ post }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const db = getFirestore(app);

  const handleDeletePost = async () => {
    try {
      await deleteDoc(doc(db, "posts", post.id));
      setDropdownOpen(false);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post: ", error);
      toast.error("Failed to delete the post");
    }
  };



  return (
    <div className="bg-white my-7 border rounded-md relative">
      <div className="flex items-center p-5 border-b border-gray-100">
        <img
          src={post.profileImg}
          alt={post.username}
          className="h-12 rounded-full object-cover 
        border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{post.username} </p>
        <HiOutlineDotsVertical
          className="h-5 w-5 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      </div>

      {dropdownOpen && (
        <div className="absolute right-5 top-16 bg-white border rounded-md shadow-lg z-10">
          <button
            className="text-red-500 text-sm hover:bg-red-50 px-4 py-2 w-full text-left cursor-pointer rounded"
            onClick={handleDeletePost}
          >
            Delete post
          </button>
        </div>
      )}

      <div className="">
        <img
          src={post.image}
          alt={post.caption}
          className="object-cover w-full"
        />
        <LikeSection id={post.id} />
        <p className="p-5 truncate">
          <span className="font-bold mr-2">{post.username} </span>
          {post.caption}
        </p>
        <CommentSection id={post.id} />
      </div>
    </div>
  );
}
