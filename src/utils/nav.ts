import { NavOptions, MainNavOption, SubNavOption } from '../interfaces/Admin';

export const disableNavOption = (label: string, options: NavOptions) => {
  options.map((mainOption: MainNavOption) => {
    if (mainOption.label === label) {
      mainOption.disabled = true;

      mainOption.subOptions.map((subOption: SubNavOption) => {
        subOption.disabled = true;
        return subOption;
      });
    } else {
      mainOption.subOptions.map((subOption: SubNavOption) => {
        if (subOption.label === label) {
          subOption.disabled = true;
        }
        return subOption;
      });
    }
    return mainOption;
  });
};

export const updateNavPath = (oldPath: string, newPath: string, options: NavOptions) => {
  options.map((mainOption: MainNavOption) => {
    mainOption.subOptions.map((subOption: SubNavOption) => {
      if (subOption.path === oldPath) {
        subOption.path = newPath;
      }
      return subOption;
    });
    return mainOption;
  });
};
