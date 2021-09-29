import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SellerFinderTable from './SellerFinderTable';
import './index.scss';
import PageHeader from '../../components/PageHeader';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
interface SellerFinderProps {
  match: any;
}
const SellerFinder = (props: SellerFinderProps) => {
  const [webSocket, setWebSocket] = React.useState<any>({});
  const [websocketInventory, setWebsocketInventory] = React.useState<any>({});
  const [websocketSellers, setWebsocketSellers] = React.useState<any>({});
  const [websocketMerchantsReport, setWebsocketMerchantsReport] = React.useState<any>({});
  const [websocketProductsReport, setWebsocketProductsReport] = React.useState<any>({});

  const sellerId = sellerIDSelector();
  const AUTH_TOKEN = `token=${localStorage.getItem('idToken')}`;
  const socketUrl = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/search?${AUTH_TOKEN}`;
  const socketUrlInventory = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/inventory/search?${AUTH_TOKEN}`;
  const socketUrlSellers = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/asin/search?${AUTH_TOKEN}`;
  const socketMerchantReport = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/export?${AUTH_TOKEN}`;
  const socketProductsReport = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/export-products?${AUTH_TOKEN}`;

  useEffect(() => {
    const wsInventory = new WebSocket(socketUrlInventory);
    const ws = new WebSocket(socketUrl);
    const wsSellers = new WebSocket(socketUrlSellers);
    const wsMerchantsReport = new WebSocket(socketMerchantReport);
    const wsProductsReport = new WebSocket(socketProductsReport);

    ws.onopen = () => {
      setWebSocket(ws);
    };

    wsInventory.onopen = () => {
      setWebsocketInventory(wsInventory);
    };

    wsSellers.onopen = () => {
      setWebsocketSellers(wsSellers);
    };

    wsMerchantsReport.onopen = () => {
      setWebsocketMerchantsReport(wsMerchantsReport);
    };

    wsProductsReport.onopen = () => {
      setWebsocketProductsReport(wsProductsReport);
    };

    return () => {
      wsInventory.close();
      wsSellers.close();
      ws.close();
      wsMerchantsReport.close();
    };
  }, []);
  const { match } = props;

  const reconnectExportSocket = () => {
    setWebsocketMerchantsReport(new WebSocket(socketMerchantReport));
  };

  const reconnectExportProductsSocket = () => {
    setWebsocketProductsReport(new WebSocket(socketProductsReport));
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="seller-finder">
        <PageHeader
          title={'Seller Finder'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Seller Finder', to: '/seller-finder' },
          ]}
          auth={match.params.auth}
        />
        <SellerFinderTable
          ws={webSocket}
          inventorySocket={websocketInventory}
          sellersSocket={websocketSellers}
          exportMerchantsSocket={websocketMerchantsReport}
          exportProductsSocket={websocketProductsReport}
          reconnectExportSocket={reconnectExportSocket}
          reconnectExportProductsSocket={reconnectExportProductsSocket}
        />
      </div>
    </DndProvider>
  );
};
export default SellerFinder;
