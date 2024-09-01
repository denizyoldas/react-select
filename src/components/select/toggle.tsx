import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "../../lib/utils";
import type { Option } from "./model";

interface ToggleProps {
  isOpen: boolean;
  selectedOption: Option | null;
  showItemIcon: boolean;
  icon: React.ReactNode;
  search: boolean;
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
  search,
  searchQuery,
  setSearchQuery,
  placeholder,
  toggleDropdown,
  setIsOpen,
}) => {
  return (
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
      <div className="flex items-center gap-x-2 w-full">
        {selectedOption && !showItemIcon && selectedOption.img ? (
          <img
            src={selectedOption.img}
            alt={selectedOption.label}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          icon && <div>{icon}</div>
        )}
        {search ? (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full border-none outline-none"
            onClick={(e) => e.stopPropagation()} // Prevent input click from toggling dropdown
            onFocus={() => setIsOpen(true)}
          />
        ) : (
          <>
            <span className="text-placeholder">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </>
        )}
      </div>
      <span>
        <IoIosArrowDown className="text-placeholder" />
      </span>
    </div>
  );
};

export default Toggle;
