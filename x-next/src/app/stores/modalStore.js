import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // 'post', 'auth' or 'comment
  modalData: null, // Additional data for the modal if needed

  openModal: (type, data = null) =>
    set({ isOpen: true, modalType: type, modalData: data }),
  closeModal: () => set({ isOpen: false, modalType: null, modalData: null }),
  toggleModal: () =>
    set((state) => ({
      isOpen: !state.isOpen,
      modalType: state.isOpen ? null : state.modalType,
      modalData: state.isOpen ? null : state.modalData,
    })),
}));

export default useModalStore;
