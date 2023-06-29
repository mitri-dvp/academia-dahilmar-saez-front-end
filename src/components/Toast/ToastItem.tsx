import { useEffect } from "react";
import { CrossSVG } from "@components/SVG";
import * as Toast from "@radix-ui/react-toast";
import { useToastStore } from "@store/toast";

const ToastItem: ({ toast }: { toast: ToastProp }) => JSX.Element = ({
  toast,
}) => {
  const { removeToast } = useToastStore();

  useEffect(() => {
    const toastID = toast.id as string;
    const timer = setTimeout(() => {
      removeToast(toastID);
    }, 5300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Toast.Root className="ToastRoot" duration={5000}>
      <div>
        <div className="font-semibold">{toast.title}</div>
        <div>{toast.description}</div>
      </div>

      <Toast.Close className="ToastAction" asChild>
        <button className="h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-gray-700">
          <CrossSVG className="h-full w-full" />
        </button>
      </Toast.Close>
    </Toast.Root>
  );
};

export default ToastItem;
