import * as Toast from "@radix-ui/react-toast";
import { useToastStore } from "@store/toast";
import ToastItem from "./ToastItem";

const Toasts = () => {
  const { toasts } = useToastStore();

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default Toasts;
