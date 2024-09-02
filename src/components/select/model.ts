/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Option {
  label: string;
  value: string;
  // [key: string]: string | number | React.ReactNode | undefined;
  [key: string]: any;
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
  disabled?: boolean;
  defaultValue?: string | Option[];
  selectedIcon?: React.ReactNode;
  noOptionsMessage?: string;
  filterSort?: (optionA: Option, optionB: Option) => number;
  optionRender?: (option: Option) => React.ReactNode;
  tagRender?: (option: Option) => React.ReactNode;
}

export type SelectVariant = "default" | "search" | "chipList";
