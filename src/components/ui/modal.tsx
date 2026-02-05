import {
  FloatingFocusManager,
  FloatingOverlay,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const { context, refs } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    enabled: false,
    outsidePressEvent: "mousedown",
  });
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.dataset.scrollDisabled = "true";
    } else {
      delete document.documentElement.dataset.scrollDisabled;
    }

    return () => {
      delete document.documentElement.dataset.scrollDisabled;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <FloatingOverlay
      lockScroll={true}
      className="bg-black/50 grid place-items-center z-50 md:p-4 p-2"
    >
      <FloatingFocusManager context={context}>
        <div
          ref={refs.setFloating} // eslint-disable-line react-hooks/refs
          {...getFloatingProps()}
          className={`outline-none bg-stone-100 dark:bg-stone-900 p-4 rounded-lg ${className}`}
        >
          <div className="flex items-center justify-end">
            <button
              onClick={() => onClose(false)}
              className="flex items-center justify-center hover:text-red-500 transition-colors duration-200 cursor-pointer outline-none"
              aria-label="Cerrar modal"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  );
};
