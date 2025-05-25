"use client";

import { React, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "@/firebase";
import { formatDistanceToNow } from "date-fns";
import EmojiPicker, { Emoji } from "emoji-picker-react"; // new
import { FaRegSmile } from "react-icons/fa"; // emoji icon button
import useClickOutside from "@/hooks/useClickOutside"; // custom hook to close emoji picker on outside click

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Initialize comments state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker
  const emojiPickerRef = useRef(null); // Ref for the emoji picker

  const db = getFirestore(app); // Initialize Firestore

  // Use the custom hook to close picker on outside click
  useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

  async function handleSubmitComment(e) {
    e.preventDefault();
    // add comment to the firebase db

    // We will add the comment to the "comments" sub-collection of the post
    const commentToPost = comment;

    // Clear the input field quicker
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToPost,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  }

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    // This effect runs when the component mounts or when the session changes
    onSnapshot(
      // /posts/{postId}/comments
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  return (
    <div>
      {comments.length > 0 && (
        <div className="mx-10 max-h-28 overflow-y-scroll border-t border-gray-100">
          {comments.map((comment, id) => (
            <div
              key={id}
              className="flex items-center space-x-2 mb-2 justify-between"
            >
              <img
                src={comment.data().userImage || "/default-avatar-profile.jpg"}
                alt="user image"
                className="h-8 rounded-full object-cover border p-[2px]"
              />
              <p className="text-sm text-gray-500 flex-1 truncate">
                <span className="font-bold mr-2 text-gray-700">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <span className="text-gray-400 text-xs mr-2">
                {comment.data().timestamp && comment.data().timestamp.toDate()
                  ? `${formatDistanceToNow(
                      comment.data().timestamp.toDate()
                    )} ago`
                  : `Just now`}
              </span>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form
          className="flex items-center p-4 gap-2"
          onSubmit={handleSubmitComment}
        >
          <img
            src={session.user.image}
            alt="user image"
            className="h-10 w-10 rounded-full p-[4px] mr-2 object-cover cursor-pointer"
          />
          <FaRegSmile
            className="text-xl cursor-pointer text-gray-500"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-14 left-12 z-20"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <input
            type="text"
            className="border-none flex-1 focus:ring-0 focus:border-none outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            disabled={!comment.trim()}
            type="submit"
            className="font-semibold text-blue-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
