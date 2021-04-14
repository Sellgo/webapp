import React from 'react';
import './index.scss';
import Rating from 'react-rating';
import { Button, Icon } from 'semantic-ui-react';
import { formatBoolean, formatCurrency, showNAIfZeroOrNull } from '../../../../utils/format';
import { formatCompletedDate } from '../../../../utils/date';
import TrackSeller from '../TrackSeller';
const renderSellerName = (row: any) => {
  return (
    <p>
      <span className="name">{showNAIfZeroOrNull(row.name, row.name)}</span>
      <span className="asin">{row.asin}</span>
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

const renderTotalRating = (row: any) => {
  return <p>{showNAIfZeroOrNull(row.total_rating, row.total_rating)}</p>;
};

const renderProcessedOn = (row: any) => {
  return <p>{formatCompletedDate(row.processed_on)}</p>;
};

const renderTrackSeller = (row: any) => {
  return <TrackSeller tracking={row.tracking} type={'seller'} />;
};
const columns = [
  {
    renderLabel: () => <p>Seller Name</p>,
    dataKey: 'name',
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
    renderLabel: () => <p>FBA</p>,
    dataKey: 'fba',
    className: 'fba',
    render: renderFBA,
  },
  {
    renderLabel: () => <p>FBM</p>,
    dataKey: 'fbm',
    className: 'fbm',
    render: renderFBM,
  },
  {
    renderLabel: () => <p>{`Rating \nL365D`}</p>,
    dataKey: 'rating',
    className: 'product-rating',
    render: renderRating,
  },
  {
    renderLabel: () => <p>{`Rating% \nL365D`}</p>,
    dataKey: 'rating_percentage',
    className: 'product-rating',
    render: renderRatingPercentage,
  },
  {
    renderLabel: () => <p>{`Total \nRating`}</p>,
    dataKey: 'total_rating',
    className: 'total_rating',
    render: renderTotalRating,
  },
  {
    renderLabel: () => <p>Processed on</p>,
    dataKey: 'processed_on',
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

export const SellersRow = () => {
  const data = [
    {
      id: 1,
      name: 'Kikkoman',
      asin: 'B074QM7756',
      price: 12.99,
      fba: true,
      fbm: false,
      rating: 4.5,
      rating_percentage: '98% Positive',
      total_rating: 538,
      processed_on: '7/21/2020, 1:45 PM',
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
    <div className="sellers-row">
      {data.map((row: any) => (
        <React.Fragment key={row.id}>{renderRow(row)}</React.Fragment>
      ))}
    </div>
  );
};
