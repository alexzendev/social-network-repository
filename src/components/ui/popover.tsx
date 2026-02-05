import { useState, useRef } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";

interface PopoverProps {
  readonly trigger: React.ReactNode;
  readonly children: React.ReactNode;
  readonly offsetValue?: number;
  readonly showArrow?: boolean;
  readonly className?: string;
  readonly onOpenChange?: (open: boolean) => void;
  readonly open?: boolean;
  readonly placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
}

export default function Popover({
  trigger,
  children,
  offsetValue = 2,
  showArrow = false,
  className = "",
  onOpenChange,
  open: controlledOpen,
  placement,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = controlledOpen ?? internalOpen;

  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (controlledOpen === undefined) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    placement: placement,
    middleware: [
      offset(offsetValue),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {trigger}
      </div>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className={`z-50 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 ${className}`}
            >
              {children}

              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className=" fill-stone-100 dark:fill-stone-900 [&>path:first-of-type]:stroke-stone-300 dark:[&>path:first-of-type]:stroke-stone-700"
                />
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
