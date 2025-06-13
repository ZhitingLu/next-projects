"use client";
import React, { useEffect, useState } from "react";
import { app } from "@/firebase";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Comment from "./Comment";

export default function Comments({ id }) {
  const db = getFirestore(app);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      }
    );
  }, [db, id]);

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} id={comment.id} />
        ))
      ) : (
        <div className="text-center py-4">No comments yet</div>
      )}
    </div>
  );
}
