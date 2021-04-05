import React from 'react';
import Rating from 'react-rating';
import { Column, GenericTable } from '../../../components/Table';
import './index.scss';
import EXPEND_ICON from '../../../assets/images/plus-square-regular.svg';
import { Icon } from 'semantic-ui-react';
import OtherSort from './OtherSort';
import SellerGroups from '../SellerGroups';
import SellerSearch from '../SellerSearch';

const SellerFinderTable = () => {
  const mockData = [
    {
      seller_name: 'Kikkoman',
      inventory: '67',
      rating: 4.5,
      rating_per: '98% Positive',
      total_rating: '655',
      fba: 'Yes',
      fbm: 'Yes',
      review_l30d: '321',
      review_l90d: '876',
      l365d: '3686',
      review_life_time: '5686',
      product_review: '2100',
      found_by: 'Seller Id',
      processed: '7/21/2020: 1:45 PM',
    },
  ];
  const renderSellerInformation = (row: any) => (
    <p className="sf-seller-details">
      <img
        src={EXPEND_ICON}
        style={{
          position: 'absolute',
          left: '70px',
          cursor: 'pointer',
        }}
      />
      <p className="name">{row.seller_name}</p>
      <span className="seller-id">
        AU12349G1 <Icon name={'copy outline'} />
      </span>
    </p>
  );
  const renderInventory = (row: any) => <p className="inventory-details">{row.inventory}</p>;
  const renderRatingL365D = (row: any) => (
    <p>
      <Rating
        placeholderRating={row.rating}
        emptySymbol={<Icon name="star outline" color={'grey'} />}
        fullSymbol={<Icon name="star" color={'grey'} />}
        placeholderSymbol={<Icon name="star" color={'grey'} />}
      />
    </p>
  );
  const renderRatingL365DPercentage = (row: any) => <p>{row.rating_per}</p>;
  const renderTotalRating = (row: any) => <p>{row.total_rating}</p>;
  const renderFBA = (row: any) => <p>{row.fba}</p>;
  const renderFBM = (row: any) => <p>{row.fbm}</p>;
  const renderReviewL30D = (row: any) => <p>{row.review_l30d}</p>;
  const renderReviewL90D = (row: any) => <p>{row.review_l90d}</p>;
  const renderReviewL365D = (row: any) => <p>{row.l365d}</p>;
  const renderReviewLifeTime = (row: any) => <p>{row.review_life_time}</p>;
  const renderProductReview = (row: any) => <p>{row.product_review}</p>;
  const renderProcessedOn = (row: any) => <p>{row.processed}</p>;
  const renderActions = (row: any) => (
    <p className="sf-actions">
      <span>
        <Icon name="refresh" color="grey" />
      </span>
      <OtherSort
        row={row}
        activeRow={row}
        handleUntrack={() => console.log('clicked')}
        group={[]}
        confirm={false}
        handleConfirmMessage={() => console.log('clicked')}
        handleCancel={() => console.log('clicked')}
        handleMoveGroup={() => console.log('clicked')}
      />
    </p>
  );

  const columns: Column[] = [
    {
      label: 'Seller Information',
      dataKey: 'seller_information',
      type: 'string',
      sortable: false,
      show: true,
      className: ``,
      render: renderSellerInformation,
    },
    {
      label: 'Inventory',
      dataKey: 'inventory',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderInventory,
    },
    {
      label: `Rating \nL365D`,
      dataKey: 'rating',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderRatingL365D,
    },
    {
      label: `Rating% \nL365D`,
      dataKey: 'rating',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderRatingL365DPercentage,
    },
    {
      label: `Total \nRating`,
      dataKey: 'total_rating',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderTotalRating,
    },
    {
      label: `Total \nRating`,
      dataKey: 'total_rating',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderTotalRating,
    },
    {
      label: `FBA`,
      dataKey: 'fba',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderFBA,
    },
    {
      label: `FBM`,
      dataKey: 'fbm',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderFBM,
    },
    {
      label: `Review\n L30D`,
      dataKey: 'review_l30d',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewL30D,
    },
    {
      label: `Review\n L90D`,
      dataKey: 'review_l90d',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewL90D,
    },
    {
      label: `Review\n L365D`,
      dataKey: 'review_l365d',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewL365D,
    },
    {
      label: `Review\n Lifetime`,
      dataKey: 'review_lifetime',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewLifeTime,
    },
    {
      label: `Product\n Review #`,
      dataKey: 'product_review',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderProductReview,
    },
    {
      label: `Processed on`,
      dataKey: 'processed',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderProcessedOn,
    },
    {
      dataKey: 'actions',
      type: 'string',
      show: true,
      className: ``,
      render: renderActions,
    },
  ];

  return (
    <div className="seller-finder-table">
      <div className="search-input-container">
        <SellerSearch />
      </div>
      <div className="seller-menu">
        <SellerGroups
          groups={[]}
          handleMenu={() => console.log('something')}
          open={false}
          deleteGroup={false}
          editGroup={false}
          error={false}
          groupError={false}
          items={[]}
          handleAddGroup={() => console.log('something')}
          handleAddGroupSubmit={() => console.log('something')}
          handleAddGroupCancel={() => console.log('something')}
          handleAddGroupNameChange={() => console.log('something')}
          handleDeleteGroup={() => console.log('something')}
          handleDeleteGroupCancel={() => console.log('something')}
          handleDeleteGroupSubmit={() => console.log('something')}
          handleEditGroup={() => console.log('something')}
          handleEditGroupCancel={() => console.log('something')}
          handleEditGroupSubmit={() => console.log('something')}
          editError={false}
          filteredProducts={() => console.log('something')}
          handleMoveGroup={() => console.log('something')}
        />

        <span>
          <Icon name="download" /> {'Export'}
        </span>
      </div>
      <GenericTable
        currentActiveColumn={''}
        stickyChartSelector={false}
        scrollTopSelector={false}
        data={mockData}
        columns={columns}
        name={'seller-finder'}
      />
    </div>
  );
};

export default SellerFinderTable;
