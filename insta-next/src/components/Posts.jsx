"use client";

import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot, // Use onSnapshot for real-time updates
} from "firebase/firestore";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  // This component will fetch and display posts.
  const db = getFirestore(app);
  // const querySnapshot = await getDocs(q); // getDocs() is a one-time fetch
  // Use onSnapshot instead of getDocs
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    // real-tiem listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(updatedPosts);
    });

    return () => {
      // Cleanup the listener on unmount
      unsubscribe();
    };
  }, [db]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
