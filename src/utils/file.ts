import { PRODUCT_ID_TYPES, FieldsToMap } from '../constants/UploadSupplier';

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

/**
 *  This function guesses the primary id type of the file based on whether a cell in the header
 * row contains a specific keyword.
 *  Note: this function assumes that the first row of the fileStringArray is a header.
 */
export const guessPrimaryIdType = (fileStringArray: string[][]): string | null => {
  const header = fileStringArray.length ? fileStringArray[0] : []; // assume first row is header
  for (const item of PRODUCT_ID_TYPES) {
    const productLabel: any = item.label.split('/'); // considering ASIN/ISBN
    for (const label of productLabel) {
      const found =
        header.findIndex(headerCell =>
          String(headerCell)
            .toLowerCase()
            .includes(label.toLowerCase())
        ) !== -1;
      if (found) return item.value;
    }
  }

  return null;
};

/**
 *  This function guesses column mappings based on whether a cell in the header row contains a specific keyword.
 *  Note: this function assumes that the first row of the fileStringArray is a header.
 *
 *  Potential future improvements:
 *
 *    1) check header row against multiple keywords for each column
 *
 *    2) guess from format of data rows
 */
export const guessColumnMappings = (
  fileStringArray: string[][],
  primaryIdType?: string
): string[] => {
  const header = fileStringArray.length ? fileStringArray[0] : []; // assume first row is header
  const primaryIdValue = primaryIdType && primaryIdType === 'ASIN' ? 'ASIN/ISBN' : primaryIdType;
  const mappings: string[] = [];
  header.forEach((headerCell: string) => {
    const mappingKeys = FieldsToMap.map(item => item.key);
    if (headerCell) {
      const keyIndex = mappingKeys.findIndex((key: string) => {
        if (key === 'primary_id' && primaryIdValue) {
          return primaryIdValue.toLowerCase().includes(String(headerCell).toLowerCase());
        }
        return String(headerCell)
          .toLowerCase()
          .includes(key.toLowerCase()); // find keyword in header cell
      });
      mappings.push(mappingKeys[keyIndex]);
    }
  });

  return mappings;
};
