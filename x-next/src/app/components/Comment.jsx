"use client";

import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { app } from "@/firebase";
import {
  onSnapshot,
  collection,
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import useModalStore from "../stores/modalStore";

export default function Comment({ comment, commentId, originalPostId }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment?.likes || []);
  const db = getFirestore(app);
  const { openModal } = useModalStore();

  const likePost = async () => {
    if (!session?.user) {
      openModal("auth"); // Opens Zustand auth modal
      return; // Prevent further execution if not signed in
    }
    if (isLiked) {
      await deleteDoc(
        doc(
          db,
          "posts",
          originalPostId,
          "comments",
          commentId,
          "likes",
          session?.user?.uid
        )
      );
    } else {
      await setDoc(
        doc(
          db,
          "posts",
          originalPostId,
          "comments",
          commentId,
          "likes",
          session.user.uid
        ),
        {
          username: session.user.username,
          timestamp: serverTimestamp(),
        }
      );
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [originalPostId, db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]); //to update properly if the user changes.

  return (
    <div
      className={`w-full flex p-3 border-b border-gray-100 dark:border-gray-700 px-10`}
    >
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
            <span className="text-sm truncate text-gray-600 dark:text-gray-400">
              @{comment?.username}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <p className="text-gray-800 dark:text-gray-200 text-xs my-3">
          {comment?.comment}
        </p>
        <div className="flex items-center">
          {isLiked ? (
            <HiHeart
              onClick={likePost}
              className="h-8 w-8 cursor-pointer rounded-full transition 
        duration-500 ease-in-out p-2 text-red-500 hover:bg-red-100"
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className="h-8 w-8 cursor-pointer rounded-full transition 
        duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
            />
          )}
          {likes.length > 0 && (
            <span
              className={`text-xs text-gray-600 dark:text-gray-400 ${
                isLiked && "text-red-600"
              }`}
            >
              {likes.length > 999
                ? `${(likes.length / 1000).toFixed(1)}k`
                : likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
