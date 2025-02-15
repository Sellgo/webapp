export const SET_UPLOAD_SUPPLIER_STEP = 'SET_UPLOAD_SUPPLIER_STEP';
export const SET_FILE_STRING_ARRAY = 'SET_FILE_STRING_ARRAY';
export const SET_RAW_FILE = 'SET_RAW_FILE';
export const MAP_COLUMN = 'MAP_COLUMN';
export const CLEANUP_UPLOAD_SUPPLIER = 'CLEANUP_UPLOAD_SUPPLIER';
export const REMOVE_COLUMN_MAPPINGS = 'REMOVE_COLUMN_MAPPINGS';
export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';
export const FINISH_UPLOAD = 'FINISH_UPLOAD';
export const TOGGLE_FIRST_ROW_HEADER = 'TOGGLE_FIRST_ROW_HEADER';
export const SET_COLUMN_MAPPING_SETTING = 'SET_COLUMN_MAPPING_SETTING';
export const SET_COLUMN_MAPPINGS = 'SET_COLUMN_MAPPINGS';
export const SET_PRIMARY_ID_TYPE = 'SET_PRIMARY_ID_TYPE';
export const SET_RESULT_UPLOAD = 'SET_RESULT_UPLOAD';
export const SET_SYNTHESIS_ID = 'SET_SYNTHESIS_ID';
export const SET_SPEED = 'SET_SPEED';
export const SET_ERROR_FILE = 'SET_ERROR_FILE';
export const SET_PROGRESS_SHOW = 'SET_PROGRESS_SHOW';
export const SHOW_CONFIRMATION = 'SHOW_CONFIRMATION';
export const SET_ETA = 'SET_ETA';
export const SET_VALID_ROWS = 'SET_VALID_ROWS';
export const SET_ERROR_ROWS = 'SET_ERROR_ROWS';
export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_LOADING = 'SET_LOADING';
export const SET_FILE_NAME = 'SET_FILE_NAME';
export const SET_VARIATIONS = 'SET_VARIATIONS';

export const MAX_FILE_SIZE_BYTES = 30000000; // 30MB

export enum UploadSteps {
  AddNewSearch,
  DataMapping,
  Submit,
}

export const PRODUCT_ID_TYPES = ['UPC', 'ASIN', 'EAN', 'ISBN'];

export const FieldsToMap = [
  {
    key: 'primary_id',
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
  },
  {
    key: 'msrp',
    label: 'MSRP',
  },
  {
    key: 'quantity',
    label: 'Wholesale Qty',
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
    value: 'ATVPDKIKX0DER',
    key: 'ATVPDKIKX0DER',
    text: 'Amazon.com',
  },
];
