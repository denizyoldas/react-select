export interface Option {
  value: string;
  label: string;
  img?: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  helperText?: string;
  label?: string;
  icon?: React.ReactNode;
  showItemIcon?: boolean;
  onChange: (value: string) => void;
  variant?: SelectVariant;
}

export type SelectVariant = "default" | "search" | "chipList";
