'use client';

import React from "react";
import { createPortal } from "react-dom";
import useModalStore from "../stores/modalStore";
import { signIn } from "next-auth/react";

export default function AuthModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.modalType);

  // If modal is not open or it's not 'auth', return null to avoid rendering
  if (!isOpen || modalType !== "auth") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-gray-800/30 ">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
          Please sign in to continue
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            className="bg-black text-white rounded-full px-6 py-2 font-semibold hover:brightness-95 transition duration-200 w-[200px] max-w-full cursor-pointer"
            onClick={() => {
              closeModal();
              signIn();
            }}
          >
            Sign In
          </button>
          <button
            className="border rounded-full px-6 py-2 font-semibold hover:bg-gray-100 transition duration-200 cursor-pointer text-slate-900 w-[200px] max-w-full"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,

    document.body
  );
}
