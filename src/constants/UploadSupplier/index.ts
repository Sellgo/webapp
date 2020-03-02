export const SET_UPLOAD_SUPPLIER_STEP = 'SET_UPLOAD_SUPPLIER_STEP';
export const SET_CSV = 'SET_CSV';
export const SET_RAW_CSV = 'SET_RAW_CSV';
export const MAP_COLUMN = 'MAP_COLUMN';
export const CLEANUP_UPLOAD_SUPPLIER = 'CLEANUP_UPLOAD_SUPPLIER';
export const REMOVE_COLUMN_MAPPINGS = 'REMOVE_COLUMN_MAPPINGS';
export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';
export const FINISH_UPLOAD = 'FINISH_UPLOAD';
export const TOGGLE_FIRST_ROW_HEADER = 'TOGGLE_FIRST_ROW_HEADER';
export const SET_SAVE_COLUMN_MAPPING_SETTING = 'SET_SAVE_COLUMN_MAPPING_SETTING';
export const SET_SKIP_COLUMN_MAPPING_CHECK = 'SET_SKIP_COLUMN_MAPPING_CHECK';
export const SET_SAVED_COLUMN_MAPPINGS = 'SET_SAVED_COLUMN_MAPPINGS';
export const UPDATE_DATA_QUALITY_REPORT = 'UPDATE_DATA_QUALITY_REPORT';

export enum UploadSteps {
  AddNewSearch,
  AddNewSupplier,
  SelectFile,
  DataMapping,
  DataValidation,
  Submit,
}

export const FieldsToMap = [
  {
    key: 'upc',
    label: 'UPC',
    required: true,
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'sku',
    label: 'Supplier SKU',
  },
  {
    key: 'cost',
    label: 'Product Cost',
    required: true,
  },
  {
    key: 'msrp',
    label: 'MSRP',
  },
];

export const terms = [
  {
    value: 'paid_by_order',
    key: 'paid_by_order',
    text: 'Paid when Order',
  },
  {
    value: '30d',
    key: '30d',
    text: '30 Days',
  },
  {
    value: '60d',
    key: '60d',
    text: '60 Days',
  },
  {
    value: '90d',
    key: '90d',
    text: '90 Days',
  },
  {
    value: 'custom',
    key: 'custom',
    text: 'custom',
  },
];

export const accountStatus = [
  {
    value: 'active',
    key: 'active',
    text: 'Active',
  },
  {
    value: 'inactive',
    key: 'inactive',
    text: 'Inactive',
  },
];

export const marketPlace = [
  {
    value: 'amazon.com',
    key: 'amazon.com',
    text: 'Amazon.com',
  },
  {
    value: 'linkedin.com',
    key: 'linkedin.com',
    text: 'Linkedin.com',
  },
];
