import React, { useEffect, useRef, useState } from "react";
import { type Option, type SelectProps } from "./model";
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
  defaultValue,
  selectedIcon,

  showItemIcon = false,
  placeholder = "Select an option",
  variant = "default",
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
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

  useEffect(() => {
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        setSelectedOptions(defaultValue);
      } else {
        setSelectedOption(
          options.find((option) => option.value === defaultValue) || null
        );
      }
    }
  }, [defaultValue, options]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: Option) => {
    if (disabled) {
      return;
    }
    setIsOpen(false);

    switch (variant) {
      case "chipList":
        if (
          selectedOptions.some((selected) => selected.value === option.value)
        ) {
          setSelectedOptions(
            selectedOptions.filter(
              (selected) => selected.value !== option.value
            )
          );
        } else {
          setSelectedOptions([...selectedOptions, option]);
        }
        onChange(selectedOptions);
        break;
      case "search":
        setSelectedOption(option);
        setSearchQuery(option.label);
        onChange(option.value);
        break;
      default:
        setSelectedOption(option);
        onChange(option.value);
        break;
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChipRemove = (option: Option) => {
    setSelectedOptions(selectedOptions.filter((o) => o.value !== option.value));
  };

  return (
    <div ref={ref} className="min-w-80 relative">
      <Label label={label} />
      <Toggle
        icon={icon}
        isOpen={isOpen}
        variant={variant}
        disabled={disabled}
        searchQuery={searchQuery}
        placeholder={placeholder}
        showItemIcon={showItemIcon}
        selectedOption={selectedOption}
        setIsOpen={setIsOpen}
        setSearchQuery={setSearchQuery}
        toggleDropdown={toggleDropdown}
        selectedOptions={selectedOptions}
        handleChipRemove={handleChipRemove}
      />
      {isOpen && (
        <div className="absolute left-0 top-[107%] z-10 w-full rounded-md border border-slate-200 bg-white max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <SelectItem
              icon={icon}
              selectedIcon={selectedIcon}
              showItemIcon={showItemIcon}
              isSelected={
                selectedOptions.some(
                  (selected) => selected.value === option.value
                ) || selectedOption?.value === option.value
              }
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
