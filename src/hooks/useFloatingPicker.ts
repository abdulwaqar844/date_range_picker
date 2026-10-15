import { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
} from '@floating-ui/react';
import type { PickerPlacement } from '../types';

function mapPlacement(placement?: PickerPlacement): Placement {
  switch (placement) {
    case 'bottomRight':
      return 'bottom-end';
    case 'topLeft':
      return 'top-start';
    case 'topRight':
      return 'top-end';
    case 'bottomLeft':
    default:
      return 'bottom-start';
  }
}

interface UseFloatingPickerOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PickerPlacement;
  disabled?: boolean;
}

export function useFloatingPicker({
  open: controlledOpen,
  onOpenChange,
  placement = 'bottomLeft',
  disabled = false,
}: UseFloatingPickerOptions) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled && nextOpen) return;
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement: mapPlacement(placement),
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ fallbackAxisSideDirection: 'end', padding: 8 }),
      shift({ padding: 8 }),
    ],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

  return {
    isOpen,
    setIsOpen: handleOpenChange,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  };
}
