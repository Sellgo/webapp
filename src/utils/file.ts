import _ from 'lodash';

export const extensionMimeMapping: any = {
  '.csv': 'text/csv',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const mimeExtensionMapping = _.invert(extensionMimeMapping);

export const convertExtensionToMime = (extension: string) => {
  return extensionMimeMapping[extension];
};

export const convertMimeToExtension = (mime: string) => {
  return Object.keys(extensionMimeMapping).find(key => extensionMimeMapping[key] === mime);
};

export const getFileExtension = (file: File): string => {
  if (file && file.name.split('.').length > 1) {
    const extension = file.name.split('.').pop();
    if (extension) {
      return extension;
    }
  }
  return '';
};
