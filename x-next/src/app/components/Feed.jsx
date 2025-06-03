// Server Component
// for initial feed render (SEO-friendly)
import React from "react";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "@/firebase";
import FeedWrapper from "./FeedWrapper";

export default async function Feed() {
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const initialPosts = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      // Convert Firestore timestamp to ISO string or milliseconds
      timestamp: data.timestamp ? data.timestamp.toDate().toISOString() : null,
    };
  });
  return <FeedWrapper initialPosts={initialPosts} />;
}
