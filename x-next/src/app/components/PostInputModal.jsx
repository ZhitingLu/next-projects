"use client";

import React, { useRef } from "react";
import { createPortal } from "react-dom";
import Input from "./Input";
import useModalStore from "../stores/modalStore";
import useOutsideClick from "@/lib/hooks/useOutsideClick";

export default function PostInputModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.modalType);
  const modalRef = useRef();

  useOutsideClick(modalRef, closeModal);

  // If modal is not open or it's not 'post', return null to avoid rendering
  if (!isOpen || modalType !== "post") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-gray-900/30 flex justify-center items-start pt-20 px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg max-w-xl w-full p-4 relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-800 hover:text-gray-800 text-2xl cursor-pointer rounded-full hover:bg-gray-200 w-10 h-10"
        >
          ×
        </button>
        <Input />
      </div>
    </div>,
    document.body
  );
}
