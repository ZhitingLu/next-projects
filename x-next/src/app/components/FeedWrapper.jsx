// FeedWrapper.jsx (Client Component)
// Real-time updates with Firestore
// Automatically reacts to data changes
"use client";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./Post";

export default function FeedWrapper({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} id={post.id} />
      ))}
    </div>
  );
}
