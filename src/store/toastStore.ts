import create from "zustand";

export type ToastType = "info" | "error";

export interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastStoreState {
    toasts: ToastItem[]; //여러개의 토스트가 한번에 뜰 수도 있기 때문에 배열로
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: number) => void;
}

const useToastStore = create<ToastStoreState>((set) => ({
    toasts: [],
    addToast: (message, type = "info") => {
        set((state) => ({
            toasts: [...state.toasts, { message, type, id: Date.now() }],
        }));
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },
}));

export default useToastStore;
