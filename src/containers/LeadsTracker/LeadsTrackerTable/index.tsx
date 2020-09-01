import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

import { GenericTable, Column } from '../../../components/Table';
import { tableKeys } from '../../../constants';
import { supplierPageNumberSelector } from '../../../selectors/Supplier';
import get from 'lodash/get';

import { setSupplierPageNumber, setSupplierSinglePageItemsCount } from '../../../actions/Suppliers';
import { Product } from '../../../interfaces/Product';
import ProductCheckBox from '../../Synthesis/Supplier/ProductsTable/productCheckBox';
import { leads } from '../../../selectors/LeadsTracker';
import { formatCurrency, formatPercent, showNAIfZeroOrNull } from '../../../utils/format';
import ProductDescription from '../../Synthesis/Supplier/ProductsTable/productDescription';
import DetailButtons from './detailButtons';
export interface CheckedRowDictionary {
  [index: number]: boolean;
}
class LeadsTracker extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      columns: this.columns,
      checkedRows: {},
    };
  }

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

  updateCheckedRows = (checkedRows: CheckedRowDictionary) => {
    this.setState({ checkedRows });
  };

  renderProductInfo = (row: Product) => <ProductDescription item={row} />;
  renderSearch = (row: any) => <p className="stat">{showNAIfZeroOrNull(row.search, row.search)}</p>;
  renderProductID = (row: any) => (
    <p className="stat">{showNAIfZeroOrNull(row.product_id, row.product_id)}</p>
  );
  renderASIN = (row: any) => <p className="stat">{showNAIfZeroOrNull(row.asin, row.asin)}</p>;
  renderPrice = (row: any) => (
    <p className="stat">{showNAIfZeroOrNull(row.price, formatCurrency(row.price))}</p>
  );
  renderProfit = (row: any) => (
    <p className="stat">{showNAIfZeroOrNull(row.profit, formatCurrency(row.profit))}</p>
  );

  renderMargin = (row: any) => (
    <p className="stat">{showNAIfZeroOrNull(row.margin, formatPercent(row.margin))}</p>
  );
  renderRoi = (row: any) => (
    <p className="stat">{showNAIfZeroOrNull(row.roi, formatPercent(row.roi))}</p>
  );
  renderAverage = (row: any) => (
    <p className="stat">{showNAIfZeroOrNull(row.avg_price, formatCurrency(row.avg_price))}</p>
  );
  renderIndex = (row: any) => <p className="stat">{showNAIfZeroOrNull(row.v, row.index_price)}</p>;

  renderChange = (row: any) => (
    <p className="stat">{showNAIfZeroOrNull(row.v, row.change_price)}</p>
  );
  renderHighs = (row: any) => <p className="stat">{showNAIfZeroOrNull(row.v, row.max_price)}</p>;
  renderLows = (row: any) => <p className="stat">{showNAIfZeroOrNull(row.v, row.min_price)}</p>;

  renderDetailButtons = (row: any) => {
    return <DetailButtons score={0} isTracking={true} onTrack={() => console.log(row)} />;
  };

  handleClick = () => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
  };
  columns: Column[] = [
    {
      label: '',
      sortable: false,
      dataKey: 'checkboxes',
      show: true,
      check: true,
      render: this.renderCheckBox,
      className: 'lt-sm-col',
    },
    {
      label: 'Product Information',
      dataKey: 'title',
      type: 'string',
      // sortable: true,
      show: true,
      className: 'lt-lg-col',
      render: this.renderProductInfo,
    },
    {
      label: 'Search File',
      dataKey: 'search_file',
      type: 'string',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderSearch,
    },
    {
      label: 'Product ID',
      dataKey: 'product_id',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderProductID,
    },
    {
      label: 'ASIN',
      dataKey: 'asin',
      type: 'string',
      sortable: true,
      show: true,
      className: 'lt-sm-col',
      render: this.renderASIN,
    },
    {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderPrice,
    },
    {
      label: 'Profit',
      dataKey: 'profit',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderProfit,
    },
    {
      label: 'Profit Margin',
      dataKey: 'profit_margin',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderMargin,
    },
    {
      label: 'ROI',
      dataKey: 'roi',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-sm-col',
      render: this.renderRoi,
    },
    {
      label: 'Average',
      dataKey: 'average',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderAverage,
    },
    {
      label: 'Index',
      dataKey: 'index',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderIndex,
    },
    {
      label: 'Change',
      dataKey: 'change',
      type: 'string',
      sortable: true,
      show: true,
      className: 'lt-md-col',
      render: this.renderChange,
    },
    {
      label: 'Highs',
      dataKey: 'highs',
      type: 'string',
      show: true,
      sortable: true,
      className: 'lt-sm-col',
      render: this.renderHighs,
    },
    {
      label: 'Lows',
      dataKey: 'lows',
      type: 'number',
      show: true,
      sortable: true,
      className: 'lt-sm-col',
      render: this.renderLows,
    },
    {
      label: 'Tracking',
      dataKey: 'sellgo_score',
      type: 'number',
      show: true,
      sortable: true,
      className: 'lt-sm-col',
      render: this.renderDetailButtons,
    },
    {
      label: '',
      icon: 'ellipsis horizontal ellipsis-ic',
      dataKey: 'ellipsis horizontal',
      show: true,
      // render: this.renderSyncButtons,
      popUp: true,
      className: 'lt-sm-col',
    },
  ];

  render() {
    const { currentActiveColumn, setSinglePageItemsCount, setPageNumber, leads } = this.props;
    const { checkedRows, columns, ColumnFilterBox } = this.state;
    console.log('leads', leads);
    return (
      <div className="products-table">
        <GenericTable
          currentActiveColumn={currentActiveColumn}
          scrollTopSelector={false}
          tableKey={tableKeys.LEADS}
          columns={columns}
          data={leads}
          // searchFilterValue={searchValue}
          // showProductFinderSearch={true}
          // searchFilteredProduct={this.searchFilteredProduct}
          // updateProfitFinderProducts={updateProfitFinderProducts}
          singlePageItemsCount={50}
          setSinglePageItemsCount={setSinglePageItemsCount}
          currentPage={1}
          setPage={setPageNumber}
          name={'leads-tracker'}
          showFilter={true}
          // columnFilterBox={ColumnFilterBox}
          checkedRows={checkedRows}
          updateCheckedRows={this.updateCheckedRows}
          // handleColumnChange={this.handleColumnChange}
          toggleColumnCheckbox={this.handleClick}
          // columnFilterData={this.state.columnFilterData}
          middleScroll={true}
          // renderFilterSectionComponent={() => (
          //   <ProfitFinderFilterSection productRanges={productRanges} />
          // )}
          // handleColumnDrop={this.handleColumnDrop}
          // reorderColumns={this.reorderColumns}
          columnFilterBox={ColumnFilterBox}
          columnDnD={true}
          stickyChartSelector
        />
      </div>
    );
  }
}
const mapStateToProps = (state: {}) => ({
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
  stickyChartSelector: get(state, 'supplier.singlePageItemsCount'),
  pageNumber: supplierPageNumberSelector(state),
  leads: leads(state),
});

const mapDispatchToProps = {
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTracker);
