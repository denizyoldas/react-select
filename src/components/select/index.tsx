import React, { useEffect, useRef, useState } from "react";
import type { Option, SelectProps } from "./model";
import { IoIosArrowDown } from "react-icons/io";
import SelectItem from "./item";
import { cn } from "../../lib/utils";
import { Label } from "./label";
import { HelperText } from "./helper-text";

const Select: React.FC<SelectProps> = ({
  options,
  label,
  helperText,
  onChange,
  icon,
  showItemIcon = false,
  placeholder = "Select an option",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

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
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div ref={ref} className="min-w-80 relative">
      <Label label={label} />
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
        <div className="flex items-center gap-x-2">
          {icon && <div>{icon}</div>}
          <span className="text-placeholder">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
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
              isSelected={selectedOption?.value === option.value}
              key={option.value}
              handleOptionClick={handleOptionClick}
              {...option}
            />
          ))}
        </div>
      )}
      <HelperText helperText={helperText} />
    </div>
  );
};

export default Select;
