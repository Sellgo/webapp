import React, { useEffect, useState } from 'react';
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
  getSellerMapFilterData,
  getIsLoadingSellerForMap,
} from '../../../../selectors/SellerResearch/SellerMap';

/* Components */
import SellerListMapCard from '../../../../components/SellerListMapCard';
import Pagination from '../../../../components/NewTable/Pagination';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import ToggleButton from '../../../../components/ToggleButton';

/* Assets */
import sellgoAnimation from '../../../../assets/images/sellgo-loading-animation-450-1.gif';

/* Interfaces */
import {
  SellersListPaginationInfo,
  SellersListPayload,
} from '../../../../interfaces/SellerResearch/SellerMap';
import { SELLERS_LIST_SORTING_OPTIONS } from '../../../../constants/SellerResearch/SellerMap';

interface Props {
  isLoadingSellersForMap: boolean;
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
    isLoadingSellersForMap,
  } = props;

  const [sortBy, setSortBy] = useState('seller_id?asc');
  const [isWholesale, setIsWholesale] = useState<boolean>(true);

  useEffect(() => {
    setIsWholesale(true);
  }, [isLoadingSellersForMap]);

  useEffect(() => {
    fetchSellersListForMap({});
  }, []);

  /* Sorting Change */
  const handleSortingChange = (value: string) => {
    if (value !== sortBy) {
      const [sort, sortDir] = value.split('?');
      fetchSellersListForMap({
        sort,
        sortDir: sortDir === 'asc' ? 'asc' : 'desc',
      });
      setSortBy(value);
    }
  };

  const handleWholesaleChange = () => {
    const [sort, sortDir] = sortBy.split('?');
    fetchSellersListForMap({
      sort,
      sortDir: sortDir === 'asc' ? 'asc' : 'desc',
      isWholesale: !isWholesale,
    });
    setIsWholesale(!isWholesale);
  };
  /* Page Change */
  const handlePageChange = (pageNo: number) => {
    fetchSellersListForMap({
      page: pageNo,
    });
  };

  return (
    <div className={styles.sellersListWrapper}>
      {/* Sellers List Filters */}
      <div className={styles.sellerListFilters}>
        <ToggleButton
          isToggled={isWholesale}
          handleChange={handleWholesaleChange}
          className={styles.toggleButton}
          options={['Private Label', 'Wholesale']}
        />
        <SelectionFilter
          label="Sort By"
          placeholder="Sort By"
          filterOptions={SELLERS_LIST_SORTING_OPTIONS}
          value={sortBy}
          handleChange={(value: string) => {
            handleSortingChange(value);
          }}
        />
      </div>

      {/* Main Sellers List */}
      <div className={styles.sellersList}>
        {isLoadingSellersListForMap || isLoadingSellersForMap ? (
          <img src={sellgoAnimation} alt="" className={styles.sellersListLoader} />
        ) : (
          <>
            {sellersListForMap &&
              sellersListForMap.map((details: any, index: number) => {
                return <SellerListMapCard key={index} sellerDetails={details} />;
              })}
          </>
        )}
      </div>

      {/* Sellers List Pagination */}
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
    sellerMapFilterData: getSellerMapFilterData(state),
    isLoadingSellersListForMap: getIsLoadingSellersListForMap(state),
    isLoadingSellersForMap: getIsLoadingSellerForMap(state),
    sellersListForMap: getSellersListForMap(state),
    sellersListForMapPaginationInfo: getSellersListForMapPaginationInfo(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellersList);
