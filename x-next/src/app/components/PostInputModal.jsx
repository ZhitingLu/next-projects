"use client";

import React from "react";
import Input from "./Input";

export default function PostInputModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start pt-20 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>
        <Input />
      </div>
    </div>
  );
}
