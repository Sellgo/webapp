import React from 'react';
import { connect } from 'react-redux';
import { Segment, Loader, Icon, Image } from 'semantic-ui-react';
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

import microsoftExcelIcon from '../../../../assets/images/microsoft-excel.png';
import { supplierPageNumberSelector } from '../../../../selectors/Supplier';
import { isSubscriptionFree } from '../../../../utils/subscriptions';

interface ProductsTableProps {
  subscriptionType: string;
  supplierID: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  filteredProducts: Product[];
  filterData: any;
  productTrackerGroup: any;
  singlePageItemsCount: number;
  pageNumber: number;
  supplierDetails: any;
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

  renderDetailButtons = (row: Product) => {
    const { updateProductTrackingStatus, supplierID } = this.props;
    return (
      <DetailButtons
        score={row.sellgo_score}
        isTracking={row.tracking_status === 'active'}
        onTrack={() => {
          if (row.tracking_status !== null) {
            updateProductTrackingStatus(
              row.tracking_status === 'active' ? 'inactive' : 'active',
              undefined,
              row.product_track_id,
              undefined,
              'supplier',
              supplierID
            );
          } else {
            updateProductTrackingStatus(
              'active',
              row.product_id,
              undefined,
              undefined,
              'supplier',
              supplierID
            );
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

  renderExportButtons = () => {
    const { supplierDetails } = this.props;
    return (
      <div className="export-buttons">
        <span style={{ display: 'none' }}>Icon made by Freepik from www.flaticon.com</span>
        <span style={{ display: 'none' }}>Icon made by Pixel Perfect from www.flaticon.com</span>
        <Image
          as="a"
          href={supplierDetails.report_url}
          download={true}
          src={microsoftExcelIcon}
          wrapped={true}
          width={22}
          alt="Export Excel"
        />
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
      label: 'PRODUCT INFORMATION',
      dataKey: 'PRODUCT INFORMATION',
      type: 'string',
      sortable: false,
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
      label: 'Tracking / Rating',
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
      render: this.renderSyncButtons,
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
            {this.renderExportButtons()}
            <GenericTable
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
  supplierDetails: get(state, 'supplier.details'),
  pageNumber: supplierPageNumberSelector(state),
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
