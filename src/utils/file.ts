export const csvExtensions: any = ['.csv'];

export const excelExtensions: any = ['.xlsx'];

export const extensions: any = [...csvExtensions, ...excelExtensions];

export const getFileExtension = (file: File): string => {
  if (file && file.name.split('.').length > 1) {
    const extension = file.name.split('.').pop();
    if (extension) {
      return '.' + extension.toLowerCase();
    }
  }
  return '';
};
