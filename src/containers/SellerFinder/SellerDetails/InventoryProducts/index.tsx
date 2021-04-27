import React from 'react';
import './index.scss';
import Rating from 'react-rating';
import { Icon } from 'semantic-ui-react';
import SampleProductImage from '../../../../assets/images/Image 37.png';
import TrackSeller from '../TrackSeller';
import { formatCompletedDate } from '../../../../utils/date';
const renderBuyBox = () => {
  return <p>{'-'}</p>;
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

const renderInStock = () => {
  return <p>{'-'}</p>;
};

const renderPrice = (row: any) => {
  return <p>{row.current_price}</p>;
};

const renderRating = () => {
  return (
    <Rating
      placeholderRating={0}
      emptySymbol={<Icon name="star outline" color={'grey'} />}
      fullSymbol={<Icon name="star" color={'grey'} />}
      placeholderSymbol={<Icon name="star" color={'grey'} />}
    />
  );
};

const renderRatingPercentage = () => {
  return <p>{'-'}</p>;
};

const renderProductReview = (row: any) => {
  return <p>{row.reviews_count}</p>;
};

const renderLastUpdate = (row: any) => {
  return <p>{formatCompletedDate(row.udate)}</p>;
};

const renderTrackProducts = (row: any) => {
  return <TrackSeller tracking={false} type={'product'} data={row} />;
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
    dataKey: 'current_price',
    className: 'price',
    render: renderPrice,
  },
  {
    label: `Rating \nL365D`,
    dataKey: 'product_rating',
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
    dataKey: 'reviews_count',
    className: 'product-review',
    render: renderProductReview,
  },
  {
    label: `Last Update`,
    dataKey: 'udate',
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

export const InventoryProductsRow = (props: any) => {
  const { row } = props;
  const extraData = {
    buy_box: 0,
    in_stock: false,
    rating: 0,
    product_review: 0,
    last_update: '',
    tracking: false,
  };

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
    const dataKeys = columns.map(({ dataKey }) => ({ [`${dataKey}`]: dataKey }));
    let object = { asin: 'asin', product_id: 'product_id' };
    let data: any = row;
    dataKeys.forEach((obj: any) => {
      object = { ...object, ...obj };
      if (row[obj.key]) {
        data = { ...data, [obj.key]: row[obj.key] };
      }
    });

    const sorted = Object.keys(object).reduce((obj: any, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
    return Object.keys(sorted).map((key: any) => render(key, sorted));
  };
  return (
    <div className="inventory-row">
      {[{ ...row, ...extraData }].map((row: any) => (
        <React.Fragment key={row.id}>{renderRow(row)}</React.Fragment>
      ))}
    </div>
  );
};
