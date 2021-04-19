import React, { useEffect } from 'react';
import SellerFinderTable from './SellerFinderTable';
import './index.scss';
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
interface SellerFinderProps {
  match: any;
}
const SellerFinder = (props: SellerFinderProps) => {
  const [webSocket, setWebSocket] = React.useState<any>({});

  useEffect(() => {
    const sellerId = sellerIDSelector();
    const socketUrl = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/search`;
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      console.log('socket connected');
      setWebSocket(ws);
    };
    return () => ws.close();
  }, []);
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
      <SellerFinderTable ws={webSocket} />
    </div>
  );
};
export default SellerFinder;
