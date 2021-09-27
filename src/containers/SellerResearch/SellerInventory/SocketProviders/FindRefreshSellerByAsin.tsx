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
  FindRefreshSellerSocketMessage,
  SellerInventoryTablePayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';
import { formatNumber } from '../../../../utils/format';

/* Find/Refresh Seller Context */
export const FindRefreshSellerByAsinContext = createContext<any>(null);

interface SendPayload {
  asins: string;
  merchantIds: number;
  parentAsin: boolean;
}

interface FindRefreshSellerByAsinFn {
  handleFindOrRefreshByAsin: (payload: SendPayload) => void;
}

/* Find/Refresh Seller COnsume */
export const useFindRefreshSellerByAsin = (): FindRefreshSellerByAsinFn =>
  useContext(FindRefreshSellerByAsinContext);

interface Props {
  children: React.ReactNode;
  fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) => void;
}

const FindRefreshSellerByAsinProvider = (props: Props) => {
  const { children, fetchSellerInventoryTableResults } = props;

  const [findRefreshByAsinSocket, setFindRefreshByAsinSocket] = useState<WebSocket>();

  const sellerId = localStorage.getItem('userId') || '';
  const idToken = localStorage.getItem('idToken') || '';
  const URL = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/asin/search?token=${idToken}`;

  useEffect(() => {
    const socketConnection = new WebSocket(URL);
    socketConnection.onopen = () => {
      setFindRefreshByAsinSocket(socketConnection);
    };

    return () => {
      if (findRefreshByAsinSocket) {
        findRefreshByAsinSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!findRefreshByAsinSocket) {
      return;
    }

    // execute only if the export socket exists
    if (findRefreshByAsinSocket) {
      // if findRefreshByAsinSocket is open and not in connecting state
      if (findRefreshByAsinSocket.OPEN && !findRefreshByAsinSocket.CONNECTING) {
        // wehn incoming message is present from server
        findRefreshByAsinSocket.onmessage = async e => {
          const payload = JSON.parse(e.data);

          const {
            message,
            status,
            merchants_count = null,
            is_top_level = null,
            error_status = false,
          } = payload as FindRefreshSellerSocketMessage;

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
            if (is_top_level === true) {
              if (merchants_count && merchants_count > 0) {
                fetchSellerInventoryTableResults({ enableLoader: false });
                success('Seller data updated');
                return;
              }
            }

            // for the nested table fetch the sellers for merchant again & refresh table
            if (is_top_level === false) {
              // fetch the products table of the merchant, ask back for merhcnat id send
              if (merchants_count && merchants_count > 0) {
                fetchSellerInventoryTableResults({ enableLoader: false });
                success(`Found ${formatNumber(merchants_count)} sellers for product}`);
                return;
              }
            }
          }
        };
      }

      // when findRefreshByAsinSocket connection is closed
      findRefreshByAsinSocket.onclose = () => {
        console.log('Find or refresh socket closed');
      };
    }
  }, [findRefreshByAsinSocket]);

  /* Main handle export function to send payload to sockets */
  const handleFindOrRefreshByAsin = (payload: SendPayload) => {
    const { asins, merchantIds, parentAsin } = payload;

    const sendPayload = JSON.stringify({
      asins,
      merchant_id: merchantIds,
      parent_asin: parentAsin,
    });

    if (findRefreshByAsinSocket) {
      if (findRefreshByAsinSocket.OPEN) {
        findRefreshByAsinSocket.send(sendPayload);
      }
    }
  };

  /* Handle re-connection after exportSocket closes */
  // const handleReconnectSocket = () => {
  //   const findRefreshByAsinSocket = new WebSocket(URL);
  //   setFindRefreshByAsinSocket(findRefreshByAsinSocket);
  // };

  return (
    <FindRefreshSellerByAsinContext.Provider value={{ handleFindOrRefreshByAsin }}>
      {children}
    </FindRefreshSellerByAsinContext.Provider>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) =>
      dispatch(fetchSellerInventoryTableResults(payload)),
  };
};

export default connect(null, mapDispatchToProps)(FindRefreshSellerByAsinProvider);
