import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Icon, Loader, Segment } from 'semantic-ui-react';
import { Column, GenericTable } from '../../../components/Table';
import { tableKeys } from '../../../constants';
import { supplierPageNumberSelector } from '../../../selectors/Supplier';
import get from 'lodash/get';

import {
  setSupplierPageNumber,
  setSupplierSinglePageItemsCount,
  updateProductTrackingStatus,
} from '../../../actions/Suppliers';
import { Product } from '../../../interfaces/Product';
import ProductCheckBox from '../../Synthesis/Supplier/ProductsTable/productCheckBox';
import { fileSearch, isFetchingLeadsKPISelector, leads } from '../../../selectors/LeadsTracker';
import { formatCurrency, formatPercent, showNAIfZeroOrNull } from '../../../utils/format';
import ProductDescription from '../ProductDescription';
import DetailButtons from './detailButtons';
import LeadsTrackerFilterSection from '../LeadsTrackerFilterSection';
import { FetchLeadsFilters, fetchLeadsKPIs, fetchLeadsSearch } from '../../../actions/LeadsTracker';

export interface CheckedRowDictionary {
  [index: number]: boolean;
}

export interface LeadsTrackerTableProps {
  setSinglePageItemsCount: (payload: any) => void;
  setPageNumber: (pageNo: number) => void;
  fetchLeads: (payload: any) => void;
  fetchSearchFileData: (payload: any) => void;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    name?: string,
    supplierID?: any
  ) => void;
  singlePageItemsCount: number;
  pageNumber: number;
  leads: [any];
  fileSearch: [any];
  isFetchingLeadsKPI: boolean;
  currentActiveColumn: any;
  pageSize: number;
  pageNo: number;
  sort: string;
  sortDirection: string;
  period: number;
  totalRecords: number;
  totalPages: number;
}
class LeadsTracker extends React.Component<LeadsTrackerTableProps, any> {
  constructor(props: LeadsTrackerTableProps) {
    super(props);
    this.state = {
      columns: this.columns,
      checkedRows: {},
      activeColumn: { dataKey: 'price' },
      activeColumnFilters: {},
      updateTracking: false,
      defaultSort: 'asc',
      sorting: false,
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

  getActiveColumn = () => !!this.state.activeColumn && this.state.activeColumn.dataKey;

  renderProductInfo = (row: Product) => <ProductDescription item={row} />;
  renderSearch = (row: any) => (
    <p className="lt-stat">{showNAIfZeroOrNull(row.search, row.search)}</p>
  );
  renderProductID = (row: any) => (
    <p className="lt-stat">{showNAIfZeroOrNull(row.product_id, row.product_id)}</p>
  );
  renderASIN = (row: any) => <p className="lt-stat">{showNAIfZeroOrNull(row.asin, row.asin)}</p>;
  renderPrice = (row: any) => (
    <p className="stat" onClick={() => this.setActiveColumn(this.getColumn('price'))}>
      {showNAIfZeroOrNull(row.price, formatCurrency(row.price))}
    </p>
  );
  renderProfit = (row: any) => (
    <p className="stat" onClick={() => this.setActiveColumn(this.getColumn('profit'))}>
      {showNAIfZeroOrNull(row.profit, formatCurrency(row.profit))}
    </p>
  );

  renderMargin = (row: any) => (
    <p className="stat" onClick={() => this.setActiveColumn(this.getColumn('margin'))}>
      {showNAIfZeroOrNull(row.margin, formatPercent(row.margin))}
    </p>
  );
  renderRoi = (row: any) => (
    <p className="stat" onClick={() => this.setActiveColumn(this.getColumn('roi'))}>
      {showNAIfZeroOrNull(row.roi, formatPercent(row.roi))}
    </p>
  );
  renderAverage = (row: any) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row[`avg_${this.getActiveColumn()}`],
        formatCurrency(row[`avg_${this.getActiveColumn()}`])
      )}
    </p>
  );
  renderIndex = (row: any) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row[`index_${this.getActiveColumn()}`],
        row[`index_${this.getActiveColumn()}`]
      )}
    </p>
  );

  renderChange = (row: any) => {
    const value = row[`change_${this.getActiveColumn()}_perc`];
    const columnClass = `stat ${value < 0 ? 'change-low' : value > 0 ? 'change-high' : ''}`;
    return (
      <p className={columnClass}>
        {value !== 0 && <Icon name={'arrow down'} />}
        {showNAIfZeroOrNull(
          row[`change_${this.getActiveColumn()}`],
          row[`change_${this.getActiveColumn()}`]
        )}
        {value !== 0 && `(${row[`change_${this.getActiveColumn()}_perc`]}%)`}
      </p>
    );
  };
  renderHighs = (row: any) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row[`max_${this.getActiveColumn()}`],
        row[`max_${this.getActiveColumn()}`]
      )}
    </p>
  );
  renderLows = (row: any) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row[`low_${this.getActiveColumn()}`],
        row[`low_${this.getActiveColumn()}`]
      )}
    </p>
  );

  renderDetailButtons = (row: any) => {
    const { updateProductTrackingStatus } = this.props;
    const { updateTracking } = this.state;
    return (
      <DetailButtons
        isTracking={row.tracking_status === 'active'}
        onTrack={async () => {
          if (!updateTracking) {
            await this.setState({ updateTracking: true });
            if (row.tracking_status !== null) {
              await updateProductTrackingStatus(
                row.tracking_status === 'active' ? 'inactive' : 'active',
                row.product_id,
                row.product_track_id,
                undefined,
                'supplier',
                row.supplier_id
              );
              await this.setState({ updateTracking: false });
            } else {
              await updateProductTrackingStatus(
                'active',
                row.product_id,
                row.product_track_id,
                undefined,
                'supplier',
                row.supplier_id
              );
              await this.setState({ updateTracking: false });
            }
            await this.fetchLeadsData({});
          }
        }}
      />
    );
  };

  handleClick = () => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
  };

  componentDidMount() {
    this.fetchLeadsData({ pageNo: 1 });
  }

  setActiveColumn = (column: any) => {
    this.setState({ activeColumn: column });
    this.toggleColumn(column);
  };

  onSort = async (order: string) => {
    const { currentActiveColumn } = this.props;
    await this.setState({ sorting: true });
    const sort_direction = order === 'descending' ? 'desc' : 'asc';
    localStorage.setItem('leads-sort', sort_direction);
    await this.fetchLeadsData({ sort: currentActiveColumn, sort_direction, sorting: true });
  };

  setActiveColumnFilters = (data: any) => this.setState({ activeColumnFilters: data });

  columns: Column[] = [
    {
      label: '',
      sortable: false,
      dataKey: 'checkboxes',
      show: true,
      check: true,
      render: this.renderCheckBox,
      className: 'lt-checkbox',
    },
    {
      label: 'Product Information',
      dataKey: 'title',
      type: 'string',
      filterType: 'checkbox',
      searchIconPosition: 'left',
      show: true,
      className: 'lt-lg-col',
      render: this.renderProductInfo,
    },
    {
      label: 'Search File',
      dataKey: 'search_file',
      type: 'string',
      sortable: true,
      searchable: true,
      show: true,
      className: 'lt-md-col',
      filter: true,
      filterType: 'checkbox',
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
      className: 'lt-md-col',
      render: this.renderASIN,
    },
    {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      filter: true,
      show: true,
      className: `lt-middle-sm-col`,
      render: this.renderPrice,
    },
    {
      label: 'Profit',
      dataKey: 'profit',
      type: 'number',
      sortable: true,
      filter: true,
      show: true,
      className: 'lt-middle-sm-col',
      render: this.renderProfit,
    },
    {
      label: 'Profit Margin',
      dataKey: 'margin',
      type: 'number',
      sortable: true,
      filter: true,
      show: true,
      className: 'lt-middle-md-col',
      render: this.renderMargin,
    },
    {
      label: 'ROI',
      dataKey: 'roi',
      type: 'number',
      sortable: true,
      show: true,
      className: 'lt-middle-sm-col',
      render: this.renderRoi,
    },
    {
      label: 'Average',
      dataKey: 'average',
      type: 'number',
      sortable: true,
      filter: true,
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
      filter: true,
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
      filter: true,
      className: 'lt-sm-col',
      render: this.renderHighs,
    },
    {
      label: 'Lows',
      dataKey: 'lows',
      type: 'number',
      show: true,
      sortable: true,
      filter: true,
      className: 'lt-sm-col',
      render: this.renderLows,
    },
    {
      label: 'Tracking',
      dataKey: 'tracking',
      type: 'number',
      show: true,
      sortable: false,
      className: 'lt-sm-col leads-tracking',
      render: this.renderDetailButtons,
    },
  ];
  toggleColumn = (column: any) => {
    const { columns } = this.state;
    let tableColumns = columns;
    tableColumns = tableColumns.map((c: any) => {
      if (c.dataKey === column.dataKey) {
        c = { ...c, className: `${c.className} active-column ` };
      } else {
        c = { ...c, className: c.className.replace('active-column ', '') };
      }
      return c;
    });
    this.setState({ columns: tableColumns });
  };

  fetchLeadsData = (filter: any) => {
    const {
      fetchLeads,
      fetchSearchFileData,
      period,
      pageNo: page,
      pageSize: per_page,
      sort,
      sortDirection: sort_direction,
    } = this.props;
    let payload = { page, per_page, sort, sort_direction, period };
    if (filter) payload = { ...payload, ...filter };
    fetchLeads(payload);
    fetchSearchFileData(payload);
  };

  getColumn = (dataKey: string) => this.columns.find((c: Column) => c.dataKey === dataKey);

  parseFilters = (filter: any): string => {
    const { dataKey, value } = filter;
    let query = '';
    if (value) {
      if (dataKey === 'search_file') {
        query = `searches=${value}`;
      } else {
        query = `${dataKey}_min=${value.min}&${dataKey}_max=${value.max}`;
      }
    }

    this.setState({ ColumnFilterBox: false });
    return query;
  };

  render() {
    const {
      currentActiveColumn,
      pageNo,
      pageSize,
      leads,
      isFetchingLeadsKPI,
      totalPages,
      period,
      fileSearch,
    } = this.props;
    const { checkedRows, columns, ColumnFilterBox, activeColumn, activeColumnFilters } = this.state;
    const middleHeader = document.querySelector('.leads-tracker-middle');

    const onScroll = (evt: any) => {
      const middleBody = document.querySelector('.lt-toggle-button-container');
      const innerBody = document.querySelector('.middle-body');

      if (!!middleBody && middleHeader && innerBody) {
        middleBody.scrollLeft = evt.target.scrollLeft;
        middleHeader.scrollLeft = evt.target.scrollLeft;
        innerBody.scrollLeft = evt.target.scrollLeft;
      }
    };
    if (middleHeader) {
      middleHeader.addEventListener('scroll', onScroll);
    }

    return (
      <div className="leads-table">
        {isFetchingLeadsKPI ? (
          <Segment>
            <Loader active={true} inline="centered" size="massive">
              Loading
            </Loader>
          </Segment>
        ) : (
          <React.Fragment>
            <div style={{ display: 'flex' }}>
              {columns.slice(0, 5).map((c: any, i: any) => (
                <div className={c.className} key={`left-${i}`} />
              ))}
              <div className="lt-toggle-button-container" onScroll={onScroll}>
                {columns.slice(5, 9).map((c: any, i: any) => (
                  <div
                    className={`${c.className.replace('active-column', '')} ${
                      !!activeColumn && activeColumn.dataKey === c.dataKey
                        ? 'toggle-column-active'
                        : 'toggle-column'
                    }`}
                    key={`middle-${i}`}
                    onClick={() => this.setActiveColumn(c)}
                  >
                    <Icon name="pin" />
                  </div>
                ))}
              </div>
              {columns.slice(9, columns.length - 2).map((c: any, i: any) => (
                <div className={c.className} key={`left-${i}`} />
              ))}
              <div style={{ marginBottom: 5 }}>
                <LeadsTrackerFilterSection
                  defaultPeriod={period}
                  onPeriodSelect={(period: any) => this.fetchLeadsData({ period })}
                />
              </div>
            </div>
            <GenericTable
              currentActiveColumn={currentActiveColumn}
              scrollTopSelector={false}
              tableKey={tableKeys.LEADS}
              columns={columns}
              data={leads}
              singlePageItemsCount={pageSize}
              // setSinglePageItemsCount={setSinglePageItemsCount}
              currentPage={pageNo}
              setPage={page => {
                if (page !== pageNo) {
                  this.fetchLeadsData({ page });
                }
              }}
              name={'leads-tracker'}
              pageCount={totalPages}
              showFilter={true}
              // defaultSort={defaultSort}
              onSort={this.onSort}
              checkedRows={checkedRows}
              updateCheckedRows={this.updateCheckedRows}
              toggleColumnCheckbox={this.handleClick}
              middleScroll={true}
              columnFilterBox={ColumnFilterBox}
              columnDnD={true}
              activeColumnFilters={activeColumnFilters}
              toggleColumnFilters={this.setActiveColumnFilters}
              setSinglePageItemsCount={per_page => this.fetchLeadsData({ per_page })}
              checkboxData={fileSearch}
              stickyChartSelector
              applyColumnFilters={(filter: any) =>
                this.fetchLeadsData({ query: this.parseFilters(filter) })
              }
              cancelColumnFilters={() => this.setState({ ColumnFilterBox: false })}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: {}) => ({
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
  pageNumber: supplierPageNumberSelector(state),
  leads: leads(state),
  isFetchingLeadsKPI: isFetchingLeadsKPISelector(state),
  currentActiveColumn: get(state, 'supplier.activeColumn'),
  pageSize: get(state, 'leads.pageSize'),
  pageNo: get(state, 'leads.pageNo'),
  sort: get(state, 'leads.sort'),
  sortDirection: get(state, 'leads.sortDirection'),
  period: get(state, 'leads.period'),
  totalRecords: get(state, 'leads.totalRecords'),
  totalPages: get(state, 'leads.totalPages'),
  fileSearch: fileSearch(state),
});

const mapDispatchToProps = {
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
  fetchLeads: (payload: FetchLeadsFilters) => fetchLeadsKPIs(payload),
  fetchSearchFileData: (payload: any) => fetchLeadsSearch(payload),

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
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTracker);
