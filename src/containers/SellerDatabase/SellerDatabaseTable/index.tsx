import React from 'react';
import { Column, GenericTable } from '../../../components/Table';
import SellerCheckBoxHeader from './sellerCheckBoxHeader';
import './index.scss';

const SellerDatabaseTable = () => {
  const renderSellerInformation = (row: any) => {
    return <p>{row.merchant_name}</p>;
  };

  const renderSellerInventory = (row: any) => {
    return <p>{row.inventory}</p>;
  };

  const renderSellerRating = (row: any) => {
    return <p>{row.rating}</p>;
  };

  const renderSellerTotalRating = (row: any) => {
    return <p>{row.total_rating}</p>;
  };

  const renderSellerFBA = (row: any) => {
    return <p>{row.fba}</p>;
  };

  const renderSellerFBM = (row: any) => {
    return <p>{row.fbm}</p>;
  };

  const renderSellerReview30D = (row: any) => {
    return <p>{row.count_30}</p>;
  };

  const renderSellerReview90D = (row: any) => {
    return <p>{row.count_90}</p>;
  };

  const renderSellerReview365D = (row: any) => {
    return <p>{row.count_12_months}</p>;
  };

  const renderSellerReviewLifetime = (row: any) => {
    return <p>{row.count_all}</p>;
  };

  const renderProductReivew = (row: any) => {
    return <p>{row.review}</p>;
  };

  const renderCheckBox = () => <SellerCheckBoxHeader />;
  const Columns: Column[] = [
    {
      label: '',
      sortable: false,
      dataKey: 'checkboxes',
      show: true,
      check: true,
      render: renderCheckBox,
    },
    {
      label: 'Seller Information',
      dataKey: 'title',
      sortable: false,
      type: 'string',
      show: true,
      render: renderSellerInformation,
    },
    {
      label: 'inventory',
      dataKey: 'inventory',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerInventory,
    },
    {
      label: `Rating \nL365D`,
      dataKey: 'rating',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerRating,
    },
    {
      label: `Rating% \nL365D`,
      dataKey: 'total-rating',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerTotalRating,
    },
    {
      label: `FBA`,
      dataKey: 'fba',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerFBA,
    },
    {
      label: `FBM`,
      dataKey: 'fbm',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerFBM,
    },
    {
      label: `Review \nL30D`,
      dataKey: 'review_count_30',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview30D,
    },
    {
      label: `Review \nL90D`,
      dataKey: 'review_count_90',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview90D,
    },
    {
      label: `Review \nL365D`,
      dataKey: 'review_count_365',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview365D,
    },
    {
      label: `Review \nLifetime`,
      dataKey: 'review_lifetime',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReviewLifetime,
    },
    {
      label: `Product \nReview#`,
      dataKey: 'product_review',
      sortable: true,
      type: 'string',
      show: true,
      render: renderProductReivew,
    },
  ];

  return (
    <div>
      <GenericTable
        currentActiveColumn={''}
        stickyChartSelector={false}
        scrollTopSelector={false}
        data={[]}
        columns={Columns}
      />
    </div>
  );
};

export default SellerDatabaseTable;
