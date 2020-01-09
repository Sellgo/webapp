import React from 'react';
import { connect } from 'react-redux';
import { Segment, Dropdown, Button } from 'semantic-ui-react';
import get from 'lodash/get';
import './index.scss';
import { Product } from '../../../interfaces/Product';
import TrackerMenu from './TrackerMenu';
import GenericTable, { Column } from '../../../components/Table';
import AddProduct from './AddProduct';
import { tableKeys } from '../../../constants';
import { setSupplierSinglePageItemsCount } from '../../../actions/Suppliers';

interface ProductTrackerTableProps {
  filteredProducts: Product[];
  filterRanges: any;
  singlePageItemsCount: number;
  setSinglePageItemsCount: (itemsCount: any) => void;
}
interface ProductTrackerTableState {}

class ProductTrackerTable extends React.Component<ProductTrackerTableProps> {
  state: ProductTrackerTableState = {};

  columns: Column[] = [
    {
      label: '',
      sortable: false,
      show: true,
      // render: this.renderProductImage,
    },

    {
      label: 'PRODUCT INFORMATION',
      sortable: false,
      show: true,
      //render: this.renderProductInfo,
    },

    {
      label: 'KPI',
      type: 'number',
      sortable: true,
      show: true,
      // render: this.renderProfit,
    },
    {
      label: 'Avg Price',
      type: 'number',
      sortable: true,
      show: true,
      // render: this.renderMargin,
    },
    {
      label: 'Avg Profit',
      type: 'number',
      sortable: true,
      show: true,
      // render: this.renderUnitSold,
    },
    {
      label: 'Avg Margin',
      type: 'number',
      sortable: true,
      show: true,
      // render: this.renderProfitMonthly,
    },

    {
      label: 'Avg Daily Unit Sold',
      type: 'number',
      sortable: true,
      show: true,
      // render: this.renderRoi,
    },

    {
      label: 'Avg Daily Revenue',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Avg ROI',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Avg Daily Rank',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Reviews',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Rating',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Dimensions',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
  ];

  render() {
    const {
      filteredProducts,
      filterRanges,
      singlePageItemsCount,
      setSinglePageItemsCount,
    } = this.props;
    return (
      <div className="tracker-table">
        <div className="tracker-menu">
          <TrackerMenu />
        </div>
        <AddProduct />
        <GenericTable
          key={`${JSON.stringify(filterRanges)}-${singlePageItemsCount}`}
          tableKey={tableKeys.PRODUCTS}
          data={filteredProducts}
          columns={this.columns}
          singlePageItemsCount={singlePageItemsCount}
          setSinglePageItemsCount={setSinglePageItemsCount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  filteredProducts: get(state, 'supplier.filteredProducts'),
  filterRanges: get(state, 'supplier.filterRanges'),
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
});
const mapDispatchToProps = {
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTrackerTable);
