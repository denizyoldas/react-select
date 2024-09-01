import React, { useCallback, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "../../lib/utils";
import { Option, SelectVariant } from "./model";

interface ToggleProps {
  isOpen: boolean;
  selectedOption: Option | null;
  showItemIcon: boolean;
  icon: React.ReactNode;
  variant: SelectVariant;
  searchQuery: string;
  disabled: boolean;
  setSearchQuery: (query: string) => void;
  placeholder: string;
  toggleDropdown: () => void;
  setIsOpen: (isOpen: boolean) => void;
  selectedOptions: Option[];
  handleChipRemove: (option: Option) => void;
}

const Toggle: React.FC<ToggleProps> = React.memo(
  ({
    isOpen,
    selectedOption,
    showItemIcon,
    icon,
    searchQuery,
    setSearchQuery,
    placeholder,
    toggleDropdown,
    setIsOpen,
    variant,
    disabled,
    selectedOptions,
    handleChipRemove,
  }) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleDropdown();
        }
      },
      [toggleDropdown]
    );

    const renderIcon = useMemo(() => {
      if (selectedOption && !showItemIcon && selectedOption.img) {
        return (
          <img
            src={selectedOption.img}
            alt={selectedOption.label}
            className="w-6 h-6 rounded-full object-cover"
          />
        );
      }
      return icon ? <div>{icon}</div> : null;
    }, [selectedOption, showItemIcon, icon]);

    const renderInputOrPlaceholder = useMemo(() => {
      if (variant === "search") {
        return (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full border-none outline-none"
            onClick={(e) => e.stopPropagation()}
            onFocus={() => setIsOpen(true)}
            disabled={disabled}
          />
        );
      }

      if (variant === "chipList" && selectedOptions.length > 0) {
        return (
          <div className="flex items-center gap-x-2 flex-wrap">
            {selectedOptions.map((option) => (
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
            ))}
          </div>
        );
      }

      return (
        <span
          className={cn({
            "text-placeholder": !selectedOption,
            "text-disabled": disabled,
          })}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      );
    }, [
      variant,
      searchQuery,
      setSearchQuery,
      selectedOption,
      selectedOptions,
      placeholder,
      setIsOpen,
    ]);

    return (
      <div
        className={cn(
          "flex items-center justify-between gap-x-2 border border-secondary rounded-lg px-3 py-2",
          {
            "border-focus shadow-focus": isOpen,
            "opacity-disabled cursor-not-allowed": disabled,
          }
        )}
        tabIndex={0}
        role="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-x-2 w-full">
          {renderIcon}
          {renderInputOrPlaceholder}
        </div>
        <span>
          <IoIosArrowDown className="text-placeholder" />
        </span>
      </div>
    );
  }
);

export default Toggle;
