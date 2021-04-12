import React from 'react';
import './index.scss';
import Rating from 'react-rating';
import { Icon } from 'semantic-ui-react';
import { formatBoolean, formatCurrency, showNAIfZeroOrNull } from '../../../../utils/format';
import { formatCompletedDate } from '../../../../utils/date';
import SampleProductImage from '../../../../assets/images/Image 37.png';
import TrackSeller from '../TrackSeller';
const renderBuyBox = (row: any) => {
  return <p>{showNAIfZeroOrNull(row.buy_box, row.buy_box)}</p>;
};

const renderProductInventory = (row: any) => {
  return (
    <p>
      <span className="product-inner-container">
        <span>
          <img src={SampleProductImage} alt={'product-image'} className="product-image" />
        </span>
        <span className="product-info">
          <span className="product-name"> {row.product_name}</span>
          <span className="asin">
            {row.asin} <Icon name={'copy outline'} />
          </span>
        </span>
      </span>
    </p>
  );
};

const renderInStock = (row: any) => {
  return <p>{formatBoolean(row.in_stock)}</p>;
};

const renderPrice = (row: any) => {
  return <p>{formatCurrency(row.price)}</p>;
};

const renderRating = (row: any) => {
  return (
    <Rating
      placeholderRating={row.rating}
      emptySymbol={<Icon name="star outline" color={'grey'} />}
      fullSymbol={<Icon name="star" color={'grey'} />}
      placeholderSymbol={<Icon name="star" color={'grey'} />}
    />
  );
};

const renderRatingPercentage = (row: any) => {
  return <p>{row.rating_percentage}</p>;
};

const renderProductReview = (row: any) => {
  return <p>{showNAIfZeroOrNull(row.product_review, row.product_review)}</p>;
};

const renderLastUpdate = (row: any) => {
  return <p>{formatCompletedDate(row.last_update)}</p>;
};

const renderTrackProducts = (row: any) => {
  return <TrackSeller tracking={row.tracking} />;
};
const columns = [
  {
    label: `Buybox \n Competition`,
    dataKey: 'buy_box',
    className: 'buy-box',
    render: renderBuyBox,
  },
  {
    label: `Product Inventory Information`,
    dataKey: 'product_name',
    className: 'product-inventory',
    render: renderProductInventory,
  },
  {
    label: `In Stock`,
    dataKey: 'in_stock',
    className: 'in-stock',
    render: renderInStock,
  },
  {
    label: `Price`,
    dataKey: 'price',
    className: 'price',
    render: renderPrice,
  },
  {
    label: `Rating \nL365D`,
    dataKey: 'rating',
    className: 'product-rating',
    render: renderRating,
  },
  {
    label: `Rating \nL365D%`,
    dataKey: 'rating_percentage',
    className: 'product-rating',
    render: renderRatingPercentage,
  },
  {
    label: `Product \nReview #`,
    dataKey: 'product_review',
    className: 'product-review',
    render: renderProductReview,
  },
  {
    label: `Last Update`,
    dataKey: 'last_update',
    className: 'last-update',
    render: renderLastUpdate,
  },
  {
    label: `Track Products`,
    dataKey: 'tracking',
    className: 'track-products',
    render: renderTrackProducts,
  },
];

export const InventoryProductsHeader = () => {
  return (
    <div className="inventory-header">
      {columns.map(column => (
        <div className={`th-column ${column.className}`} key={column.dataKey}>
          <p>{column.label}</p>
        </div>
      ))}
    </div>
  );
};

export const InventoryProductsRow = () => {
  const data = [
    {
      id: 1,
      buy_box: 5,
      product_name: `Mydethun Moon Lamp Moon Light Night Light for Kids Gift for Women
         USB Charging and Touch Control Brightness 3D Printed Warm and Cool
          White Lunar Lamp(3.5In moon lamp with stand)`,
      image: 'https://images-na.ssl-images-amazon.com/images/I/71xJihIVjML._AC_SL1500_.jpg',
      asin: 'B074QM7756',
      in_stock: true,
      price: 12.99,
      rating: 4.5,
      rating_percentage: '98% Positive',
      product_review: 2100,
      last_update: '7/21/2020, 1:45 PM',
      tracking: false,
    },
  ];

  const render = (dataKey: string, row: any) => {
    const column = columns.find((c: any) => c.dataKey === dataKey);
    return column ? (
      <div key={column.dataKey} className={`td-column ${column.className}`}>
        {column.render(row)}
      </div>
    ) : (
      undefined
    );
  };

  const renderRow = (row: any) => {
    return Object.keys(row).map((key: any) => render(key, row));
  };
  return (
    <div className="inventory-row">
      {data.map((row: any) => (
        <React.Fragment key={row.id}>{renderRow(row)}</React.Fragment>
      ))}
    </div>
  );
};
