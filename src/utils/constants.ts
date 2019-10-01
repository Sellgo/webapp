import PRODUCT_IMAGE from '../assets/images/flag_icon.svg';
import AMAZON_IMAGE from '../assets/images/amazon_choice.svg';
import PRIME_IMAGE from '../assets/images/prime_icon.svg';
import TOP_SELLER_IMAGE from '../assets/images/product_image.svg';
import CROWN from '../assets/images/crown_icon.svg';
import DOWNLOAD_ICN from '../assets/images/download.svg';

export const RAW_DATA = [
  {
    topSellerImg: TOP_SELLER_IMAGE,
    productName: 'Toddler Fishing Game Gifts for 2 3 Year Old Girl and Boy Toys Birthday',
    seller: 'Top Bright',
    sections: [
      { key: 'Toys & Games', content: 'Toys & Games', link: true },
      {
        key: 'Learning & Education',
        content: 'Learning & Education',
        link: true,
      },
    ],
    productImg: PRODUCT_IMAGE,
    productId: 'B078WLH42J',
    starRatings: 4,
    totalReviews: 500,
    price: 23.99,
    category: 421,
    amazonImg: AMAZON_IMAGE,
    primeImg: PRIME_IMAGE,
    profit: 5.68,
    margin: 29,
    unitSoldPerDay: 192,
    unitSoldPerMonth: 5777,
    profitPerMon: 32813.36,
    roi: 100,
    ratings: 9.3,
    crownImg: CROWN,
    checked: false,
  },
  {
    topSellerImg: TOP_SELLER_IMAGE,
    productName: 'Melissa & Doug Deluxe Pounding Bench Wooden Toy with Mallet (Develop ...',
    seller: 'Top Bright',
    sections: [
      { key: 'Toys & Games', content: 'Toys & Games', link: true },
      {
        key: 'Baby & Toddler Toys',
        content: 'Baby & Toddler Toys',
        link: true,
      },
      {
        key: 'Hammering & Pounding Toys',
        content: 'Hammering & Pounding Toys',
        link: true,
      },
    ],
    productImg: PRODUCT_IMAGE,
    productId: 'B004NCEL4M',
    starRatings: 4,
    totalReviews: 2204,
    price: 15.49,
    category: 421,
    amazonImg: AMAZON_IMAGE,
    primeImg: PRIME_IMAGE,
    profit: 3.78,
    margin: 24.4,
    unitSoldPerDay: 344,
    unitSoldPerMonth: 10345,
    profitPerMon: 39104.1,
    roi: 120,
    ratings: 9.3,
    crownImg: CROWN,
    checked: false,
  },
];

export const HEADER = [
  { name: 'productInfo', label: 'PRODUCT INFORMATION', sortable: false },
  { name: 'profit', label: 'PROFIT', sortable: true },
  { name: 'margin', label: 'MARGIN', sortable: true },
  { name: 'unitSold', label: 'Unit Sold', sortable: true },
  { name: 'profitPerMon', label: 'PROFIT/ Mo', sortable: true },
  { name: 'roi', label: 'ROI', sortable: true },
  { name: 'otherInfo', label: 'Other Sort', sortable: false, icon: DOWNLOAD_ICN },
];

export const TOP_SELLER = 'TOP SELLER';

export const DOWNLOAD = 'DOWNLOAD_ICN';
