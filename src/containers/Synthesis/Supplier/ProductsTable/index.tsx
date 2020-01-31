import React from 'react';
import { connect } from 'react-redux';
import { Segment, Loader, Icon } from 'semantic-ui-react';
import './index.scss';
import { Product } from '../../../../interfaces/Product';
import get from 'lodash/get';
import { openSupplierProductDetailModal } from '../../../../actions/Modals';
import {
  fetchSupplierProductTrackerGroup,
  updateProductTrackingStatus,
  setSupplierSinglePageItemsCount,
} from '../../../../actions/Suppliers';
import { PaginatedTable, Column } from '../../../../components/Table';
// import ProductImage from './productImage';
import ProductDescription from './productDescription';
import DetailButtons from './detailButtons';
import { formatCurrency, formatNumber } from '../../../../utils/format';
import { tableKeys } from '../../../../constants';

interface ProductsTableProps {
  supplierID: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  filteredProducts: Product[];
  filterRanges: any;
  productTrackerGroup: any;
  singlePageItemsCount: number;
  fetchProductTrackerGroup: (supplierID: any) => void;
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
}

interface ProductsTableState {
  checkedItems: { [index: number]: {} };
}

class ProductsTable extends React.Component<ProductsTableProps> {
  state: ProductsTableState = {
    checkedItems: {},
  };

  componentDidMount() {
    const { supplierID, fetchProductTrackerGroup } = this.props;
    fetchProductTrackerGroup(supplierID);
  }

  handleSelectAll = (event: any, isChecked: any) => {
    const { filteredProducts } = this.props;

    let newCheckedItems: any = {};
    filteredProducts.forEach((item: any) => {
      newCheckedItems[item.id] = isChecked;
    });

    this.setState({ checkedItems: newCheckedItems });
  };

  handleItemSelect = (e: any, isChecked: any, itemId: any) => {
    const { checkedItems } = this.state;
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: isChecked,
    };

    this.setState({ checkedItems: newCheckedItems });
  };

  // renderProductImage = (row: Product) => {
  //   const { checkedItems } = this.state;
  //   return (
  //     <ProductImage
  //       item={row}
  //       checked={checkedItems[row.id]}
  //       onSelectItem={this.handleItemSelect}
  //     />
  //   );
  // };
  renderProductInfo = (row: Product) => {
    return <ProductDescription item={row} />;
  };
  renderProfit = (row: Product) => <p className="stat">{formatCurrency(row.profit)} /item</p>;
  renderMargin = (row: Product) => <p className="stat">{row.margin}%</p>;
  renderUnitSold = (row: Product) => {
    return (
      <>
        <p className="stat">{formatNumber(row.sales_monthly)} /mo</p>
        {/*
        <p className="stat mg-botm0">{row.unitSoldPerDay} /day</p>
        <p className="stat fnt12">{row.sales_monthly} /mo</p>
        */}
      </>
    );
  };
  renderProfitMonthly = (row: Product) => (
    <p className="stat"> {formatCurrency(row.profit_monthly)}</p>
  );
  renderRoi = (row: Product) => <p className="stat">{row.roi}%</p>;
  // renderIcon = (row: Product) => {
  //   return (
  //     <div>
  //       <i className="fas fa-skull-crossbones mrgn-right font-color"></i>
  //       <Icon className="lock mrgn-right font-color" />
  //       <Icon className="list mrgn-right font-color" />
  //       <Icon className="cubes font-color" />
  //     </div>
  //   );
  // };
  // renderAmz = (row: Product) => <Image src={AMAZON_IMAGE} className="amazon_img_size" />;
  renderDetailButtons = (row: Product) => {
    const { productTrackerGroup, updateProductTrackingStatus, supplierID } = this.props;

    return (
      <DetailButtons
        score={row.sellgo_score}
        isTracking={row.tracking_status === 'active'}
        // onViewDetails={() => {
        //   openProductDetailModal({ ...row, ...{ supplierID: supplierID } });
        // }}
        onTrack={() => {
          let productTrackerGroupID = 2;
          if (productTrackerGroup.length > 0 && productTrackerGroup[0].id > 0) {
            productTrackerGroupID = productTrackerGroup[0].id;
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
          }
        }}
      />
    );
  };
  renderSyncButtons = (row: Product) => {
    return (
      <div>
        <Icon name="sync alternate" style={{ color: '#98aec9' }} />
      </div>
    );
  };

  columns: Column[] = [
    // {
    //   sortable: false,
    //   show: true,
    //   // render: this.renderProductImage,
    // },
    {
      label: 'PRODUCT INFORMATION',
      sortable: false,
      show: true,
      render: this.renderProductInfo,
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
      label: 'Unit Sold',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderUnitSold,
    },
    {
      label: 'Profit/Mo',
      dataKey: 'profit_monthly',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderProfitMonthly,
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
      label: 'Tracking / Rating',
      dataKey: 'sellgo_score',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderDetailButtons,
    },
    // {
    //   show: true,
    //   render: this.renderSyncButtons,
    // },
  ];

  render() {
    const {
      isLoadingSupplierProducts,
      filteredProducts,
      singlePageItemsCount,
      setSinglePageItemsCount,
      filterRanges,
    } = this.props;

    if (isLoadingSupplierProducts) {
      return (
        <Segment>
          <Loader active={true} inline="centered" size="massive">
            Loading
          </Loader>
        </Segment>
      );
    }

    return (
      <div className="products-table">
        <PaginatedTable
          /* 
            key change forced table to remount and set page back to 1
            if any data changes that would affect number of displayed items
            otherwise we can end up on a page that shows no results because it's
            past the end of the total number of items.
            This can be done in a less hacky way once we move pagination server-side.
          */
          key={`${JSON.stringify(filterRanges)}-${singlePageItemsCount}`}
          tableKey={tableKeys.PRODUCTS}
          data={filteredProducts}
          columns={this.columns}
          singlePageItemsCount={singlePageItemsCount}
          setSinglePageItemsCount={setSinglePageItemsCount}
          name={'products'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  isLoadingSupplierProducts: get(state, 'supplier.isLoadingSupplierProducts'),
  products: get(state, 'supplier.products'),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  filterRanges: get(state, 'supplier.filterRanges'),
  productTrackerGroup: get(state, 'supplier.productTrackerGroup'),
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
});

const mapDispatchToProps = {
  fetchProductTrackerGroup: (supplierID: any) => fetchSupplierProductTrackerGroup(supplierID),
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsTable);
