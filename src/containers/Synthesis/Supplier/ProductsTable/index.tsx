import React from 'react';
import { connect } from 'react-redux';
import { Segment, Loader, Icon } from 'semantic-ui-react';
import './index.scss';
import { Product } from '../../../../interfaces/Product';
import get from 'lodash/get';
import { openSupplierProductDetailModal } from '../../../../actions/Modals';
import {
  updateProductTrackingStatus,
  setSupplierSinglePageItemsCount,
  searchSupplierProducts,
  updateProfitFinderProducts,
  setSupplierPageNumber,
} from '../../../../actions/Suppliers';
import { GenericTable, Column } from '../../../../components/Table';
import ProductDescription from './productDescription';
import DetailButtons from './detailButtons';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  showNAIfZeroOrNull,
} from '../../../../utils/format';
import { tableKeys } from '../../../../constants';
import { initialFilterRanges, findMinMax } from '../../../../constants/Suppliers';
import ProfitFinderFilterSection from '../../ProfitFinderFilterSection';
import ProductCheckBox from './productCheckBox';
import { columnFilter } from '../../../../constants/Products';
import _ from 'lodash';

import { supplierPageNumberSelector } from '../../../../selectors/Supplier';
import { isSubscriptionFree } from '../../../../utils/subscriptions';

interface ProductsTableProps {
  currentActiveColumn: string;
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  subscriptionType: string;
  supplierID: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  filteredProducts: Product[];
  filterData: any;
  productTrackerGroup: any;
  singlePageItemsCount: number;
  pageNumber: number;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    type?: string,
    supplierID?: any
  ) => void;
  openProductDetailModal: (product?: Product) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
  setPageNumber: (pageNumber: number) => void;
  searchProducts: (value: string, filterData: any) => void;
  updateProfitFinderProducts: (data: any) => void;
}

export interface CheckedRowDictionary {
  [index: number]: boolean;
}

interface ProductsTableState {
  checkedRows: CheckedRowDictionary;
  searchValue: string;
  productRanges: any;
  filteredRanges: any;
  columnFilterData: any;
  ColumnFilterBox: boolean;
  columns: Column[];
  updateTracking: boolean;
}

class ProductsTable extends React.Component<ProductsTableProps> {
  state: ProductsTableState = {
    checkedRows: {},
    searchValue: '',
    productRanges: initialFilterRanges,
    filteredRanges: [],
    columnFilterData: columnFilter,
    ColumnFilterBox: false,
    columns: [],
    updateTracking: false,
  };

  UNSAFE_componentWillReceiveProps(props: any) {
    if (props.products && props.products !== this.props.products) {
      // Get min and max range for each filter setting based on all products
      const productRanges = findMinMax(props.products);
      this.setState({ productRanges });
    }
  }

  updateCheckedRows = (checkedRows: CheckedRowDictionary) => {
    this.setState({ checkedRows });
  };

  handleItemSelect = (e: any, isChecked: any, itemId: any) => {
    const { checkedRows } = this.state;
    const newCheckedRows = {
      ...checkedRows,
      [itemId]: isChecked,
    };

    this.setState({ checkedRows: newCheckedRows });
  };

  renderCheckBox = (row: Product) => {
    const { checkedRows } = this.state;
    let checked = false;
    if (checkedRows[row.id] !== undefined) {
      checked = checkedRows[row.id];
    }
    return <ProductCheckBox item={row} checked={checked} onClick={this.handleItemSelect} />;
  };
  renderProductInfo = (row: Product) => <ProductDescription item={row} />;
  renderPrice = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.price && row.price !== '0.00', formatCurrency(row.price))}
    </p>
  );

  renderCost = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.product_cost && row.product_cost !== '0.00',
        formatCurrency(row.product_cost)
      )}
    </p>
  );

  renderProfit = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.profit && row.profit !== '0.00', formatCurrency(row.profit))}
    </p>
  );
  renderMargin = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.margin && row.margin !== '0.00', formatPercent(row.margin))}
    </p>
  );
  renderFee = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.fees && row.fees !== '0.00', formatCurrency(row.fees))}
    </p>
  );
  renderMonthlyRevenue = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.monthly_revenue && row.monthly_revenue !== 0,
        '$' + formatNumber(row.monthly_revenue)
      )}
    </p>
  );
  renderRoi = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.roi && row.roi !== '0.00', formatPercent(row.roi))}
    </p>
  );
  renderRank = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.rank && row.rank !== 0, '#' + formatNumber(row.rank))}
    </p>
  );
  renderMonthlySalesEst = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.sales_monthly && row.sales_monthly !== '0.00',
        formatNumber(row.sales_monthly)
      )}
    </p>
  );
  renderCategory = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.amazon_category_name, row.amazon_category_name)}</p>
  );
  renderSizeTiers = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.size_tier, row.size_tier)}</p>
  );
  renderFbaFee = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.fba_fee && row.fba_fee !== '0.00', formatCurrency(row.fba_fee))}
    </p>
  );
  renderReferralFee = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.referral_fee && row.referral_fee !== '0.00',
        formatCurrency(row.referral_fee)
      )}
    </p>
  );
  renderVariableClosingFee = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.variable_closing_fee && row.variable_closing_fee !== '0.00',
        formatCurrency(row.variable_closing_fee)
      )}
    </p>
  );
  renderNumFbaNewOffers = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.num_fba_new_offers && row.num_fba_new_offers !== 0,
        formatNumber(row.num_fba_new_offers)
      )}
    </p>
  );
  renderNumFbmNewOffers = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.num_fbm_new_offers && row.num_fbm_new_offers !== 0,
        formatNumber(row.num_fbm_new_offers)
      )}
    </p>
  );
  renderLowNewFbaPrice = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.low_new_fba_price && row.low_new_fba_price !== '0.00',
        formatCurrency(row.low_new_fba_price)
      )}
    </p>
  );
  renderLowNewFbmPrice = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.low_new_fbm_price && row.low_new_fbm_price !== '0.00',
        formatCurrency(row.low_new_fbm_price)
      )}
    </p>
  );

  renderDetailButtons = (row: Product) => {
    const { updateProductTrackingStatus, supplierID } = this.props;
    const { updateTracking } = this.state;
    return (
      <DetailButtons
        score={row.sellgo_score}
        isTracking={row.tracking_status === 'active'}
        onTrack={async () => {
          if (!updateTracking) {
            await this.setState({ updateTracking: true });
            if (row.tracking_status !== null) {
              await updateProductTrackingStatus(
                row.tracking_status === 'active' ? 'inactive' : 'active',
                undefined,
                row.product_track_id,
                undefined,
                'supplier',
                supplierID
              );
              await this.setState({ updateTracking: false });
            } else {
              await updateProductTrackingStatus(
                'active',
                row.product_id,
                undefined,
                undefined,
                'supplier',
                supplierID
              );
              await this.setState({ updateTracking: false });
            }
          }
        }}
      />
    );
  };

  renderSyncButtons = () => {
    return (
      <div>
        <Icon name="sync alternate" style={{ color: '#98aec9' }} />
      </div>
    );
  };

  handleColumnChange = (e: any, data: any) => {
    e.stopPropagation();
    setTimeout(() => {
      this.setState({ ColumnFilterBox: true });
    }, 10);
    const checkedData = this.state.columnFilterData;
    if (data.label === 'Select All') {
      checkedData.forEach((element: any) => {
        if (element.key !== 'Product Information' || element.key !== '') {
          element.value = data.checked;
        }
      });
    } else {
      checkedData[checkedData.findIndex((element: any) => element.key === data.label)].value =
        data.checked;
      const ckArray: boolean[] = [];
      _.each(checkedData, (ckData: any) => {
        if (ckData.key !== '' && ckData.key !== 'Select All') {
          ckArray.push(ckData.value);
        }
      });
      checkedData[
        checkedData.findIndex((element: any) => element.key === 'Select All')
      ].value = ckArray.every((val: boolean) => {
        return val;
      });
    }
    this.setState({ columnFilterData: [...checkedData] });
  };
  searchFilteredProduct = (value: string) => {
    const {
      searchProducts,
      setSinglePageItemsCount,
      singlePageItemsCount,
      filterData,
    } = this.props;
    this.setState({
      searchValue: value,
    });
    searchProducts(value, filterData);
    setSinglePageItemsCount(singlePageItemsCount);
  };

  columns: Column[] = [
    {
      label: '',
      sortable: false,
      dataKey: 'checkboxes',
      show: true,
      check: true,
      render: this.renderCheckBox,
    },
    {
      label: 'Product Information',
      dataKey: 'title',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderProductInfo,
    },
    {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderPrice,
    },
    {
      label: 'Low New\nFBA Price',
      dataKey: 'low_new_fba_price',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderLowNewFbaPrice,
    },
    {
      label: 'Low New\nFBM Price',
      dataKey: 'low_new_fbm_price',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderLowNewFbmPrice,
    },
    {
      label: 'Cost',
      dataKey: 'product_cost',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderCost,
    },
    {
      label: 'Fees',
      dataKey: 'fees',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderFee,
    },
    {
      label: 'FBA Fee',
      dataKey: 'fba_fee',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderFbaFee,
    },
    {
      label: 'Referral\nFee',
      dataKey: 'referral_fee',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderReferralFee,
    },
    {
      label: 'Variable\nClosing Fee',
      dataKey: 'variable_closing_fee',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderVariableClosingFee,
    },
    {
      label: 'Profit',
      dataKey: 'profit',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderProfit,
    },
    {
      label: 'Margin',
      dataKey: 'margin',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderMargin,
    },
    {
      label: 'Monthly\nRevenue',
      dataKey: 'monthly_revenue',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderMonthlyRevenue,
    },
    {
      label: 'ROI',
      dataKey: 'roi',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderRoi,
    },
    {
      label: 'Rank',
      dataKey: 'rank',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderRank,
    },
    {
      label: 'Monthly \nSales Est',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderMonthlySalesEst,
    },
    {
      label: 'Category',
      dataKey: 'amazon_category_name',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderCategory,
    },
    {
      label: 'Size Tier',
      dataKey: 'size_tier',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderSizeTiers,
    },
    {
      label: 'Num New\nFBA Offers',
      dataKey: 'num_new_fba_offers',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderNumFbaNewOffers,
    },
    {
      label: 'Num New\nFBM Offers',
      dataKey: 'num_new_fbm_offers',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderNumFbmNewOffers,
    },
    {
      label: 'Tracking / Scoring',
      dataKey: 'sellgo_score',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderDetailButtons,
    },
    {
      label: '',
      icon: 'ellipsis horizontal ellipsis-ic',
      dataKey: 'ellipsis horizontal',
      show: true,
      // render: this.renderSyncButtons,
      popUp: true,
    },
  ];
  handleClick = () => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
  };

  handleColumnDrop = (e: any, data: any) => {
    this.setState({ columnFilterData: data });
  };
  reorderColumns = (columns: Column[]) => {
    this.setState({ columns });
  };
  componentDidMount(): void {
    this.setState({ columns: this.columns });
  }

  render() {
    const {
      isLoadingSupplierProducts,
      filteredProducts,
      singlePageItemsCount,
      setSinglePageItemsCount,
      updateProfitFinderProducts,
      pageNumber,
      setPageNumber,
      subscriptionType,
      scrollTopSelector,
      stickyChartSelector,
      currentActiveColumn,
    } = this.props;
    const { searchValue, productRanges, checkedRows, ColumnFilterBox } = this.state;
    const showTableLock = isSubscriptionFree(subscriptionType);
    const featuresLock = isSubscriptionFree(subscriptionType);

    // NOTE: temporarily filter products with ROIs greater than 300%
    const userEmail = localStorage.getItem('userEmail') || '';
    let tempFilteredProducts;
    if (['dev@sellgo.com', 'demo@sellgo.com', 'apobee.mcdonald@sellgo.com'].includes(userEmail)) {
      tempFilteredProducts = filteredProducts;
    } else {
      tempFilteredProducts = filteredProducts.filter(
        product => !product.roi || Number(product.roi) <= 300
      );
    }
    return (
      <div className="products-table">
        {isLoadingSupplierProducts ? (
          <Segment>
            <Loader active={true} inline="centered" size="massive">
              Loading
            </Loader>
          </Segment>
        ) : (
          <>
            <GenericTable
              currentActiveColumn={currentActiveColumn}
              stickyChartSelector={stickyChartSelector}
              scrollTopSelector={scrollTopSelector}
              tableKey={tableKeys.PRODUCTS}
              columns={this.state.columns}
              data={tempFilteredProducts}
              searchFilterValue={searchValue}
              showProductFinderSearch={true}
              searchFilteredProduct={this.searchFilteredProduct}
              updateProfitFinderProducts={updateProfitFinderProducts}
              singlePageItemsCount={singlePageItemsCount}
              setSinglePageItemsCount={setSinglePageItemsCount}
              currentPage={pageNumber}
              setPage={setPageNumber}
              name={'products'}
              showFilter={true}
              columnFilterBox={ColumnFilterBox}
              checkedRows={checkedRows}
              updateCheckedRows={this.updateCheckedRows}
              handleColumnChange={this.handleColumnChange}
              toggleColumnCheckbox={this.handleClick}
              columnFilterData={this.state.columnFilterData}
              middleScroll={true}
              renderFilterSectionComponent={() => (
                <ProfitFinderFilterSection productRanges={productRanges} />
              )}
              showTableLock={showTableLock}
              featuresLock={featuresLock}
              handleColumnDrop={this.handleColumnDrop}
              reorderColumns={this.reorderColumns}
              columnDnD={true}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  isLoadingSupplierProducts: get(state, 'supplier.isLoadingSupplierProducts'),
  products: get(state, 'supplier.products'),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  productTrackerGroup: get(state, 'supplier.productTrackerGroup'),
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
  filterData: get(state, 'supplier.filterData'),
  subscriptionType: get(state, 'subscription.subscriptionType'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  pageNumber: supplierPageNumberSelector(state),
  currentActiveColumn: get(state, 'supplier.activeColumn'),
});

const mapDispatchToProps = {
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    name?: string,
    supplierID?: any
  ) =>
    updateProductTrackingStatus(
      status,
      productID,
      productTrackerID,
      productTrackerGroupID,
      name,
      supplierID
    ),
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
  searchProducts: (value: string, productData: any) => searchSupplierProducts(value, productData),
  updateProfitFinderProducts: (data: any) => updateProfitFinderProducts(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
