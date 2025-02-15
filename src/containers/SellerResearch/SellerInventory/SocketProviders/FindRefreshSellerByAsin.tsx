import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Actions */
import {
  fetchSellerInventoryProductsTableResults,
  fetchSellerInventoryTableResults,
} from '../../../../actions/SellerResearch/SellerInventory';

/* Config and Utils */
import { AppConfig } from '../../../../config';
import { error, success } from '../../../../utils/notifications';
import { formatNumber } from '../../../../utils/format';

/* Constants */
import { SELLER_INVENTORY_EXPORT_SOCKET_STATUS } from '../../../../constants/SellerResearch/SellerInventory';

/* Interfaces */
import {
  FindRefreshSellerSocketMessage,
  SellerInventoryProductsTablePayload,
  SellerInventoryTablePayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';

/* Find/Refresh Seller Context */
export const FindRefreshSellerByAsinContext = createContext<any>(null);

interface SendPayload {
  asins: string;
  parentAsin: boolean;
  merchantId?: number;
  sellerInventoryTableExpandedRowId?: number;
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
  fetchSellerInventoryProductsTableResults: (payload: SellerInventoryProductsTablePayload) => void;
}

const FindRefreshSellerByAsinProvider = (props: Props) => {
  const {
    fetchSellerInventoryProductsTableResults,
    fetchSellerInventoryTableResults,
    children,
  } = props;

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
                //get the expanded the row ID from local storage
                const rowId = Number.parseFloat(
                  localStorage.getItem('sellerInventoryTableExpandedRowId') || '0'
                );

                if (rowId && rowId !== 0) {
                  fetchSellerInventoryProductsTableResults({
                    enableLoader: false,
                    rowId,
                  });
                }
                success(`Found ${formatNumber(merchants_count)} sellers for product`);

                return;
              }
            }
          }
        };
      }

      // when findRefreshByAsinSocket connection is closed
      findRefreshByAsinSocket.onclose = () => {
        console.log('Find or refresh socket by asin closed');
      };
    }
  }, [findRefreshByAsinSocket]);

  /* Main handle export function to send payload to sockets */
  const handleFindOrRefreshByAsin = (payload: SendPayload) => {
    const { asins, merchantId, parentAsin, sellerInventoryTableExpandedRowId } = payload;

    let payloadInfo;

    // if top level asin search/find
    if (!parentAsin) {
      payloadInfo = {
        asins,
      };
    }
    // if nested varaint just back asins, merchantId and parent_asin=true
    else {
      payloadInfo = {
        asins,
        merchant_id: merchantId,
        parent_asin: parentAsin,
      };
    }

    //store the expanded row ID in local storage
    localStorage.setItem(
      'sellerInventoryTableExpandedRowId',
      String(sellerInventoryTableExpandedRowId)
    );

    const sendPayload = JSON.stringify(payloadInfo);

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
    fetchSellerInventoryProductsTableResults: (payload: SellerInventoryProductsTablePayload) =>
      dispatch(fetchSellerInventoryProductsTableResults(payload)),
  };
};

export default connect(null, mapDispatchToProps)(FindRefreshSellerByAsinProvider);
