import React, { useEffect, useRef, useState } from "react";
import { type Option, type SelectProps } from "./model";
import SelectItem from "./item";
import { Label } from "./label";
import { HelperText } from "./helper-text";
import Toggle from "./toggle";
import useOutsideClick from "../../hooks/use-outside-click";
import { cn } from "../../lib/utils";

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
  filterSort,
  noOptionsMessage = "No options available",
  optionRender,
  tagRender,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useOutsideClick(ref, () => setIsOpen(false));

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
        setSearchQuery("");
        onChange(selectedOptions);
        break;
      case "search":
        setIsOpen(false);
        setSelectedOption(option);
        setSearchQuery(option.label);
        onChange(option.value);
        break;
      default:
        setIsOpen(false);
        setSelectedOption(option);
        onChange(option.value);
        break;
    }
  };

  const defaultSort = (optionA: Option, optionB: Option) => {
    if (filterSort) {
      return filterSort(optionA, optionB);
    }

    return 0;
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedOptions = filteredOptions.sort(defaultSort);

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
        tagRender={tagRender}
      />
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 top-[107%] z-10 w-full rounded-md border border-slate-200 bg-white max-h-60 overflow-y-auto",
            {
              "top-[83%]": helperText,
            }
          )}
        >
          {sortedOptions.length > 0 ? (
            sortedOptions.map((option) => (
              <SelectItem
                icon={icon}
                optionRender={optionRender}
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
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {noOptionsMessage}
            </div>
          )}
        </div>
      )}
      <HelperText helperText={helperText} />
    </div>
  );
};

export default Select;
