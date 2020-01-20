export const filterRanges = {
  avg_margin: { min: -255, max: 55 },
  avg_profit: { min: -6, max: 52 },
  avg_unit_monthly: { min: -6104, max: 117924 },
  avg_roi: { min: 0, max: 2292 },
};
export const columnFilter = [
  {
    value: false,
    key: 'Select All',
  },
  {
    value: false,
    key: 'Avg Price',
  },
  {
    value: false,
    key: 'Avg Profit',
  },
  {
    value: false,
    key: 'Avg Margin',
  },
  {
    value: false,
    key: 'Avg Daily Unit Sold',
  },
  {
    value: false,
    key: 'Avg Daily Revenue',
  },
  {
    value: false,
    key: 'Avg ROI',
  },
  {
    value: false,
    key: 'Avg Daily Rank',
  },
  {
    value: false,
    key: 'Reviews',
  },
  {
    value: false,
    key: 'Rating',
  },
  {
    value: false,
    key: 'Dimensions',
  },
];
export const checkFilter = [
  {
    title: 'Inventory',
    checkData: [
      {
        value: true,
        key: 'Avg Amazon stock',
      },
      {
        value: false,
        key: 'Avg fba seller stock',
      },
    ],
  },
  {
    title: 'Pricing',
    checkData: [
      {
        value: true,
        key: 'Avg Buybox price',
      },
      {
        value: true,
        key: 'Price Now vs Price Avg',
      },
      {
        value: true,
        key: 'Map Violation',
      },
      {
        value: true,
        key: 'Multi pack Analysis',
      },
    ],
  },
  {
    title: 'Ranking',
    checkData: [
      {
        value: true,
        key: 'BSR now vs Avg BSR',
      },
    ],
  },
  {
    title: 'Seller',
    checkData: [
      {
        value: true,
        key: '#BB now vs Avg BB Seller',
      },
    ],
  },
  {
    title: 'Sales',
    checkData: [
      {
        value: true,
        key: '# sales to review',
      },
      {
        value: true,
        key: 'Seasonality Analysis',
      },
    ],
  },
];

export const countryOptions = [
  { key: 'us', value: 'us', flag: 'us', text: 'United States' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
];

export const filteredProducts = [
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B01LH7L0KS',
    asin: 'B01LH7L0KS',
    brand: 'Shell Rotella T',
    fees: '9.68',
    id: 342756,
    image_url: 'http://ecx.images-amazon.com/images/I/51VGTQIwtAL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.048339Z',
    margin: '24.99',
    avg_price: '20.97',
    product_cost: '6.05',
    product_id: 3000057196,
    product_track_id: null,
    profit: '5.24',
    profit_monthly: '5706.36',
    rank: 255,
    roi: '86.61',
    sales_monthly: '1089.00',
    sellgo_score: 4.2,
    title:
      'Shell Rotella T6 Full Synthetic 5W-40 Diesel Engine Oil (1-Gallon, Single Pack, New Packaging)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B000CFME2A',
    asin: 'B000CFME2A',
    brand: 'Champion',
    fees: '3.69',
    id: 342764,
    image_url: 'http://ecx.images-amazon.com/images/I/41eXyh0Vk9L._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.108548Z',
    margin: '-15.79',
    avg_price: '4.18',
    product_cost: '1.15',
    product_id: 3000057198,
    product_track_id: null,
    profit: '-0.66',
    profit_monthly: '-77.22',
    rank: 15408,
    roi: '-57.39',
    sales_monthly: '117.00',
    sellgo_score: 0.8,
    title: 'Champion RC12YC (71G) Copper Plus Small Engine Replacement Spark Plug (Pack of 1)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B00079FOK0',
    asin: 'B00079FOK0',
    brand: '3M',
    fees: '6.97',
    id: 342761,
    image_url: 'http://ecx.images-amazon.com/images/I/41bj216XrSL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.090557Z',
    margin: '28.21',
    avg_price: '18.43',
    product_cost: '6.26',
    product_id: 3000057201,
    product_track_id: null,
    profit: '5.20',
    profit_monthly: '11840.40',
    rank: 81,
    roi: '83.07',
    sales_monthly: '2277.00',
    sellgo_score: 4.3,
    title: '3M Dual Cartridge Respirator Assembly 3M 07193, Large',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B01LH7L0KS',
    asin: 'B01LH7L0KS',
    brand: 'Shell Rotella T',
    fees: '9.68',
    id: 342756,
    image_url: 'http://ecx.images-amazon.com/images/I/51VGTQIwtAL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.048339Z',
    margin: '24.99',
    avg_price: '20.97',
    product_cost: '6.05',
    product_id: 3000057196,
    product_track_id: null,
    profit: '5.24',
    profit_monthly: '5706.36',
    rank: 255,
    roi: '86.61',
    sales_monthly: '1089.00',
    sellgo_score: 4.2,
    title:
      'Shell Rotella T6 Full Synthetic 5W-40 Diesel Engine Oil (1-Gallon, Single Pack, New Packaging)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B000CFME2A',
    asin: 'B000CFME2A',
    brand: 'Champion',
    fees: '3.69',
    id: 342764,
    image_url: 'http://ecx.images-amazon.com/images/I/41eXyh0Vk9L._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.108548Z',
    margin: '-15.79',
    avg_price: '4.18',
    product_cost: '1.15',
    product_id: 3000057198,
    product_track_id: null,
    profit: '-0.66',
    profit_monthly: '-77.22',
    rank: 15408,
    roi: '-57.39',
    sales_monthly: '117.00',
    sellgo_score: 0.8,
    title: 'Champion RC12YC (71G) Copper Plus Small Engine Replacement Spark Plug (Pack of 1)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B00079FOK0',
    asin: 'B00079FOK0',
    brand: '3M',
    fees: '6.97',
    id: 342761,
    image_url: 'http://ecx.images-amazon.com/images/I/41bj216XrSL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.090557Z',
    margin: '28.21',
    avg_price: '18.43',
    product_cost: '6.26',
    product_id: 3000057201,
    product_track_id: null,
    profit: '5.20',
    profit_monthly: '11840.40',
    rank: 81,
    roi: '83.07',
    sales_monthly: '2277.00',
    sellgo_score: 4.3,
    title: '3M Dual Cartridge Respirator Assembly 3M 07193, Large',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B01LH7L0KS',
    asin: 'B01LH7L0KS',
    brand: 'Shell Rotella T',
    fees: '9.68',
    id: 342756,
    image_url: 'http://ecx.images-amazon.com/images/I/51VGTQIwtAL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.048339Z',
    margin: '24.99',
    avg_price: '20.97',
    product_cost: '6.05',
    product_id: 3000057196,
    product_track_id: null,
    profit: '5.24',
    profit_monthly: '5706.36',
    rank: 255,
    roi: '86.61',
    sales_monthly: '1089.00',
    sellgo_score: 4.2,
    title:
      'Shell Rotella T6 Full Synthetic 5W-40 Diesel Engine Oil (1-Gallon, Single Pack, New Packaging)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B000CFME2A',
    asin: 'B000CFME2A',
    brand: 'Champion',
    fees: '3.69',
    id: 342764,
    image_url: 'http://ecx.images-amazon.com/images/I/41eXyh0Vk9L._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.108548Z',
    margin: '-15.79',
    avg_price: '4.18',
    product_cost: '1.15',
    product_id: 3000057198,
    product_track_id: null,
    profit: '-0.66',
    profit_monthly: '-77.22',
    rank: 15408,
    roi: '-57.39',
    sales_monthly: '117.00',
    sellgo_score: 0.8,
    title: 'Champion RC12YC (71G) Copper Plus Small Engine Replacement Spark Plug (Pack of 1)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B00079FOK0',
    asin: 'B00079FOK0',
    brand: '3M',
    fees: '6.97',
    id: 342761,
    image_url: 'http://ecx.images-amazon.com/images/I/41bj216XrSL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.090557Z',
    margin: '28.21',
    avg_price: '18.43',
    product_cost: '6.26',
    product_id: 3000057201,
    product_track_id: null,
    profit: '5.20',
    profit_monthly: '11840.40',
    rank: 81,
    roi: '83.07',
    sales_monthly: '2277.00',
    sellgo_score: 4.3,
    title: '3M Dual Cartridge Respirator Assembly 3M 07193, Large',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B01LH7L0KS',
    asin: 'B01LH7L0KS',
    brand: 'Shell Rotella T',
    fees: '9.68',
    id: 342756,
    image_url: 'http://ecx.images-amazon.com/images/I/51VGTQIwtAL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.048339Z',
    margin: '24.99',
    avg_price: '20.97',
    product_cost: '6.05',
    product_id: 3000057196,
    product_track_id: null,
    profit: '5.24',
    profit_monthly: '5706.36',
    rank: 255,
    roi: '86.61',
    sales_monthly: '1089.00',
    sellgo_score: 4.2,
    title:
      'Shell Rotella T6 Full Synthetic 5W-40 Diesel Engine Oil (1-Gallon, Single Pack, New Packaging)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B000CFME2A',
    asin: 'B000CFME2A',
    brand: 'Champion',
    fees: '3.69',
    id: 342764,
    image_url: 'http://ecx.images-amazon.com/images/I/41eXyh0Vk9L._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.108548Z',
    margin: '-15.79',
    avg_price: '4.18',
    product_cost: '1.15',
    product_id: 3000057198,
    product_track_id: null,
    profit: '-0.66',
    profit_monthly: '-77.22',
    rank: 15408,
    roi: '-57.39',
    sales_monthly: '117.00',
    sellgo_score: 0.8,
    title: 'Champion RC12YC (71G) Copper Plus Small Engine Replacement Spark Plug (Pack of 1)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B00079FOK0',
    asin: 'B00079FOK0',
    brand: '3M',
    fees: '6.97',
    id: 342761,
    image_url: 'http://ecx.images-amazon.com/images/I/41bj216XrSL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.090557Z',
    margin: '28.21',
    avg_price: '18.43',
    product_cost: '6.26',
    product_id: 3000057201,
    product_track_id: null,
    profit: '5.20',
    profit_monthly: '11840.40',
    rank: 81,
    roi: '83.07',
    sales_monthly: '2277.00',
    sellgo_score: 4.3,
    title: '3M Dual Cartridge Respirator Assembly 3M 07193, Large',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B01LH7L0KS',
    asin: 'B01LH7L0KS',
    brand: 'Shell Rotella T',
    fees: '9.68',
    id: 342756,
    image_url: 'http://ecx.images-amazon.com/images/I/51VGTQIwtAL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.048339Z',
    margin: '24.99',
    avg_price: '20.97',
    product_cost: '6.05',
    product_id: 3000057196,
    product_track_id: null,
    profit: '5.24',
    profit_monthly: '5706.36',
    rank: 255,
    roi: '86.61',
    sales_monthly: '1089.00',
    sellgo_score: 4.2,
    title:
      'Shell Rotella T6 Full Synthetic 5W-40 Diesel Engine Oil (1-Gallon, Single Pack, New Packaging)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B000CFME2A',
    asin: 'B000CFME2A',
    brand: 'Champion',
    fees: '3.69',
    id: 342764,
    image_url: 'http://ecx.images-amazon.com/images/I/41eXyh0Vk9L._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.108548Z',
    margin: '-15.79',
    avg_price: '4.18',
    product_cost: '1.15',
    product_id: 3000057198,
    product_track_id: null,
    profit: '-0.66',
    profit_monthly: '-77.22',
    rank: 15408,
    roi: '-57.39',
    sales_monthly: '117.00',
    sellgo_score: 0.8,
    title: 'Champion RC12YC (71G) Copper Plus Small Engine Replacement Spark Plug (Pack of 1)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B00079FOK0',
    asin: 'B00079FOK0',
    brand: '3M',
    fees: '6.97',
    id: 342761,
    image_url: 'http://ecx.images-amazon.com/images/I/41bj216XrSL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.090557Z',
    margin: '28.21',
    avg_price: '18.43',
    product_cost: '6.26',
    product_id: 3000057201,
    product_track_id: null,
    profit: '5.20',
    profit_monthly: '11840.40',
    rank: 81,
    roi: '83.07',
    sales_monthly: '2277.00',
    sellgo_score: 4.3,
    title: '3M Dual Cartridge Respirator Assembly 3M 07193, Large',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B01LH7L0KS',
    asin: 'B01LH7L0KS',
    brand: 'Shell Rotella T',
    fees: '9.68',
    id: 342756,
    image_url: 'http://ecx.images-amazon.com/images/I/51VGTQIwtAL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.048339Z',
    margin: '24.99',
    avg_price: '20.97',
    product_cost: '6.05',
    product_id: 3000057196,
    product_track_id: null,
    profit: '5.24',
    profit_monthly: '5706.36',
    rank: 255,
    roi: '86.61',
    sales_monthly: '1089.00',
    sellgo_score: 4.2,
    title:
      'Shell Rotella T6 Full Synthetic 5W-40 Diesel Engine Oil (1-Gallon, Single Pack, New Packaging)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B000CFME2A',
    asin: 'B000CFME2A',
    brand: 'Champion',
    fees: '3.69',
    id: 342764,
    image_url: 'http://ecx.images-amazon.com/images/I/41eXyh0Vk9L._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.108548Z',
    margin: '-15.79',
    avg_price: '4.18',
    product_cost: '1.15',
    product_id: 3000057198,
    product_track_id: null,
    profit: '-0.66',
    profit_monthly: '-77.22',
    rank: 15408,
    roi: '-57.39',
    sales_monthly: '117.00',
    sellgo_score: 0.8,
    title: 'Champion RC12YC (71G) Copper Plus Small Engine Replacement Spark Plug (Pack of 1)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B00079FOK0',
    asin: 'B00079FOK0',
    brand: '3M',
    fees: '6.97',
    id: 342761,
    image_url: 'http://ecx.images-amazon.com/images/I/41bj216XrSL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.090557Z',
    margin: '28.21',
    avg_price: '18.43',
    product_cost: '6.26',
    product_id: 3000057201,
    product_track_id: null,
    profit: '5.20',
    profit_monthly: '11840.40',
    rank: 81,
    roi: '83.07',
    sales_monthly: '2277.00',
    sellgo_score: 4.3,
    title: '3M Dual Cartridge Respirator Assembly 3M 07193, Large',
    tracking_status: null,
  },
];

export const products = [
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B01LH7L0KS',
    asin: 'B01LH7L0KS',
    brand: 'Shell Rotella T',
    fees: '9.68',
    id: 342756,
    image_url: 'http://ecx.images-amazon.com/images/I/51VGTQIwtAL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.048339Z',
    margin: '24.99',
    price: '20.97',
    product_cost: '6.05',
    product_id: 3000057196,
    product_track_id: null,
    profit: '5.24',
    profit_monthly: '5706.36',
    rank: 255,
    roi: '86.61',
    sales_monthly: '1089.00',
    sellgo_score: 4.2,
    title:
      'Shell Rotella T6 Full Synthetic 5W-40 Diesel Engine Oil (1-Gallon, Single Pack, New Packaging)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B000CFME2A',
    asin: 'B000CFME2A',
    brand: 'Champion',
    fees: '3.69',
    id: 342764,
    image_url: 'http://ecx.images-amazon.com/images/I/41eXyh0Vk9L._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.108548Z',
    margin: '-15.79',
    price: '4.18',
    product_cost: '1.15',
    product_id: 3000057198,
    product_track_id: null,
    profit: '-0.66',
    profit_monthly: '-77.22',
    rank: 15408,
    roi: '-57.39',
    sales_monthly: '117.00',
    sellgo_score: 0.8,
    title: 'Champion RC12YC (71G) Copper Plus Small Engine Replacement Spark Plug (Pack of 1)',
    tracking_status: null,
  },
  {
    amazon_category_name: 'Automotive',
    amazon_url: 'https://www.amazon.com/dp/B00079FOK0',
    asin: 'B00079FOK0',
    brand: '3M',
    fees: '6.97',
    id: 342761,
    image_url: 'http://ecx.images-amazon.com/images/I/41bj216XrSL._SL75_.jpg',
    last_syn: '2020-01-06T21:05:24.090557Z',
    margin: '28.21',
    price: '18.43',
    product_cost: '6.26',
    product_id: 3000057201,
    product_track_id: null,
    profit: '5.20',
    profit_monthly: '11840.40',
    rank: 81,
    roi: '83.07',
    sales_monthly: '2277.00',
    sellgo_score: 4.3,
    title: '3M Dual Cartridge Respirator Assembly 3M 07193, Large',
    tracking_status: null,
  },
];
