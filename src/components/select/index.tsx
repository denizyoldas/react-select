import React, { useEffect, useRef, useState } from "react";
import { SelectVariant, type Option, type SelectProps } from "./model";
import SelectItem from "./item";
import { Label } from "./label";
import { HelperText } from "./helper-text";
import Toggle from "./toggle";

const Select: React.FC<SelectProps> = ({
  options,
  label,
  helperText,
  onChange,
  icon,
  showItemIcon = false,
  placeholder = "Select an option",
  variant = SelectVariant.DEFAULT,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
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
    if (variant === "search") {
      setSearchQuery(option.label);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={ref} className="min-w-80 relative">
      <Label label={label} />
      <Toggle
        isOpen={isOpen}
        selectedOption={selectedOption}
        showItemIcon={showItemIcon}
        icon={icon}
        variant={variant}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={placeholder}
        toggleDropdown={toggleDropdown}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <div className="absolute left-0 top-[107%] z-10 w-full rounded-md border border-slate-200 bg-white max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
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
