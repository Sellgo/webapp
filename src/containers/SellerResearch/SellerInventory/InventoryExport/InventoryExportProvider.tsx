import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Actions */
import { setSellerInventoryTableExport } from '../../../../actions/SellerResearch/SellerInventory';

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
import { SellerInventoryTableExportPayload } from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  children: React.ReactNode;
}

/* Seller Inventory Export context */
export const SellerInventoryExportContext = createContext<any>(null);

/* Seller Inventory Export Consumer as hook */
export const useExportSocket = () => useContext(SellerInventoryExportContext);

interface Props {
  setSellerInventoryTableExport: (payload: SellerInventoryTableExportPayload) => void;
  children: React.ReactNode;
}

const SellerInventoryExportProvider = (props: Props) => {
  const { children, setSellerInventoryTableExport } = props;

  const [exportSocket, setExportSocket] = useState<WebSocket>();

  const sellerId = localStorage.getItem('userId') || '';
  const idToken = localStorage.getItem('idToken') || '';
  const URL = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/export?token=${idToken}`;

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

          const { status } = payload;

          const isCompleted = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.SUCCESS;
          const isPending = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.PENDING;
          const isFailed = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.FAILED;

          // if the export send failed message (subscription)
          if (isFailed) {
            setSellerInventoryTableExport({
              progress: 0,
              message: '',
              status: '',
              type: 'merchant-export',
              showProgress: false,
            });

            if (payload.message) {
              error(payload.message);
            }

            return;
          }

          // if the export is pending
          if (isPending) {
            setSellerInventoryTableExport({
              ...payload,
              showProgress: true,
            });
            return;
          }

          // if the export is completed
          if (isCompleted) {
            const fileType = localStorage.getItem('sellerInventoryTableExportFile');

            if (fileType) {
              if (fileType === SELLER_INVENTORY_EXPORT_FILE_TYPES.XLSX && payload.excel_path) {
                await downloadFile(payload.excel_path);
                success('File successfully downloaded');
                localStorage.removeItem('sellerInventoryTableExportFile');
                handleReconnectSocket();
                return;
              }

              if (fileType === SELLER_INVENTORY_EXPORT_FILE_TYPES.CSV && payload.csv_path) {
                await downloadFile(payload.csv_path);
                success('File downloaded successfully');
                localStorage.removeItem('sellerInventoryTableExportFile');
                handleReconnectSocket();
                return;
              }
            }
          }
        };
      }

      // when exportSocket connection is closed
      exportSocket.onclose = () => {
        setSellerInventoryTableExport({
          progress: 0,
          message: '',
          status: '',
          type: 'merchant-export',
          showProgress: false,
        });
      };
    }
  }, [exportSocket]);

  /* Main handle export function to send payload to sockets */
  const handleExport = (type: 'xlsx' | 'csv') => {
    localStorage.setItem('sellerInventoryTableExportFile', type);
    const payload = JSON.stringify({ start_report: true });
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
    <SellerInventoryExportContext.Provider value={{ exportSocket, handleExport }}>
      {children}
    </SellerInventoryExportContext.Provider>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSellerInventoryTableExport: (payload: SellerInventoryTableExportPayload) =>
      dispatch(setSellerInventoryTableExport(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SellerInventoryExportProvider);
