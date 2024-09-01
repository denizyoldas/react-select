export interface Option {
  label: string;
  value: string;
  img?: string;
}

export interface SelectProps {
  options: Option[];
  onChange: (value: string | Option[]) => void;
  placeholder?: string;
  helperText?: string;
  label?: string;
  icon?: React.ReactNode;
  showItemIcon?: boolean;
  variant?: SelectVariant;
  filterSort?: (optionA: Option, optionB: Option) => number;
  disabled?: boolean;
  defaultValue?: string | Option[];
  selectedIcon?: React.ReactNode;
  fieldNames?: {
    label: string;
    value: string;
    img?: string;
  };
}

export type SelectVariant = "default" | "search" | "chipList";
