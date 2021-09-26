import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Actions */
import { setCentralExportProgress } from '../../../../../actions/SellerResearch/SellerInventory';

/* COnstansts */
import {
  SELLER_INVENTORY_EXPORT_FILE_TYPES,
  SELLER_INVENTORY_EXPORT_SOCKET_STATUS,
} from '../../../../../constants/SellerResearch/SellerInventory';

/* Config & utils */
import { AppConfig } from '../../../../../config';
import { downloadFile } from '../../../../../utils/download';
import { error, success } from '../../../../../utils/notifications';

/* Interfaces */
import { CentralExportProgress } from '../../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  children: React.ReactNode;
}

/* Seller Inventory Export context */
export const SellerInventoryProductsTableExportContext = createContext<any>(null);

/* Seller Inventory Export Consumer as hook */
export const useExportSocket = () => useContext(SellerInventoryProductsTableExportContext);

interface Props {
  setCentralExportProgress: (payload: CentralExportProgress) => void;
  children: React.ReactNode;
}

const SellerInventoryProductsTableExportProvider = (props: Props) => {
  const { children, setCentralExportProgress } = props;

  const [exportSocket, setExportSocket] = useState<WebSocket>();

  const sellerId = localStorage.getItem('userId') || '';
  const idToken = localStorage.getItem('idToken') || '';
  const URL = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/export-products?token=${idToken}`;

  useEffect(() => {
    const socketConnection = new WebSocket(URL);
    socketConnection.onopen = () => {
      setExportSocket(socketConnection);
    };

    return () => {
      if (exportSocket) {
        exportSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!exportSocket) {
      return;
    }

    // execute only if the export socket exists
    if (exportSocket) {
      // if exportSocket is open and not in connecting state
      if (exportSocket.OPEN && !exportSocket.CONNECTING) {
        // wehn incoming message is present from server
        exportSocket.onmessage = async e => {
          const payload = JSON.parse(e.data);

          const { status, progress } = payload;

          const isCompleted = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.SUCCESS;
          const isPending = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.PENDING;
          const isFailed = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.FAILED;

          // if the export send failed message (subscription)
          if (isFailed) {
            setCentralExportProgress({
              showProgress: false,
              progress: 0,
              status: '',
            });

            if (payload.message) {
              error(payload.message);
            }

            return;
          }

          // if the export is pending
          if (isPending) {
            setCentralExportProgress({
              showProgress: true,
              progress,
              status,
            });
            return;
          }

          // if the export is completed
          if (isCompleted) {
            const fileType = localStorage.getItem('sellerInventoryProductsTableExportFile');

            if (fileType) {
              if (fileType === SELLER_INVENTORY_EXPORT_FILE_TYPES.XLSX && payload.excel_path) {
                await downloadFile(payload.excel_path);
                success('File successfully downloaded');
                localStorage.removeItem('sellerInventoryProductsTableExportFile');
                handleReconnectSocket();
                return;
              }

              if (fileType === SELLER_INVENTORY_EXPORT_FILE_TYPES.CSV && payload.csv_path) {
                await downloadFile(payload.csv_path);
                success('File downloaded successfully');
                localStorage.removeItem('sellerInventoryProductsTableExportFile');
                handleReconnectSocket();
                return;
              }
            }
          }
        };
      }

      // when exportSocket connection is closed
      exportSocket.onclose = () => {
        setCentralExportProgress({
          showProgress: false,
          progress: 0,
          status: '',
        });
      };
    }
  }, [exportSocket]);

  /* Main handle export function to send payload to sockets */
  const handleExport = (type: 'xlsx' | 'csv', merchantId: number) => {
    localStorage.setItem('sellerInventoryProductsTableExportFile', type);
    const payload = JSON.stringify({ start_report: true, merchant_id: merchantId });
    if (exportSocket) {
      if (exportSocket.OPEN) {
        exportSocket.send(payload);
      }
    }
  };

  /* Handle re-connection after exportSocket closes */
  const handleReconnectSocket = () => {
    const exportSocket = new WebSocket(URL);
    setExportSocket(exportSocket);
  };

  return (
    <SellerInventoryProductsTableExportContext.Provider value={{ exportSocket, handleExport }}>
      {children}
    </SellerInventoryProductsTableExportContext.Provider>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCentralExportProgress: (payload: CentralExportProgress) =>
      dispatch(setCentralExportProgress(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SellerInventoryProductsTableExportProvider);
