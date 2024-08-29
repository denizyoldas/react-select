import { cn } from "../../lib/utils";
import type { Option } from "./model";
import { IoMdCheckmark } from "react-icons/io";

type SelectItemProps = Option & {
  handleOptionClick: (option: Option) => void;
  isSelected: boolean;
  icon?: React.ReactNode;
  showItemIcon?: boolean;
};

const SelectItem: React.FC<SelectItemProps> = ({
  value,
  label,
  handleOptionClick,
  isSelected,
  icon,
  img,
  showItemIcon,
}) => {
  return (
    <div
      onClick={() => handleOptionClick({ value, label })}
      className={cn(
        "cursor-pointer p-2 hover:bg-slate-100 flex items-center justify-between",
        {
          "bg-slate-100": isSelected,
        }
      )}
    >
      <div className="flex items-center gap-x-2">
        {img && <img src={img} alt={label} className="w-6 h-6 rounded-full" />}
        {!img && icon && showItemIcon && <div>{icon}</div>}
        {label}
      </div>
      {isSelected && <IoMdCheckmark className="text-check" />}
    </div>
  );
};

export default SelectItem;
