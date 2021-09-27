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

/* Find/Refresh Seller Context */
export const FindRefreshSellerContext = createContext<any>(null);

interface SendPayload {
  type: 'find' | 'refresh';
  merchantIds: string;
}

interface FindRefreshSellerFn {
  handleFindOrRefresh: (payload: SendPayload) => void;
}

/* Find/Refresh Seller COnsume */
export const useFindRefreshSeller = (): FindRefreshSellerFn => useContext(FindRefreshSellerContext);

interface Props {
  children: React.ReactNode;
  fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) => void;
}

const FindRefreshSellerProvider = (props: Props) => {
  const { children, fetchSellerInventoryTableResults } = props;

  const [findRefreshSocket, setFindRefreshSocket] = useState<WebSocket>();

  const sellerId = localStorage.getItem('userId') || '';
  const idToken = localStorage.getItem('idToken') || '';
  const URL = `${AppConfig.WEBSOCKET_URL}/sellers/${sellerId}/merchants/search?token=${idToken}`;

  useEffect(() => {
    const socketConnection = new WebSocket(URL);
    socketConnection.onopen = () => {
      setFindRefreshSocket(socketConnection);
    };

    return () => {
      if (findRefreshSocket) {
        findRefreshSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!findRefreshSocket) {
      return;
    }

    // execute only if the export socket exists
    if (findRefreshSocket) {
      // if findRefreshSocket is open and not in connecting state
      if (findRefreshSocket.OPEN && !findRefreshSocket.CONNECTING) {
        // wehn incoming message is present from server
        findRefreshSocket.onmessage = async e => {
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
            if (is_top_level) {
              if (merchants_count && merchants_count > 0) {
                fetchSellerInventoryTableResults({ enableLoader: false });
                success('Seller data updated');
                return;
              }
            }
          }
        };
      }

      // when findRefreshSocket connection is closed
      findRefreshSocket.onclose = () => {
        console.log('Find or refresh socket closed');
      };
    }
  }, [findRefreshSocket]);

  /* Main handle export function to send payload to sockets */
  const handleFindOrRefresh = (payload: SendPayload) => {
    const { merchantIds } = payload;

    const sendPayload = JSON.stringify({
      merchant_ids: merchantIds,
    });

    if (findRefreshSocket) {
      if (findRefreshSocket.OPEN) {
        findRefreshSocket.send(sendPayload);
      }
    }
  };

  /* Handle re-connection after exportSocket closes */
  // const handleReconnectSocket = () => {
  //   const findRefreshSocket = new WebSocket(URL);
  //   setFindRefreshSocket(findRefreshSocket);
  // };

  return (
    <FindRefreshSellerContext.Provider value={{ handleFindOrRefresh }}>
      {children}
    </FindRefreshSellerContext.Provider>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) =>
      dispatch(fetchSellerInventoryTableResults(payload)),
  };
};

export default connect(null, mapDispatchToProps)(FindRefreshSellerProvider);
