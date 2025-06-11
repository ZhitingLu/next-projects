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
          className="flex bg-white rounded-xl shadow-lg max-w-xl w-full px-4 pt-4 pb-2 border-gray-100 relative"
        >
          <div className="">
            <button
              onClick={closeModal}
              className="absolute top-3 left-4 text-gray-800 hover:text-gray-800 text-2xl cursor-pointer rounded-full hover:bg-gray-200 w-10 h-10 "
            >
              ×
            </button>
            <span className="absolute top-3 right-4 text-blue-400 text-1xl font-bold cursor-pointer rounded-full hover:bg-blue-100 px-3 py-1">Drafts</span>
          </div>
          <div className="mt-10 flex flex-col w-full">
            <div className="relative">
              {post && <Post post={post} id={postId} hideIcons commentStyle noLink hideImg />}


              {/* Vertical line positioned absolutely relative to post */}
              <div className="absolute bg-gray-300 left-[2.1rem] w-0.5" style={{ top: "4rem", bottom: 0 }} />
              <div className="flex pl-16 mt-3">
                {post?.image && (
                  <img
                    src={post.image}
                    alt="Post preview"
                    className="h-14 w-14 rounded-lg object-cover border border-gray-300"
                  />
                )}
              </div>
            </div>
            <Input
              placeholder="Post your reply"
              buttonText="Reply"
              replyTo={postId} // Pass postId to Input component
              commentStyle
            />
          </div>

        </div>
      </div>
    </>
  );
}
