"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "react-modal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function Header() {
  const { data: session } = useSession();
  //   if (session) {
  //     console.log(session);
  //   }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const db = getFirestore(app);
  const [caption, setCaption] = useState("");

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setImageFileUrl(url);
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  async function uploadImageToStorage() {
    setImageFileUploading(true);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }

  async function handleUploadPost() {
    if (!imageFileUrl) return;

    // Here you would typically send the imageFileUrl and caption to your backend
    // to save the post in your database.

    setPostUploading(true);
    await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption,
      profileImg: session.user.image,
      image: imageFileUrl,
      timestamp: serverTimestamp(),
    });
    // Reset states and close modal
    setPostUploading(false);
    setIsOpen(false);
    setCaption("");
    setSelectedFile(null);
    setImageFileUrl(null);
  }

  return (
    <div className="shadow-sm border-b-gray sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <Image src="/instagram-1.svg" width={96} height={96} alt="logo" />
        </Link>

        <Link href="/" className="lg:hidden">
          <Image
            src="/Instagram_icon.png"
            priority
            width={40}
            height={40}
            alt="logo"
          />
        </Link>
        {/* search input */}
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 
          rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />
        {/* menu items */}

        {session ? (
          <div className="flex gap-2 items-center">
            <IoMdAddCircleOutline
              className="text-2xl cursor-pointer transform hover:scale-125
              transition duration-300 hover:text-red-600"
              onClick={() => setIsOpen(true)}
            />
            <img
              src={session.user.image || "/default-avatar-profile.jpg"}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm font-semibold text-blue-500 cursor-pointer"
          >
            Log In
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-1/2 -translate-x-1/2  bg-white 
            border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-full">
            {selectedFile ? (
              <img
                src={imageFileUrl}
                className={`w-full h-100 object-cover cursor-pointer 
                mb-4 rounded-md ${imageFileUploading ? "animate-pulse" : ""}`}
                alt="selected file"
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <HiCamera
                className="text-5xl text-gray-400 cursor-pointer"
                onClick={() => filePickerRef.current.click()}
              />
            )}
            <input
              type="file"
              ref={filePickerRef}
              accept="image/*"
              className="hidden"
              onChange={addImageToPost}
            />
          </div>

          <input
            type="text"
            maxLength="150"
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
            placeholder="Please enter your caption..."
            onChange={(e) => setCaption(e.target.value)}
          />
          <button
            onClick={handleUploadPost}
            disabled={
              !selectedFile ||
              caption.trim() === "" ||
              postUploading ||
              imageFileUploading
            }
            className="w-full bg-red-600 text-white p-2 cursor-pointer rounded-lg shadow-md hover:brightness-105 disabled:bg-gray-200 
                disabled:hover:brightness-100 disabled:cursor-not-allowed"
          >
            Upload Post
          </button>
          <AiOutlineClose
            className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
