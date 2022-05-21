import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  fetchSellersForMap,
  fetchSellersListForMap,
  updateSellerMapFilterOptions,
} from '../../../../actions/SellerResearch/SellerMap';

/* Selectors */
import {
  getIsLoadingSellersListForMap,
  getSellersListForMap,
  getSellersListForMapPaginationInfo,
  getSellerMapFilterData,
  getIsLoadingSellerForMap,
} from '../../../../selectors/SellerResearch/SellerMap';

/* Components */
import Placeholder from '../../../../components/Placeholder';
import SellerListMapCard from '../../../../components/SellerListMapCard';
import Pagination from '../../../../components/NewTable/Pagination';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import ToggleButton from '../../../../components/ToggleButton';

/* Interfaces */
import {
  SellerMapPayload,
  SellersListPaginationInfo,
  SellersListPayload,
  UpdateSellerMapFilterPayload,
} from '../../../../interfaces/SellerResearch/SellerMap';
import { SELLERS_LIST_SORTING_OPTIONS } from '../../../../constants/SellerResearch/SellerMap';
import { timeout } from '../../../../utils/timeout';
import { parseSellerMapFilterData } from '../../../../constants/SellerResearch';

interface Props {
  isLoadingSellersForMap: boolean;
  sellerMapFilterData: any[];
  isLoadingSellersListForMap: boolean;
  sellersListForMap: any[];
  sellersListForMapPaginationInfo: SellersListPaginationInfo;
  fetchSellersListForMap: (payload: SellersListPayload) => void;
  updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) => void;
  fetchSellersForMap: (payload: SellerMapPayload) => void;
}

const SellersList = (props: Props) => {
  const {
    fetchSellersListForMap,
    sellerMapFilterData,
    sellersListForMap,
    sellersListForMapPaginationInfo,
    isLoadingSellersListForMap,
    isLoadingSellersForMap,
    updateSellerMapFilterOptions,
    fetchSellersForMap,
  } = props;

  const [sortBy, setSortBy] = useState('seller_id?asc');
  const sellerType = parseSellerMapFilterData(sellerMapFilterData, 'seller_type');
  const [isWholesale, setIsWholesale] = useState<boolean>(sellerType?.value === 'wholesale');

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

  const handleWholesaleChange = async () => {
    const newWholesaleState = !isWholesale;
    const [sort, sortDir] = sortBy.split('?');
    updateSellerMapFilterOptions({
      keyName: 'seller_type',
      value: newWholesaleState ? 'wholesale' : 'private_label',
    });
    await timeout(500);
    fetchSellersListForMap({
      sort,
      sortDir: sortDir === 'asc' ? 'asc' : 'desc',
      isWholesale: newWholesaleState,
    });
    fetchSellersForMap({ enableLoader: true });
    setIsWholesale(newWholesaleState);
  };

  /* Page Change */
  const handlePageChange = (pageNo: number) => {
    fetchSellersListForMap({
      page: pageNo,
    });
  };

  if (isLoadingSellersForMap || isLoadingSellersListForMap) {
    return (
      <div className={styles.sellersListWrapper}>
        <Placeholder numberParagraphs={10} numberRows={5} isGrey />
      </div>
    );
  }
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
        {sellersListForMap &&
          !isLoadingSellersListForMap &&
          !isLoadingSellersForMap &&
          sellersListForMap.map((details: any, index: number) => {
            return <SellerListMapCard key={index} sellerDetails={details} />;
          })}
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
    updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) =>
      dispatch(updateSellerMapFilterOptions(payload)),
    fetchSellersForMap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
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
