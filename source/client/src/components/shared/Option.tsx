import React, { MouseEventHandler, useRef, useEffect } from "react";

type TOption = { label: string; value: string };
type OptionProps = {
  option: TOption;
  onClick: (value: TOption["value"]) => void;
};
export const Option = (props: OptionProps) => {
  const {
    option: { value, label },
    onClick,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: TOption["value"]): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };
  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;

    const handleEnterPress = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === "Enter") {
        onClick(value);
      }
    };

    option.addEventListener("keydown", handleEnterPress);

    return () => {
      option.removeEventListener("keydown", handleEnterPress);
    };
  }, [value, onClick]);
  return (
    <li
      ref={optionRef}
      className="option"
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
    >
      {label}
    </li>
  );
};
