import React from 'react';
import './index.scss';
import Rating from 'react-rating';
import { Icon } from 'semantic-ui-react';
import TrackSeller from '../TrackSeller';
import { formatCompletedDate } from '../../../../utils/date';
import { formatBoolean } from '../../../../utils/format';
import CheckMerchants from '../CheckMerchants';
import CopyToClipboard from '../../../../components/CopyToClipboard';

const renderProductInventory = (row: any) => {
  return (
    <p>
      <span className="product-inner-container">
        <span>
          <img src={row.image_url} alt={'product-image'} className="product-image" />
        </span>
        <span className="product-info">
          <span className="product-name"> {row.product_name}</span>
          <CopyToClipboard data={row.asin} className={'asin'} />
        </span>
      </span>
    </p>
  );
};

const renderFBA = (row: any) => {
  return <p>{formatBoolean(row.fba)}</p>;
};

const renderFBM = (row: any) => {
  return <p>{formatBoolean(row.fbm)}</p>;
};

const renderPrice = (row: any) => {
  return <p>{row.current_price}</p>;
};

const renderRating = (row: any) => {
  const ratingValue = row.review_stars || '0';
  return (
    <Rating
      placeholderRating={Number.parseInt(ratingValue.trim())}
      emptySymbol={<Icon name="star outline" color={'grey'} />}
      fullSymbol={<Icon name="star" color={'grey'} />}
      placeholderSymbol={<Icon name="star" color={'grey'} />}
      readonly
    />
  );
};

const renderProductReview = (row: any) => {
  return <p>{row.reviews_count}</p>;
};

const renderLastUpdate = (row: any) => {
  return <p>{formatCompletedDate(row.udate)}</p>;
};

const renderTrackProducts = (row: any) => {
  return (
    <div className="product-merchant-track-container">
      <TrackSeller tracking={false} type={'product'} data={row} />
    </div>
  );
};

const renderBuybox = (row: any) => {
  return (
    <div className="product-merchant-track-container">
      <span className="buy-box-count">{row.num_sellers}</span>
      <div className="check-seller-btn">
        <CheckMerchants data={row} />
      </div>
    </div>
  );
};

const columns = [
  {
    label: `Buybox\n Competition`,
    dataKey: 'buy_box',
    className: 'buy-box',
    render: renderBuybox,
  },
  {
    label: `Product Inventory Information`,
    dataKey: 'product_name',
    className: 'product-inventory',
    render: renderProductInventory,
  },
  {
    label: `Price`,
    dataKey: 'current_price',
    className: 'price',
    render: renderPrice,
  },
  {
    label: `FBA`,
    dataKey: 'fba',
    className: 'fba',
    render: renderFBA,
  },
  {
    label: `FBM`,
    dataKey: 'fbm',
    className: 'fbm',
    render: renderFBM,
  },
  {
    label: `Rating L365D`,
    dataKey: 'review_stars',
    className: 'review_stars',
    render: renderRating,
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
    in_stock: false,
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

    let object = {
      asin: 'asin',
      product_id: 'product_id',
      tracking_status: 'tracking_status',
      product_track_id: 'product_track_id',
      image_url: 'image_url',
      num_sellers: 'num_sellers',
    };

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
