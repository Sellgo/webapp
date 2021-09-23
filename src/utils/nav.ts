export const disableNavOption = (label: string, options: any) => {
    options.map((mainOption: any) => {
        if (mainOption.label === label) {
            mainOption.disabled = true;
            mainOption.subOptions.map((subOption:any) => {
                subOption.disabled = true;
            })
        } else {
            mainOption.subOptions.map((subOption:any) => {
                if (subOption.label === label) {
                    subOption.disabled = true;
                }
            })
        }
      });
}

export const updateNavPath = (oldPath: string, newPath: string, options: any) => {
    options.map((mainOption: any) => {
          mainOption.subOptions.map((subOption:any) => {
            if (subOption.path === oldPath) {
              subOption.path = newPath;
            }
          })
      });
}