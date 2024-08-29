import React, { useEffect, useRef, useState } from "react";
import type { Option, SelectProps } from "./model";
import { IoIosArrowDown } from "react-icons/io";
import SelectItem from "./item";
import { cn } from "../../lib/utils";

const Select: React.FC<SelectProps> = ({
  options,
  label,
  helperText,
  onChange,
  icon,
  showItemIcon = false,
  placeholder = "Select an option",
  variant = "default",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option[] | null>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      console.log("clicked outside");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    if (variant === "chipList") {
      const newSelectedOptions = selectedOption
        ? [...selectedOption, option]
        : [option];
      setSelectedOption(newSelectedOptions);
      onChange(newSelectedOptions.map((opt) => opt.value).join(", "));
    } else {
      setSelectedOption([option]);
      setIsOpen(false);
      onChange(option.value);
    }
  };

  const handleChipRemove = (optionToRemove: Option) => {
    if (!selectedOption) return;
    const newSelectedOptions = selectedOption.filter(
      (opt) => opt.value !== optionToRemove.value
    );
    setSelectedOption(newSelectedOptions);
    onChange(newSelectedOptions?.map((opt) => opt.value).join(", "));
  };

  return (
    <div ref={ref} className="min-w-80 relative">
      {label && (
        <div className="pb-1">
          <label className="text-sm text-primary font-medium">{label}</label>
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between gap-x-2 border border-secondary rounded-lg px-3 py-2",
          {
            "border-focus shadow-focus": isOpen,
          }
        )}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleDropdown();
          }
        }}
      >
        <div className="flex items-center gap-x-2 flex-wrap">
          {icon && <div>{icon}</div>}
          {variant === "chipList" && selectedOption ? (
            selectedOption.map((option) => (
              <div
                key={option.value}
                className="bg-gray-200 rounded-full px-2 py-1 text-sm mr-1 mb-1"
              >
                {option.label}
                <button
                  onClick={() => handleChipRemove(option)}
                  className="ml-1"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <span className="text-placeholder">
              {selectedOption ? selectedOption[0].label : placeholder}
            </span>
          )}
        </div>
        <span>
          <IoIosArrowDown className="text-placeholder" />
        </span>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-[107%] z-10 w-full rounded-md border border-slate-200 bg-white max-h-60 overflow-y-auto">
          {options.map((option) => (
            <SelectItem
              icon={icon}
              showItemIcon={showItemIcon}
              isSelected={
                !!selectedOption &&
                selectedOption.some((opt) => opt.value === option.value)
              }
              key={option.value}
              handleOptionClick={handleOptionClick}
              {...option}
            />
          ))}
        </div>
      )}
      {helperText && (
        <div className="pt-1">
          <p className="text-sm text-placeholder">{helperText}</p>
        </div>
      )}
    </div>
  );
};

export default Select;
