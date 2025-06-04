"use client";

import React, { useEffect, useState } from "react";
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import { deleteDoc, onSnapshot, setDoc } from "firebase/firestore";
import { app } from "@/firebase";
import {
  getFirestore,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

export default function Icons({ id }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const likePost = async () => {
    if (!session?.user) {
      alert("Please sign in to like a post");
      signIn();
    }
    if (isLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
        timestamp: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [id, db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]); //to update properly if the user changes.

  return (
    <div className="flex justify-start gap-5 text-gray-500 mt-2">
      <HiOutlineChat
        className="h-8 w-8 cursor-pointer rounded-full transition 
        duration-500 ease-in-out p-2 hover:text-sky-600 hover:bg-sky-100"
      />
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

      <HiOutlineTrash
        className="h-8 w-8 cursor-pointer rounded-full transition 
        duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
      />
    </div>
  );
}
