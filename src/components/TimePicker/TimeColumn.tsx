import React, { useRef, useEffect } from 'react';
import { cn, scrollToSelected } from '../../utils/domUtils';

export interface TimeColumnItem {
  label: string;
  value: number | string;
  disabled?: boolean;
}

export interface TimeColumnProps {
  items: TimeColumnItem[];
  selectedValue?: number | string;
  onSelect: (value: number | string) => void;
}

export const TimeColumn: React.FC<TimeColumnProps> = ({
  items,
  selectedValue,
  onSelect,
}) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const selectedRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      scrollToSelected(containerRef.current, selectedRef.current, false);
    }
  }, [selectedValue]);

  return (
    <ul className="adp-time-column" ref={containerRef}>
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        return (
          <li
            key={item.value}
            ref={isSelected ? selectedRef : undefined}
            className={cn(
              'adp-time-cell',
              isSelected && 'adp-time-cell-selected',
              item.disabled && 'adp-time-cell-disabled'
            )}
            onClick={() => {
              if (!item.disabled) {
                onSelect(item.value);
              }
            }}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};
