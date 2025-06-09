"use client";

import useModalStore from "../stores/modalStore";

export default function CommentModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.modalType);

  // If modal is not open or it's not 'post', return null to avoid rendering
  if (!isOpen || modalType !== "comment") return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-800/30 z-40" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
          {/* Your comment form or content goes here */}
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            placeholder="Write your comment..."
          />
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
