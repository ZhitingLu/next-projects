"use client";

import { useSession } from "next-auth/react";
import { HiOutlineEmojiHappy, HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineGifBox } from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/firebase";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function Input() {
  const { data: session } = useSession();
  const imagePickRef = useRef(null);
  const textareaRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [text, setText] = useState("");
  const db = getFirestore(app);

  const handleImagePick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (selectedImageFile) {
      uploadImageToStorage();
    }
  }, [selectedImageFile]);

  const uploadImageToStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + selectedImageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedImageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading image:", error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleTextareaResize = (e) => {
    const textarea = e.target;

    textarea.style.height = "auto"; // Reset height to auto to shrink if needed
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight to expand
    setText(e.target.value);
  };

  const handlePostSubmit = async () => {
    setPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      profileImg: session.user.image,
      text: text.trim(),
      image: imageFileUrl || null,
      timestamp: serverTimestamp(),
    });
    setPostLoading(false);
    setText("");
    setImageFileUrl(null);
    setSelectedImageFile(null);
  };

  if (!session) return null;

  return (
    <div className="flex border-b border-gray-100 p-3 space-x-3 w-full">
      <img
        src={session.user.image}
        alt=""
        className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200 "
      />
      <div className="w-full divide-y divide-gray-100 ">
        <textarea
          ref={textareaRef}
          placeholder="What's happening?"
          onInput={handleTextareaResize}
          row={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border-b border-gray-100 outline-none tracking-wide min-h-[50px]
           text-gray-900  text-xl placeholder:text-gray-600 placeholder:text-xl 
           resize-none overflow-hidden pt-2 pb-2"
        ></textarea>
        {selectedImageFile && (
          <img
            src={imageFileUrl}
            alt="Selected"
            className={`mt-2 max-h-60 cursor-pointer object-cover ${imageFileUploading ? "animate-pulse" : ""
              }`}
          />
        )}
        <div className="flex items-center justify-between pt-1.5">
          <div className="flex">
            <HiOutlinePhotograph
              className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full 
            cursor-pointer"
              onClick={() => imagePickRef.current.click()}
            />
            <input
              type="file"
              className="hidden"
              ref={imagePickRef}
              accept="image/*"
              onChange={handleImagePick}
            />
            <MdOutlineGifBox className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <HiOutlineEmojiHappy className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <TbCalendarClock className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <IoLocationOutline className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
          </div>
          <button
            disabled={text.trim() === "" || imageFileUploading || postLoading}
            className="bg-slate-900 text-white px-4 py-1.5 rounded-full font-bold shadow-md not-disabled:cursor-pointer hover:brightness-95 disabled:opacity-50"
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
