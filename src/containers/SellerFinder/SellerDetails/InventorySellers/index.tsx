import React from 'react';
import './index.scss';
import Rating from 'react-rating';
import { Button, Icon } from 'semantic-ui-react';
import { formatCurrency, truncateString } from '../../../../utils/format';
import { formatCompletedDate } from '../../../../utils/date';
import TrackSeller from '../TrackSeller';
const renderSellerName = (row: any) => {
  return (
    <p>
      <span className="name">{truncateString(row.merchant_name, 20)}</span>
      <span className="asin">{row.merchant_id}</span>
    </p>
  );
};

const renderPrice = (row: any) => {
  return <p>{formatCurrency(row.price)}</p>;
};

const renderRating = (row: any) => {
  return (
    <Rating
      placeholderRating={parseInt(`${row.seller_rating}`.trim())}
      emptySymbol={<Icon name="star outline" color={'grey'} />}
      fullSymbol={<Icon name="star" color={'grey'} />}
      placeholderSymbol={<Icon name="star" color={'grey'} />}
      readonly
    />
  );
};

const renderRatingPercentage = (row: any) => {
  return <p>{row.review_ratings}</p>;
};

const renderProcessedOn = (row: any) => {
  return <p>{formatCompletedDate(row.udate)}</p>;
};

const renderTrackSeller = (row: any) => {
  return <TrackSeller data={row} type={'seller'} />;
};
const columns = [
  {
    renderLabel: () => <p>Seller Name</p>,
    dataKey: 'merchant_name',
    className: 'seller-name',
    render: renderSellerName,
  },
  {
    renderLabel: () => <p>Price</p>,
    dataKey: 'price',
    className: 'price',
    render: renderPrice,
  },
  {
    renderLabel: () => <p>{`Rating \nL365D`}</p>,
    dataKey: 'seller_rating',
    className: 'product-rating',
    render: renderRating,
  },
  {
    renderLabel: () => <p>{`Rating% \nL365D`}</p>,
    dataKey: 'review_ratings',
    className: 'product-rating',
    render: renderRatingPercentage,
  },
  {
    renderLabel: () => <p>Processed on</p>,
    dataKey: 'udate',
    className: 'processed-on',
    render: renderProcessedOn,
  },
  {
    renderLabel: () => <Button primary>{'+ Track All Sellers'}</Button>,
    dataKey: 'tracking',
    className: 'track-sellers',
    render: renderTrackSeller,
  },
];

export const SellersProductsHeader = () => {
  return (
    <div className="sellers-header">
      {columns.map(column => (
        <div className={`th-column ${column.className}`} key={column.dataKey}>
          {column.renderLabel()}
        </div>
      ))}
    </div>
  );
};

export const SellersRow = ({ row }: any) => {
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
  const extraData = {
    total_rating: 0,
    fba: false,
    fbm: false,
    price: 0,
    tracking: false,
  };
  const renderRow = (row: any) => {
    const dataKeys = columns.map(({ dataKey }) => ({ [`${dataKey}`]: dataKey }));
    let object = {
      asin: 'asin',
      merchant_id: 'merchant_id',
      seller_merchant_id: 'seller_merchant_id',
      tracking_status: 'tracking_status',
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
    <div className="sellers-row">
      {[{ ...row, ...extraData }].map((row: any) => (
        <React.Fragment key={row.id}>{renderRow(row)}</React.Fragment>
      ))}
    </div>
  );
};
