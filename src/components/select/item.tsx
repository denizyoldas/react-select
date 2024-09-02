import { cn } from "../../lib/utils";
import type { Option } from "./model";
import { IoMdCheckmark } from "react-icons/io";

type SelectItemProps = Option & {
  handleOptionClick: (option: Option) => void;
  isSelected: boolean;
  icon?: React.ReactNode;
  showItemIcon?: boolean;
  selectedIcon?: React.ReactNode;
  optionRender?: (option: Option) => React.ReactNode;
};

const SelectItem: React.FC<SelectItemProps> = (props) => {
  const {
    label,
    icon,
    showItemIcon,
    selectedIcon,
    optionRender,
    handleOptionClick,
    isSelected,
  } = props;

  const renderOption = optionRender ? (
    optionRender(props)
  ) : (
    <div className="flex items-center gap-x-2">
      {icon && showItemIcon && <div>{icon}</div>}
      {label}
    </div>
  );

  return (
    <div
      onClick={() => handleOptionClick(props)}
      className={cn(
        "cursor-pointer p-2 hover:bg-slate-100 flex items-center justify-between",
        {
          "bg-slate-100": isSelected,
        }
      )}
    >
      {renderOption}
      {isSelected && (
        <div>
          {selectedIcon ? (
            selectedIcon
          ) : (
            <IoMdCheckmark className="text-check" />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectItem;
