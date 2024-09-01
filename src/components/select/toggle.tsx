import React from "react";
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
  setSearchQuery: (query: string) => void;
  placeholder: string;
  toggleDropdown: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
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
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleDropdown();
    }
  };

  const renderIcon = () => {
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
  };

  const renderInputOrPlaceholder = () => {
    if (variant === SelectVariant.SEARCH) {
      return (
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full border-none outline-none"
          onClick={(e) => e.stopPropagation()} // Prevent input click from toggling dropdown
          onFocus={() => setIsOpen(true)}
        />
      );
    }

    return (
      <span className={cn({ "text-placeholder": !selectedOption })}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
    );
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-x-2 border border-secondary rounded-lg px-3 py-2",
        {
          "border-focus shadow-focus": isOpen,
        }
      )}
      tabIndex={0}
      role="button"
      onClick={toggleDropdown}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-x-2 w-full">
        {renderIcon()}
        {renderInputOrPlaceholder()}
      </div>
      <span>
        <IoIosArrowDown className="text-placeholder" />
      </span>
    </div>
  );
};

export default Toggle;
