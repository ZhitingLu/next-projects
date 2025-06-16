"use client";

import { app } from "@/firebase";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { PiCat } from "react-icons/pi";
import { TbCalendarClock } from "react-icons/tb";
import useModalStore from "../stores/modalStore";
import EmojiPicker from "emoji-picker-react";
import useOutsideClick from "@/lib/hooks/useOutsideClick";

export default function Input({
  placeholder = "What's happening?",
  buttonText = "Post",
  commentStyle = false,
  replyTo = null, // Optional prop for replying to a post
  onSubmit = null, // Optional prop for custom submit handler
}) {
  const { data: session } = useSession();
  const imagePickRef = useRef(null);
  const textareaRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [text, setText] = useState("");
  const db = getFirestore(app);
  const closeModal = useModalStore((state) => state.closeModal);
  const router = useRouter();
  const pathname = usePathname();
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  // Close emoji picker when clicking outside
  useOutsideClick(emojiPickerRef, () => setShowEmojiPicker(false));

  const handlePostSubmit = async () => {
    try {
      setPostLoading(true);
      if (onSubmit) {
        await onSubmit(text, imageFileUrl, replyTo);
      } else {
        // Default behavior: create new post
        await addDoc(collection(db, "posts"), {
          uid: session.user.uid,
          name: session.user.name,
          username: session.user.username,
          profileImg: session.user.image,
          text: text.trim(),
          image: imageFileUrl || null,
          timestamp: serverTimestamp(),
          replyTo: replyTo || null, // Optional: add reply target
        });
      }

      setText("");
      setImageFileUrl(null);
      setSelectedImageFile(null);
      closeModal(); // Close the modal
      if (replyTo) {
        // Comment: just refresh the page
        router.refresh();
      } else {
        // New post: go to home if not already there
        if (pathname !== "/") {
          router.push("/");
        } else {
          router.refresh();
        }
      }
      toast.success(successToastMsg);
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setPostLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div
      className={`flex ${
        commentStyle
          ? "pt-3 px-3 pb-0"
          : "border-b border-gray-100 dark:border-gray-700 p-3"
      } space-x-3 sm:left-auto 
                sm:right-0 w-[90vw] sm:w-auto`}
    >
      <img
        src={session.user.image}
        alt=""
        className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200 "
      />
      <div className="w-full ">
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          onInput={handleTextareaResize}
          row={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full outline-none tracking-wide min-h-[60px]
           text-gray-900 dark:text-gray-300 text-xl placeholder:text-gray-600 dark:placeholder:text-gray-400 placeholder:text-xl 
           resize-none overflow-hidden pt-2 pb-2"
        ></textarea>

        {selectedImageFile && (
          <img
            src={imageFileUrl}
            alt="Selected"
            className={`mt-2 w-full max-w-[90%] max-h-[300px] object-contain rounded-lg cursor-pointer ${
              imageFileUploading ? "animate-pulse" : ""
            }`}
          />
        )}
        <div className="flex items-center justify-between pt-1.5 w-full">
          <div className="flex relative">
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

            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="
      absolute z-50 top-full left-1/2 transform -translate-x-1/2
      w-[90vw] max-w-xs
      max-h-[300px] sm:w-auto sm:max-w-md sm:max-h-[400px]
      overflow-auto rounded-lg shadow-lg 
    "
              >
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  skinTonesDisabled
                  height="auto"
                  width="100%"
                />
              </div>
            )}

            <PiCat
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
            />
            <TbCalendarClock className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <IoLocationOutline className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
          </div>
          <button
            disabled={text.trim() === "" || imageFileUploading || postLoading}
            className="bg-slate-900 dark:bg-gray-700 text-white px-4 py-1.5 rounded-full font-bold shadow-md not-disabled:cursor-pointer hover:brightness-95 disabled:opacity-50"
            onClick={handlePostSubmit}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
