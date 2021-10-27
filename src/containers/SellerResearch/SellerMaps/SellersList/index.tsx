import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellersListForMap } from '../../../../actions/SellerResearch/SellerMap';

/* Selectors */
import {
  getIsLoadingSellersListForMap,
  getSellersListForMap,
  getSellersListForMapPaginationInfo,
} from '../../../../selectors/SellerResearch/SellerMap';

/* Components */
import SellerListMapCard from '../../../../components/SellerListMapCard';

/* Interfaces */
import {
  SellersListPaginationInfo,
  SellersListPayload,
} from '../../../../interfaces/SellerResearch/SellerMap';

interface Props {
  isLoadingSellersListForMap: boolean;
  sellersListForMap: any[];
  sellersListForMapPaginationInfo: SellersListPaginationInfo;
  fetchSellersListForMap: (payload: SellersListPayload) => void;
}

const SellersList = (props: Props) => {
  const { fetchSellersListForMap, sellersListForMap } = props;

  useEffect(() => {
    fetchSellersListForMap({});
  }, []);

  return (
    <div className={styles.sellersListWrapper}>
      {sellersListForMap &&
        sellersListForMap.map((details: any) => {
          return <SellerListMapCard key={details.merchant_id} />;
        })}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellersListForMap: (payload: SellersListPayload) =>
      dispatch(fetchSellersListForMap(payload)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellersListForMap: getIsLoadingSellersListForMap(state),
    sellersListForMap: getSellersListForMap(state),
    sellersListForMapPaginationInfo: getSellersListForMapPaginationInfo(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellersList);
