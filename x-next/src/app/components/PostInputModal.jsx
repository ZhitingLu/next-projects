"use client";

import React from "react";
import { createPortal } from "react-dom";
import Input from "./Input";
import useModalStore from "../stores/modalStore";

export default function PostInputModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  // If modal is not open, return null to avoid rendering
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start pt-20 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-4 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
        >
          ×
        </button>
        <Input />
      </div>
    </div>,
    document.body
  );
}
