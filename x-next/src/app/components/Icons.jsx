"use client";

import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import useModalStore from "../stores/modalStore";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Icons({ id, uid }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const { openModal } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();

  const likePost = async () => {
    if (!session?.user) {
      openModal("auth"); // Opens Zustand auth modal
      return; // Prevent further execution if not signed in
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

  const handleCommentModal = () => {
    if (!session?.user) {
      openModal("auth"); // Opens Zustand auth modal
      return; // Prevent further execution if not signed in
    }
    openModal("comment", { postId: id }); // Opens Zustand comment modal with post ID
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

  const confirmAndDeletePost = (postId) => {
    setShowBackdrop(true);
    toast.custom((t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 bg-white dark:bg-black p-4 rounded-xl max-w-md z-50"
          >
            <h2 className="font-bold text-lg text-slat-900 dark:text-white">
              Delete post?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-200 font-semibold">
              This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={async () => {
                  if (session?.user?.uid !== uid) {
                    toast.error("You can only delete your own posts");
                    return;
                  }
                  try {
                    await deleteDoc(doc(db, "posts", postId));
                    toast.success("Post deleted successfully");
                    setShowBackdrop(false);
                    if (pathname === `/posts/${postId}`) {
                      setTimeout(() => router.push("/"), 1000);
                    }
                  } catch (err) {
                    toast.error("Failed to delete post");
                    setShowBackdrop(false);
                  } finally {
                    toast.dismiss(t.id);
                    setShowBackdrop(false);
                  }
                }}
                className="px-3 py-1 bg-red-600 text-white rounded-full hover:brightness-95 transition-all duration-200 w-full h-11 cursor-pointer shadow-md font-semibold hidden xl:inline"
              >
                Yes, delete it
              </button>
              <button
                onClick={() =>{ toast.dismiss(t.id); setShowBackdrop(false);}}
                className="px-3 py-1 border rounded-full hover:bg-gray-100 text-slate-900 dark:bg-white hover:brightness-95 transition-all duration-200 w-full h-11 cursor-pointer shadow-md font-semibold hidden xl:inline"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ), {
      duration: Infinity,
      position: "top-center",
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db, id]);

  return (
    <>
      {showBackdrop && (
        <div className="fixed inset-0 bg-black/50 dark:bg-gray-400/50 z-50" />
      )}
      <div className="flex justify-start gap-5 text-gray-500 mt-2">
        <div className="flex items-center">
          <HiOutlineChat
            onClick={handleCommentModal}
            className="h-8 w-8 cursor-pointer rounded-full transition 
        duration-500 ease-in-out p-2 hover:text-sky-600 hover:bg-sky-100"
          />
          {comments.length > 0 && (
            <span className={`text-xs text-gray-600 dark:text-gray-300`}>
              {comments.length > 999
                ? `${(comments.length / 1000).toFixed(1)}k`
                : comments.length}
            </span>
          )}
        </div>

        <div className="flex items-center ">
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
              className={`text-xs text-gray-600 dark:text-gray-300 ${
                isLiked && "text-red-600"
              }`}
            >
              {likes.length > 999
                ? `${(likes.length / 1000).toFixed(1)}k`
                : likes.length}
            </span>
          )}
        </div>

        {session?.user?.uid == uid && (
          <HiOutlineTrash
            onClick={() => confirmAndDeletePost(id)}
            className="h-8 w-8 cursor-pointer rounded-full transition 
 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        )}
      </div>
    </>
  );
}
