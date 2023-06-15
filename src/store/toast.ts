import { nanoid } from "nanoid";
import { create } from "zustand";

type ToastState = {
  toasts: ToastProp[];
};

type ToastActions = {
  addToast: (toast: ToastProp) => void;
  removeToast: (toastID: string) => void;
};

type ToastStore = ToastState & ToastActions;

const initialState = {
  toasts: [],
};

export const useToastStore = create<ToastStore>()((set) => ({
  ...initialState,
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: nanoid(), ...toast }],
    })),
  removeToast: (toastID) =>
    set((state) => ({
      toasts: [...state.toasts].filter((toast) => toast.id !== toastID),
    })),
}));
