import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchSellerInventoryTableResults } from '../../../../actions/SellerResearch/SellerInventory';

/* Config and Utils */
import { AppConfig } from '../../../../config';
import { error, success } from '../../../../utils/notifications';

/* Constants */
import { SELLER_INVENTORY_EXPORT_SOCKET_STATUS } from '../../../../constants/SellerResearch/SellerInventory';

/* Interfaces */
import {
  CheckInventorySocketMessage,
  SellerInventoryTablePayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';
import { formatNumber } from '../../../../utils/format';

interface CheckInventoryFn {
  handleCheckInventory: (merchantIds: string) => void;
}

/* Find/Refresh Seller Context */
export const CheckInventoryContext = createContext<any>(null);

/* Find/Refresh Seller COnsume */
export const useCheckInventory = (): CheckInventoryFn => useContext(CheckInventoryContext);

interface Props {
  children: React.ReactNode;
  fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) => void;
}

const CheckInventoryProvider = (props: Props) => {
  const { children, fetchSellerInventoryTableResults } = props;

  const [checkInventorySocket, setCheckInventrorySocket] = useState<WebSocket>();

  const sellerId = localStorage.getItem('userId') || '';
  const idToken = localStorage.getItem('idToken') || '';
  const URL = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/inventory/search?token=${idToken}`;

  useEffect(() => {
    const socketConnection = new WebSocket(URL);
    socketConnection.onopen = () => {
      setCheckInventrorySocket(socketConnection);
    };

    return () => {
      if (checkInventorySocket) {
        checkInventorySocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!checkInventorySocket) {
      return;
    }

    // execute only if the export socket exists
    if (checkInventorySocket) {
      // if findRefreshSocket is open and not in connecting state
      if (checkInventorySocket.OPEN && !checkInventorySocket.CONNECTING) {
        // wehn incoming message is present from server
        checkInventorySocket.onmessage = async e => {
          const payload = JSON.parse(e.data);

          const {
            message,
            status,
            products_count = null,
            is_top_level = null,
            error_status = false,
          } = payload as CheckInventorySocketMessage;

          const isDone = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.DONE;
          const isFailed = status === SELLER_INVENTORY_EXPORT_SOCKET_STATUS.FAILED;

          // if the export send failed message (subscription)
          if (isFailed) {
            if (message) {
              error(message);
            }
            return;
          }

          // if there is error status
          if (error_status && message) {
            error(payload.message);
            return;
          }

          // if the export is completed
          if (isDone) {
            // for top level just refresh the table
            if (is_top_level) {
              success(`Found ${formatNumber(products_count)} products for seller.`);
              fetchSellerInventoryTableResults({ enableLoader: false });
              return;
            }
          }
        };
      }

      // when findRefreshSocket connection is closed
      checkInventorySocket.onclose = () => {
        console.log('Check Inventory socket closed');
      };
    }
  }, [checkInventorySocket]);

  /* Main handle export function to send payload to sockets */
  const handleCheckInventory = (merchantIds: string) => {
    const payload = JSON.stringify({
      merchant_ids: merchantIds,
    });
    if (checkInventorySocket) {
      if (checkInventorySocket.OPEN) {
        checkInventorySocket.send(payload);
      }
    }
  };

  /* Handle re-connection after exportSocket closes */
  // const handleReconnectSocket = () => {
  //   const findRefreshSocket = new WebSocket(URL);
  //   setCheckInventrorySocket(findRefreshSocket);
  // };

  return (
    <CheckInventoryContext.Provider value={{ handleCheckInventory }}>
      {children}
    </CheckInventoryContext.Provider>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) =>
      dispatch(fetchSellerInventoryTableResults(payload)),
  };
};

export default connect(null, mapDispatchToProps)(CheckInventoryProvider);
