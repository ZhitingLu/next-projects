import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // 'post' or 'auth'
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, modalType: null }),
  toggleModal: () =>
    set((state) => ({
      isOpen: !state.isOpen,
      modalType: state.isOpen ? null : state.modalType,
    })),
}));

export default useModalStore;
