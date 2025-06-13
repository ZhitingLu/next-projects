// asynchronous
// server side

import React from "react";
import { app } from "../../../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import Post from "@/app/components/Post";

export default async function PostPage({ params }) {
  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, "posts", params.id));
  data = querySnapshot.exists()
    ? { id: querySnapshot.id, ...querySnapshot.data() }
    : null;
  if (!data) {
    return <div>Post not found</div>;
  }
  // You can pass the data to a component or render it directly here
  // For example, you can use a Post component to display the post
  return (
    <div className="max-w-xl max-auto min-h-screen">
      <div className="flex items-center py-3 px-3 sticky top-0 z-40 bg-white border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 sm:text-lg">
          <HiArrowLeft className="h-5 w-5" />
          Back to Feed
        </Link>
      </div>
      <Post
        post={data}
        id={data.id}
        hideIcons={false}
        commentStyle={false}
        noLink={false}
        hideImg={false}
      />
    </div>
  );
}
