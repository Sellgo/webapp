import React from 'react';
import SellerFinderTable from './SellerFinderTable';
import './index.scss';
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
interface SellerFinderProps {
  match: any;
}
const SellerFinder = (props: SellerFinderProps) => {
  const { match } = props;
  return (
    <div className="seller-finder">
      <PageHeader
        title={'Seller Finder'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Finder', to: '/seller-finder' },
        ]}
        callToAction={<QuotaMeter />}
        auth={match.params.auth}
      />
      <SellerFinderTable />
    </div>
  );
};

export default SellerFinder;
