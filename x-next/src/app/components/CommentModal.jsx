"use client";

import useOutsideClick from "@/lib/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import useModalStore from "../stores/modalStore";
import Input from "./Input";
import Post from "./Post";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/firebase";

export default function CommentModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.modalType);
  const modalData = useModalStore((state) => state.modalData);
  const postId = modalData?.postId; // Extract postId from modalData

  const [post, setPost] = useState(null); // State to hold the post data
  const modalRef = useRef();
  const db = getFirestore(app);

  useOutsideClick(modalRef, closeModal);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const docRef = doc(db, "posts", postId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPost({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.error("No such post!");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      fetchPost();
    }
  }, [postId, db]);

  // If modal is not open or it's not 'post', return null to avoid rendering
  if (!isOpen || modalType !== "comment") return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-900/30 flex justify-center items-start pt-20 px-4">
        <div
          ref={modalRef}
          className="bg-white rounded-xl shadow-lg max-w-xl w-full p-4 relative"
        >
          <div className="">
          <button
            onClick={closeModal}
            className="absolute top-3 left-4 text-gray-800 hover:text-gray-800 text-2xl cursor-pointer rounded-full hover:bg-gray-200 w-10 h-10 "
          >
            ×
          </button>
          <span className="absolute top-3 right-4 text-blue-400 text-1xl font-bold cursor-pointer rounded-full hover:bg-blue-100 px-3 py-1">Draft</span>
          </div>
          <div className="mt-10">
          {post && <Post post={post} id={postId} hideIcons />}
          <Input
            placeholder="Post your reply"
            buttonText="Reply"
            replyTo={postId} // Pass postId to Input component
          />
          </div>
          
        </div>
      </div>
    </>
  );
}
