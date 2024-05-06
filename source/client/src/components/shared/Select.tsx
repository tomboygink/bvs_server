import React, {
  FC,
  useState,
  useRef,
  useEffect,
  MouseEventHandler,
} from "react";

import { Option } from "./Option";

type TOption = { label: string; value: string };
interface Props {
  selected: TOption | null;
  options: TOption[];
  placeholder?: string;
  mode?: "rows" | "cells";
  status?: "default" | "invalid";
  onChange?: (selected: TOption["value"]) => void;
  onClose?: () => void;
}
export const Select: FC<Props> = (props: Props) => {
  const {
    mode = "rows",
    options,
    placeholder,
    status = "default",
    selected,
    onChange,
    onClose,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleClick = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };

    placeholderEl.addEventListener("keydown", handleClick);

    return () => {
      placeholderEl.removeEventListener("keydown", handleClick);
    };
  }, []);
  const handleOptionClick = (value: TOption["value"]) => {
    setIsOpen(false);
    onChange?.(value);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className="select"
      ref={rootRef}
      data-is-active={isOpen}
      data-mode={mode}
    >
      <div className="arrow">↓</div>
      <div
        ref={placeholderRef}
        className="placeholder"
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role="button"
        tabIndex={0}
      >
        {selected?.label || placeholder}
      </div>
      {isOpen && (
        <ul className="list">
          {options.map((option) => (
            <Option
              key={option.value}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
