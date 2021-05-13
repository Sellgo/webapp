import React from 'react';
import './index.scss';
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import Filters from './Filters';
import SellerDatabaseTable from './SellerDatabaseTable';

const SellerDatabase = (props: any) => {
  const { match } = props;
  return (
    <div className="seller-database">
      <PageHeader
        title={`Seller Database`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Database', to: '/seller-finder' },
        ]}
        callToAction={<QuotaMeter />}
        auth={match.params.auth}
      />
      <div className="filters">
        <Filters />
      </div>
      <div className="table-container">
        <SellerDatabaseTable />
      </div>
    </div>
  );
};

export default SellerDatabase;
