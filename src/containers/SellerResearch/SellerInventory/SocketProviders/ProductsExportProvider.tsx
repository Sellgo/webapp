import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Actions */
import { setCentralExportProgress } from '../../../../actions/SellerResearch/SellerInventory';

/* COnstansts */
import {
  SELLER_INVENTORY_EXPORT_FILE_TYPES,
  SELLER_INVENTORY_EXPORT_SOCKET_STATUS,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Config & utils */
import { AppConfig } from '../../../../config';
import { downloadFile } from '../../../../utils/download';
import { error, success } from '../../../../utils/notifications';

/* Interfaces */
import {
  CentralExportProgress,
  ExportSocketMessage,
} from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  children: React.ReactNode;
}

interface SendPayload {
  type: 'xlsx' | 'csv';
  merchantId: number;
}

interface ProductsExportFn {
  handleProductsExport: (payload: SendPayload) => void;
}

/* Seller Inventory Export context */
export const SellerInventoryProductsTableExportContext = createContext<any>(null);

/* Seller Inventory Export Consumer as hook */
export const useProductsExportSocket = (): ProductsExportFn =>
  useContext(SellerInventoryProductsTableExportContext);

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

          const {
            status,
            progress,
            message,
            excel_path = '',
            csv_path = '',
          } = payload as ExportSocketMessage;

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

            if (message) {
              error(message);
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
              if (fileType === SELLER_INVENTORY_EXPORT_FILE_TYPES.XLSX && excel_path) {
                await downloadFile(excel_path);
                success('File successfully downloaded');
                localStorage.removeItem('sellerInventoryProductsTableExportFile');
                handleReconnectSocket();
                return;
              }

              if (fileType === SELLER_INVENTORY_EXPORT_FILE_TYPES.CSV && csv_path) {
                await downloadFile(csv_path);
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
  const handleProductsExport = (payload: SendPayload) => {
    const { merchantId, type } = payload;
    localStorage.setItem('sellerInventoryProductsTableExportFile', type);

    const sendPayload = JSON.stringify({ start_report: true, merchant_id: merchantId });

    if (exportSocket) {
      if (exportSocket.OPEN) {
        exportSocket.send(sendPayload);
      }
    }
  };

  /* Handle re-connection after exportSocket closes */
  const handleReconnectSocket = () => {
    const exportSocket = new WebSocket(URL);
    setExportSocket(exportSocket);
  };

  return (
    <SellerInventoryProductsTableExportContext.Provider value={{ handleProductsExport }}>
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
