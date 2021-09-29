export type NavbarBarOption = {
  label: string;
  description?: string;
  icon: string;
  path: string;
  disabled: boolean;
  isBeta: boolean;
  subOptions?: NavbarBarOption[];
};

export type NavOptions = NavbarBarOption[];
