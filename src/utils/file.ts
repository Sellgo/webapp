import { PRODUCT_ID_TYPES, FieldsToMap } from '../constants/UploadSupplier';

export const csvExtensions = ['.csv'];

export const excelExtensions = ['.xlsx'];

export const extensions = [...csvExtensions, ...excelExtensions];

const NUM_DATA_ROWS_TO_GUESS_MAPPINGS = 6;

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
  // start at index 1 and end index+1 because of header row.
  const firstFewDataRows =
    fileStringArray.length && fileStringArray.length < NUM_DATA_ROWS_TO_GUESS_MAPPINGS + 1
      ? fileStringArray.slice(1, fileStringArray.length)
      : fileStringArray.slice(1, NUM_DATA_ROWS_TO_GUESS_MAPPINGS + 1);

  let primaryId: string | null = null;
  let headerIdIndex = -1;

  for (const idType of PRODUCT_ID_TYPES) {
    // find keyword in header cell.
    headerIdIndex = header.findIndex(headerCell =>
      String(headerCell)
        .toLowerCase()
        .includes(idType.toLowerCase())
    );
    if (headerIdIndex !== -1) {
      primaryId = idType;
      break;
    }
  }

  const _coerceBetweenUpcAndEan = (
    initialPrimaryId: string,
    headerIdIndex: number,
    firstFewDataRows: string[][]
  ) => {
    if (!['UPC', 'EAN'].includes(initialPrimaryId)) {
      return initialPrimaryId;
    }

    // If type UPC, check if >half of first few rows is 13 characters long, then coerce to EAN.
    // If type EAN, check if >half of first few rows is 12 characters long, then coerce to UPC.
    const checkLength = initialPrimaryId === 'UPC' ? 13 : 12;
    let score = 0;
    firstFewDataRows.forEach(row => {
      const cell = row[headerIdIndex];
      if (String(cell).length === checkLength) score++;
    });
    if (score > NUM_DATA_ROWS_TO_GUESS_MAPPINGS / 2) {
      return initialPrimaryId === 'UPC' ? 'EAN' : 'UPC';
    } else {
      return initialPrimaryId;
    }
  };

  if (primaryId) {
    primaryId = _coerceBetweenUpcAndEan(primaryId, headerIdIndex, firstFewDataRows);
  }

  return primaryId;
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

  const mappings: string[] = [];
  header.forEach((headerCell: string) => {
    const mappingKeys = FieldsToMap.map(item => item.key);
    if (headerCell) {
      const keyIndex = mappingKeys.findIndex((key: string) => {
        if (key === 'primary_id' && primaryIdType) {
          if (primaryIdType === 'EAN') {
            // accept secondary header keyword 'upc' for EAN primary id type,
            return (
              String(headerCell)
                .toLowerCase()
                .includes('ean') ||
              String(headerCell)
                .toLowerCase()
                .includes('upc')
            );
          } else if (primaryIdType === 'UPC') {
            // and secondary header keyword 'ean' for UPC primary id type.
            return (
              String(headerCell)
                .toLowerCase()
                .includes('upc') ||
              String(headerCell)
                .toLowerCase()
                .includes('ean')
            );
          }

          return String(headerCell)
            .toLowerCase()
            .includes(primaryIdType.toLowerCase());
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
