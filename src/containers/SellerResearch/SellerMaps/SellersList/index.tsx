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
import Pagination from '../../../../components/NewTable/Pagination';

/* Assets */
import sellgoAnimation from '../../../../assets/images/sellgo-loading-animation-450-1.gif';

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
  const {
    fetchSellersListForMap,
    sellersListForMap,
    sellersListForMapPaginationInfo,
    isLoadingSellersListForMap,
  } = props;

  useEffect(() => {
    fetchSellersListForMap({});
  }, []);

  const handlePageChange = (pageNo: number) => {
    fetchSellersListForMap({
      page: pageNo,
    });
  };

  return (
    <div className={styles.sellersListWrapper}>
      <div className={styles.sellerListFilters}>Filters will go here</div>

      <div className={styles.sellersList}>
        {isLoadingSellersListForMap ? (
          <img src={sellgoAnimation} alt="" className={styles.sellersListLoader} />
        ) : (
          <>
            {sellersListForMap &&
              sellersListForMap.map((details: any) => {
                return <SellerListMapCard key={details.merchant_id} sellerDetails={details} />;
              })}
          </>
        )}
      </div>

      <div className={styles.sellersListPagination}>
        {sellersListForMapPaginationInfo && sellersListForMapPaginationInfo.total_pages > 0 && (
          <Pagination
            currentPage={sellersListForMapPaginationInfo.current_page}
            totalPages={sellersListForMapPaginationInfo.total_pages}
            showSiblingsCount={3}
            onPageChange={handlePageChange}
          />
        )}
      </div>
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
