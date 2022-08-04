export type NavbarBarOption = {
  label: string;
  description?: string;
  icon: string;
  path: string;
  disabled: boolean;
  isBeta: boolean;
  isComingSoon?: boolean;
  subOptions?: NavbarBarOption[];
};

export type NavbarBarBottomOption = {
  label: string;
  icon: string;
  key: string;
};

export type NavbarBarBottomOptions = NavbarBarBottomOption[];
export type NavOptions = NavbarBarOption[];
