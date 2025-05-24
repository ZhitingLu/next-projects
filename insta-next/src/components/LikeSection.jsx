"use client";

import { React, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "@/firebase";

export default function LikeSection({ id }) {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app); // Initialize Firestore

  // any likes change, we will call the useEffect hook
  useEffect(() => {
    // get the likes from the db
    //onSnapshot sets up a real-time listener to the Firestore db
    // It returns a function that, when called,
    // removes that listener.
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return () => unsubscribe(); // Clean up when component unmounts
  }, [id]);

  // Check if the current logged-in user has already liked the post
  useEffect(() => {
    // Compare the id of the like
    // (usually the user ID of the person who liked the post)
    if (likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
      // if the logged-in user's UID is in that list.
      // If it is, set hasLiked to true;
      setHasLiked(true);
    } else {
      setHasLiked(false); // otherwise, false.
    }
  }, [likes]);

  return (
    <div>
      {session && <div className="flex border-t border-gray-100"></div>}
    </div>
  );
}
