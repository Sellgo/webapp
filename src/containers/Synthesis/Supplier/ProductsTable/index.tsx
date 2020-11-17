import React from 'react';
import { connect } from 'react-redux';
import { Segment, Loader, Icon, Popup } from 'semantic-ui-react';
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
  triggerDataBuster,
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
import ProfitFinderFilterSection from '../../ProfitFinderFilterSection';
import ProductCheckBox from './productCheckBox';
import { columnFilter } from '../../../../constants/Products';
import _ from 'lodash';

import {
  supplierPageNumberSelector,
  supplierDetailsSelector,
} from '../../../../selectors/Supplier';
import { Supplier } from '../../../../interfaces/Supplier';
import { PRODUCT_ID_TYPES } from '../../../../constants/UploadSupplier';
import { formatCompletedDate } from '../../../../utils/date';

import { returnWithRenderMethod } from '../../../../utils/tableColumn';

interface ProductsTableProps {
  currentActiveColumn: string;
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
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
  supplierDetails: Supplier;
  productsLoadingDataBuster: number[];
  bustData: (synthesisFileID: number, productIDs: number[]) => void;
}

export interface CheckedRowDictionary {
  [index: number]: boolean;
}

interface ProductsTableState {
  checkedRows: CheckedRowDictionary;
  searchValue: string;
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
    filteredRanges: [],
    columnFilterData: columnFilter,
    ColumnFilterBox: false,
    columns: [],
    updateTracking: false,
  };

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

  renderASIN = (row: Product) => <p className="stat">{showNAIfZeroOrNull(row.asin, row.asin)}</p>;

  renderUPC = (row: Product) => <p className="stat">{showNAIfZeroOrNull(row.upc, row.upc)}</p>;

  renderPrice = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.price, formatCurrency(row.price))}</p>
  );

  renderCost = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.product_cost ? row.product_cost : row.default_cost,
        formatCurrency(row.product_cost ? row.product_cost : row.default_cost)
      )}
    </p>
  );

  renderProfit = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.multipack_profit, formatCurrency(row.multipack_profit))}
    </p>
  );
  renderMargin = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.multipack_margin, formatPercent(row.multipack_margin))}
    </p>
  );
  renderFee = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.fees, formatCurrency(row.fees))}</p>
  );
  renderMonthlyRevenue = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.monthly_revenue, '$' + formatNumber(row.monthly_revenue))}
    </p>
  );
  renderRoi = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.multipack_roi, formatPercent(row.multipack_roi))}
    </p>
  );
  renderRank = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.rank, '#' + formatNumber(row.rank))}</p>
  );
  renderMonthlySalesEst = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.sales_monthly, formatNumber(row.sales_monthly))}</p>
  );
  renderCategory = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.amazon_category_name, row.amazon_category_name)}</p>
  );
  renderMultipackQuantity = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.multipack_quantity, row.multipack_quantity)}</p>
  );
  renderSizeTiers = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.size_tier, row.size_tier)}</p>
  );
  renderLastRun = (row: Product) => (
    <p className="stat">{formatCompletedDate(new Date(row.last_syn))}</p>
  );
  renderFbaFee = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.fba_fee, formatCurrency(row.fba_fee))}</p>
  );
  renderReferralFee = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.referral_fee, formatCurrency(row.referral_fee))}</p>
  );
  renderVariableClosingFee = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.variable_closing_fee, formatCurrency(row.variable_closing_fee))}
    </p>
  );
  renderNumFbaNewOffers = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.num_fba_new_offers, formatNumber(row.num_fba_new_offers))}
    </p>
  );
  renderNumFbmNewOffers = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.num_fbm_new_offers, formatNumber(row.num_fbm_new_offers))}
    </p>
  );
  renderLowNewFbaPrice = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.low_new_fba_price, formatCurrency(row.low_new_fba_price))}
    </p>
  );
  renderLowNewFbmPrice = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.low_new_fbm_price, formatCurrency(row.low_new_fbm_price))}
    </p>
  );
  renderReviews = (row: Product) => (
    <p className="stat">
      {row.data_buster_status === 'completed'
        ? showNAIfZeroOrNull(row.customer_reviews, formatNumber(row.customer_reviews))
        : this.renderDataBusterIcon(row.product_id, row.data_buster_status)}
    </p>
  );
  renderRating = (row: Product) => (
    <p className="stat">
      {row.data_buster_status === 'completed'
        ? showNAIfZeroOrNull(row.rating, row.rating)
        : this.renderDataBusterIcon(row.product_id, row.data_buster_status)}
    </p>
  );
  renderIsAmazon = (row: Product) => (
    <p className="stat">
      {row.data_buster_status === 'completed'
        ? row.is_amazon_selling
          ? 'Yes'
          : 'No'
        : this.renderDataBusterIcon(row.product_id, row.data_buster_status)}
    </p>
  );

  renderDataBusterIcon = (productId: number, dataBusterStatus: string) => {
    const { productsLoadingDataBuster, bustData, supplierDetails } = this.props;

    if (productsLoadingDataBuster.includes(productId) || dataBusterStatus === 'processing') {
      return <Icon loading name="refresh" color="blue" />;
    } else if (dataBusterStatus === 'failed') {
      return (
        <Popup
          content="Unable to find on Amazon."
          position="top center"
          size="tiny"
          trigger={
            <Icon
              name="x"
              color="red"
              style={{ cursor: 'pointer' }}
              onClick={() => bustData(supplierDetails.synthesis_file_id, [productId])}
            />
          }
        />
      );
    } else if (!dataBusterStatus) {
      return (
        <Icon
          name="info circle"
          color="blue"
          style={{ cursor: 'pointer' }}
          onClick={() => bustData(supplierDetails.synthesis_file_id, [productId])}
        />
      );
    }
  };

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
    localStorage.setItem('profitFinderColumnFilterState', JSON.stringify([...checkedData]));
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
      label: 'ASIN',
      dataKey: 'asin',
      type: 'string',
      show: true,
      sortable: true,
      className: 'md-column',
      render: this.renderASIN,
    },
    {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderPrice,
    },
    {
      label: 'Cost',
      dataKey: 'product_cost',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderCost,
    },
    {
      label: 'Total\nFees',
      dataKey: 'fees',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderFee,
    },
    {
      label: 'Profit',
      dataKey: 'multipack_profit',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderProfit,
    },
    {
      label: 'Margin',
      dataKey: 'multipack_margin',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderMargin,
    },
    {
      label: 'ROI',
      dataKey: 'multipack_roi',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderRoi,
    },
    {
      label: 'Rank',
      dataKey: 'rank',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderRank,
    },
    {
      label: 'Monthly \nSales Est',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
      className: 'md-column',
      render: this.renderMonthlySalesEst,
    },
    {
      label: 'Monthly\nRevenue',
      dataKey: 'monthly_revenue',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderMonthlyRevenue,
    },
    {
      label: 'FBA Fee',
      dataKey: 'fba_fee',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      render: this.renderFbaFee,
    },
    {
      label: 'Referral\nFee',
      dataKey: 'referral_fee',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      render: this.renderReferralFee,
    },
    {
      label: 'Variable\nClosing Fee',
      dataKey: 'variable_closing_fee',
      type: 'number',
      show: true,
      sortable: true,
      className: 'md-column',
      render: this.renderVariableClosingFee,
    },
    {
      label: 'Is Amazon\nSelling',
      dataKey: 'is_amazon_selling',
      type: 'boolean',
      show: true,
      sortable: true,
      render: this.renderIsAmazon,
    },
    {
      label: 'Reviews',
      dataKey: 'customer_reviews',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderReviews,
    },
    {
      label: 'Rating',
      dataKey: 'rating',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderRating,
    },
    {
      label: 'Num New\nFBA Offers',
      dataKey: 'num_fba_new_offers',
      type: 'number',
      show: true,
      sortable: true,
      className: 'md-column',
      render: this.renderNumFbaNewOffers,
    },
    {
      label: 'Num New\nFBM Offers',
      dataKey: 'num_fbm_new_offers',
      type: 'number',
      show: true,
      sortable: true,
      className: 'md-column',
      render: this.renderNumFbmNewOffers,
    },
    {
      label: 'Low New\nFBA Price',
      dataKey: 'low_new_fba_price',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      render: this.renderLowNewFbaPrice,
    },
    {
      label: 'Low New\nFBM Price',
      dataKey: 'low_new_fbm_price',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      render: this.renderLowNewFbmPrice,
    },
    {
      label: 'Multipack\nQty',
      dataKey: 'multipack_quantity',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      render: this.renderMultipackQuantity,
    },
    {
      label: 'Category',
      dataKey: 'amazon_category_name',
      type: 'string',
      sortable: true,
      show: true,
      className: 'lg-column',
      render: this.renderCategory,
    },
    {
      label: 'Size Tier',
      dataKey: 'size_tier',
      type: 'string',
      show: true,
      sortable: true,
      className: 'xl-column',
      render: this.renderSizeTiers,
    },
    {
      label: 'UPC',
      dataKey: 'upc',
      type: 'string',
      show: true,
      sortable: true,
      className: 'md-column',
      render: this.renderUPC,
    },
    {
      label: 'Last Run',
      dataKey: 'last_run',
      type: 'string',
      show: true,
      sortable: true,
      className: 'xl-column',
      render: this.renderLastRun,
    },
    {
      label: 'Tracking',
      dataKey: 'sellgo_score',
      type: 'number',
      show: true,
      sortable: false,
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
    localStorage.setItem('profitFinderColumnFilterState', JSON.stringify(data));
    this.setState({ columnFilterData: data });
  };
  reorderColumns = (columns: Column[]) => {
    const columnsWithRender = returnWithRenderMethod(this.columns, columns);
    localStorage.setItem('profitFinderColumnState', JSON.stringify(columns));

    const currentColumnState = JSON.parse(localStorage.getItem('profitFinderColumnState') || '[]');
    if (currentColumnState.length >= 1) {
      this.setState({ columns: columnsWithRender });
    }
  };

  // detect primary ID based on products
  detectAndUpdateProductId = () => {
    const { filteredProducts } = this.props;

    if (filteredProducts && filteredProducts.length > 0) {
      const actualPid = PRODUCT_ID_TYPES.filter(pidType => pidType !== 'ASIN').filter(
        pidType => filteredProducts[0][pidType.toLowerCase() as keyof Product]
      )[0];
      const columnUpcIdx = this.state.columns.findIndex(
        (element: any) => element.dataKey === 'upc'
      );
      const filterUpcIdx = this.state.columnFilterData.findIndex(
        (element: any) => element.dataKey === 'upc'
      );

      if (actualPid) {
        // update columns & filter if non-asin product id is not the default UPC
        if (actualPid !== 'UPC') {
          const newColumns = _.cloneDeep(this.state.columns);
          newColumns[columnUpcIdx] = {
            ...newColumns[columnUpcIdx],
            label: actualPid,
            dataKey: actualPid.toLowerCase(),
            render: (row: Product) => (
              <p className="stat">
                {showNAIfZeroOrNull(
                  row[actualPid.toLowerCase() as keyof Product],
                  row[actualPid.toLowerCase() as keyof Product]
                )}
              </p>
            ),
          };
          const newColumnFilterData = _.cloneDeep(this.state.columnFilterData);
          newColumnFilterData[filterUpcIdx] = {
            ...newColumnFilterData[filterUpcIdx],
            key: actualPid,
            dataKey: actualPid.toLowerCase(),
          };
          this.setState({
            columnFilterData: newColumnFilterData,
            columns: newColumns,
          });
        }
      } else {
        // no other non-asin product ids => products are asin-based
        // remove default UPC column & filter
        const newColumns = _.cloneDeep(this.state.columns);
        newColumns.splice(columnUpcIdx, 1);
        const newColumnFilterData = _.cloneDeep(this.state.columnFilterData);
        newColumnFilterData.splice(filterUpcIdx, 1);
        this.setState({
          columnFilterData: newColumnFilterData,
          columns: newColumns,
        });
      }
    }
  };

  componentDidMount() {
    const currentFilterOrder = JSON.parse(
      localStorage.getItem('profitFinderColumnFilterState') || '[]'
    );
    const currentColumnState = JSON.parse(localStorage.getItem('profitFinderColumnState') || '[]');

    if (currentFilterOrder.length >= 1) {
      this.setState({ columnFilterData: currentFilterOrder });
    }

    if (currentColumnState.length >= 1) {
      const columnsWithRender = returnWithRenderMethod(this.columns, currentColumnState);
      this.setState({ columns: columnsWithRender });
    } else {
      this.setState({ columns: this.columns });
    }
  }

  componentDidUpdate(prevProps: ProductsTableProps) {
    if (prevProps.isLoadingSupplierProducts !== this.props.isLoadingSupplierProducts) {
      this.detectAndUpdateProductId();
    }
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
      scrollTopSelector,
      stickyChartSelector,
      currentActiveColumn,
    } = this.props;
    const { searchValue, checkedRows, ColumnFilterBox, columns, columnFilterData } = this.state;

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
              columns={columns}
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
              columnFilterData={columnFilterData}
              middleScroll={true}
              renderFilterSectionComponent={() => <ProfitFinderFilterSection />}
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
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  pageNumber: supplierPageNumberSelector(state),
  currentActiveColumn: get(state, 'supplier.activeColumn'),
  supplierDetails: supplierDetailsSelector(state),
  productsLoadingDataBuster: get(state, 'supplier.productsLoadingDataBuster'),
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
  bustData: (synthesisFileID: number, productIDs: number[]) =>
    triggerDataBuster(synthesisFileID, productIDs),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
