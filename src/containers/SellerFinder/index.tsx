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
  const [websocketInventory, setWebsocketInventory] = React.useState<any>({});
  const [websocketSellers, setWebsocketSellers] = React.useState<any>({});

  useEffect(() => {
    const sellerId = sellerIDSelector();
    const socketUrl = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/search`;
    const socketUrlInventory = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/inventory/search`;
    const socketUrlSellers = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/asin/search`;

    const wsInventory = new WebSocket(socketUrlInventory);
    const ws = new WebSocket(socketUrl);
    const wsSellers = new WebSocket(socketUrlSellers);

    ws.onopen = () => {
      console.log('socket connected');
      setWebSocket(ws);
    };

    wsInventory.onopen = () => {
      console.log('inventory connected');
      setWebsocketInventory(wsInventory);
    };

    wsSellers.onopen = () => {
      console.log('sellers connected');
      setWebsocketSellers(wsSellers);
    };
    return () => {
      wsInventory.close();
      wsSellers.close();
      ws.close();
    };
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
      <SellerFinderTable
        ws={webSocket}
        inventorySocket={websocketInventory}
        sellersSocket={websocketSellers}
      />
    </div>
  );
};
export default SellerFinder;
