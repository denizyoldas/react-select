export interface Option {
  value: string;
  label: string;
  img?: string;
}

export interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  label?: string;
  icon?: React.ReactNode;
  showItemIcon?: boolean;
  variant?: SelectVariant;
  disabled?: boolean;
  defaultValue?: string;
  selectedIcon?: React.ReactNode;
}

export type SelectVariant = "default" | "search" | "chipList";
