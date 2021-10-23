import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Icon } from 'semantic-ui-react';
import { Column, GenericTable } from '../../../components/Table';
import { tableKeys } from '../../../constants';
import { supplierPageNumberSelector } from '../../../selectors/Supplier';
import get from 'lodash/get';

import { setSupplierPageNumber, updateProductTrackingStatus } from '../../../actions/Suppliers';
import { Product } from '../../../interfaces/Product';
import ProductCheckBox from '../../Synthesis/Supplier/ProductsTable/productCheckBox';
import { filters, leads, loadingFilters } from '../../../selectors/LeadsTracker';
import { formatCurrency, formatPercent, showNAIfZeroOrNull } from '../../../utils/format';
import ProductDescription from '../ProductDescription';
import DetailButtons from './detailButtons';
import LeadsTrackerFilterSection from '../LeadsTrackerFilterSection';
import {
  fetchFilters,
  FetchLeadsFilters,
  fetchLeadsKPIs,
  setLeadsTrackerSinglePageItemsCount,
} from '../../../actions/LeadsTracker';

export interface CheckedRowDictionary {
  [index: number]: boolean;
}

export interface LeadsTrackerTableProps {
  setSinglePageItemsCount: (payload: any) => void;
  setPageNumber: (pageNo: number) => void;
  fetchLeads: (payload: any) => void;
  fetchFilters: (payload: any) => void;
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
  filters: [any];
  currentActiveColumn: any;
  pageSize: number;
  pageNo: number;
  sort: string;
  sortDirection: string;
  period: number;
  totalRecords: number;
  totalPages: number;
  loadingFilters: boolean;
  loading: boolean;
}
class LeadsTracker extends React.Component<LeadsTrackerTableProps, any> {
  constructor(props: LeadsTrackerTableProps) {
    super(props);
    this.state = {
      columns: this.columns,
      checkedRows: {},
      activeColumn: {
        label: 'Price',
        dataKey: 'price',
        type: 'number',
        sortable: true,
        filter: true,
        filterSign: '$',
        show: true,
        className: `lt-middle-sm-col`,
      },
      activeColumnFilters: {},
      updateTracking: false,
      defaultSort: 'asc',
      sorting: false,
      pageSizeChanged: {},
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

  getFilterValue = (dataKey: string): any => {
    const key = this.getRightColumns().includes(dataKey)
      ? `${dataKey.split('_')[0]}_${this.getActiveColumn()}`
      : dataKey;
    const localFilters = localStorage.getItem(`leads-tracker:${key}`);
    let parsed: any;
    if (localFilters) {
      parsed = JSON.parse(localFilters);
      if (dataKey === 'search') {
        parsed = parsed.value.length ? parsed : undefined;
      } else {
        parsed = Object.keys(parsed.value).length ? parsed : undefined;
      }
    }
    return parsed ? parsed : undefined;
  };

  getActiveColumn = () => !!this.state.activeColumn && this.state.activeColumn.dataKey;

  renderProductInfo = (row: Product) => <ProductDescription item={row} />;
  renderSearch = (row: any) => (
    <p className="lt-stat">{showNAIfZeroOrNull(row.search, row.search)}</p>
  );
  renderProductID = (row: any) => (
    <p className="lt-stat">{showNAIfZeroOrNull(row.identifier, row.identifier)}</p>
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
  renderAverage = (row: any) => {
    const activeColumn = this.getActiveColumn();
    const value = row[`avg_${activeColumn}`];
    const updated = ['profit', 'price'].includes(activeColumn)
      ? formatCurrency(value)
      : formatPercent(value);
    return <p className="stat">{showNAIfZeroOrNull(value, updated)}</p>;
  };
  renderIndex = (row: any) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row[`index_${this.getActiveColumn()}`],
        row[`index_${this.getActiveColumn()}`]
      )}
    </p>
  );

  renderChange = (row: any) => {
    const activeColumn = this.getActiveColumn();
    const value = row[`change_${activeColumn}_perc`];
    const change = row[`change_${activeColumn}`];
    const perc = value < 0 ? value * -1 : value;
    const updated = change < 0 ? change * -1 : change;
    const changeValue = showNAIfZeroOrNull(updated, updated);
    const columnClass = `stat ${change < 0 ? 'change-low' : change > 0 ? 'change-high' : ''}`;
    const hasValue = !['0.00', '-0.00', '0', '-'].includes(changeValue);
    return (
      <p className={columnClass}>
        {value !== 0 && hasValue && <Icon name={'arrow right'} />}
        <span className="light-font">
          {hasValue && changeValue}
          {hasValue && !['profit', 'price'].includes(activeColumn) && '%'}
          {hasValue && '\n'}

          {updated !== 0 && hasValue && ['profit', 'price'].includes(activeColumn) && ` (${perc}%)`}
        </span>
        {!hasValue && '-'}
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
        row[`min_${this.getActiveColumn()}`],
        row[`min_${this.getActiveColumn()}`]
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
            await this.fetchLeadsData({ loading: false });
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

  getSavedFilters = (resetKey = '') => {
    const { columns } = this.state;
    let query = '';
    columns.forEach((c: any) => {
      if (resetKey !== c.dataKey) {
        const saved: any = this.getFilterValue(c.dataKey);
        if (saved && !!saved.value) {
          const parsed = this.parseFilters(saved);
          query = !parsed.includes('undefined') ? `${query}&${this.parseFilters(saved)}&` : query;
        }
      }
    });
    return query;
  };

  componentDidMount() {
    const { singlePageItemsCount } = this.props;
    this.fetchLeadsData({ pageNo: 1, per_page: singlePageItemsCount });
    this.toggleColumn(this.state.activeColumn);
  }

  setActiveColumn = (column: any) => {
    this.setState({ activeColumn: column });
    this.toggleColumn(column);
  };

  onSort = async (order: string, dataKey: string) => {
    const { currentActiveColumn } = this.props;
    await this.setState({ loading: false });
    let sortDirection = order === 'descending' ? 'desc' : 'asc';
    if (currentActiveColumn !== dataKey && order === 'descending') {
      sortDirection = 'asc';
    }
    await this.fetchLeadsData({
      sort: dataKey,
      sort_direction: sortDirection,
      loading: false,
    });
  };

  setActiveColumnFilters = (data: any) => {
    const { fetchFilters } = this.props;
    const query = `column_value=${data}&column_type=${data === 'search' ? data : 'slider'}`;
    fetchFilters({ query });
    this.setState({ activeColumnFilters: data });
  };

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
      filter: true,
      filterLabel: 'Search',
      filterDataKey: 'search',
      filterSign: '',
      show: true,
      className: 'lt-lg-col',
      render: this.renderProductInfo,
    },
    {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      filter: true,
      filterSign: '$',
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
      filterSign: '$',
      show: true,
      className: 'lt-middle-sm-col',
      render: this.renderProfit,
    },
    {
      label: 'Margin',
      dataKey: 'margin',
      type: 'number',
      sortable: true,
      filter: true,
      filterSign: '%',
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
      filter: true,
      filterSign: '%',
      className: 'lt-middle-sm-col',
      render: this.renderRoi,
    },
    {
      label: 'Average',
      dataKey: 'avg',
      type: 'number',
      sortable: true,
      filter: true,
      show: true,
      filterSign: '$',
      className: 'lt-md-col lt-avg',
      render: this.renderAverage,
    },
    {
      label: 'Index',
      dataKey: 'index',
      type: 'number',
      sortable: true,
      show: true,
      filter: true,
      filterSign: '$',
      className: 'lt-md-col lt-index',
      render: this.renderIndex,
    },
    {
      label: 'Change',
      dataKey: 'change',
      type: 'string',
      sortable: true,
      filter: true,
      filterSign: '$',
      show: true,
      className: 'lt-md-col ltr-change',
      render: this.renderChange,
    },
    {
      label: 'Highs',
      dataKey: 'max',
      type: 'string',
      show: true,
      sortable: true,
      filter: true,
      filterSign: '$',
      className: 'lt-sm-col lt-max',
      render: this.renderHighs,
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
    {
      label: 'Lows',
      dataKey: 'min',
      type: 'number',
      show: true,
      sortable: true,
      filter: true,
      filterSign: '$',
      className: 'lt-sm-col lt-low',
      render: this.renderLows,
    },
  ];

  getRightColumns = () => {
    const { activeColumn } = this.state;
    return [
      `avg_${activeColumn.dataKey}`,
      `change_${activeColumn.dataKey}`,
      `min_${activeColumn.dataKey}`,
      `max_${activeColumn.dataKey}`,
      `index_${activeColumn.dataKey}`,
      'avg',
      'change',
      'min',
      'max',
      'index',
    ];
  };

  toggleColumn = (column: any) => {
    const { columns } = this.state;
    let tableColumns = columns;
    tableColumns = tableColumns.map((c: any) => {
      if (c.dataKey === column.dataKey && !c.className.includes('active-column')) {
        c = { ...c, className: `${c.className} active-column ` };
      } else if (c.dataKey !== column.dataKey) {
        c = { ...c, className: c.className.replace('active-column ', '') };
      }
      const data = this.getRightColumns();
      if (data.includes(c.dataKey)) {
        c = {
          ...c,
          dataKey: `${c.dataKey.split('_')[0]}_${column.dataKey}`,
          filterSign: c.dataKey === 'index' ? '' : column.filterSign,
        };
      }
      return c;
    });
    this.setState({ columns: tableColumns });
  };

  getFilters = () => {
    const {
      period,
      pageNo: page,
      pageSize: per_page,
      sort,
      sortDirection: sort_direction,
    } = this.props;
    return { page, per_page, sort, sort_direction, period };
  };

  fetchLeadsData = (filter: any = {}, resetKey = '') => {
    const { fetchLeads } = this.props;
    let payload: any = this.getFilters();
    if (filter) payload = { ...payload, ...filter };
    let query = this.getSavedFilters(resetKey);
    if (filter.query && filter.query.length && !query.includes(filter.query)) {
      query = `${query}&${filter.query}`;
    }
    if (query) {
      payload = { ...payload, query };
    }
    fetchLeads(payload);
    this.setPageSizeChanged(payload.per_page);
  };

  getColumn = (dataKey: string) => this.columns.find((c: Column) => c.dataKey === dataKey);

  parseFilters = (filter: any): string => {
    const { dataKey, value } = filter;
    let query = '';
    if (value) {
      if (dataKey === 'search') {
        query = `searches=${value}`;
      } else {
        query = `${dataKey}_min=${value.min}&${dataKey}_max=${value.max}`;
      }
    }

    this.setState({ ColumnFilterBox: false });
    return query;
  };

  applyFilters = (data: any) => {
    let filter = data;
    let query = '';
    if (data.dataKey !== 'search') {
      filter = Object.keys(data.value).length ? data : undefined;
      if (filter) {
        query = this.parseFilters(filter);
      }
    } else {
      query = this.parseFilters(filter);
    }
    this.fetchLeadsData({ query });
    this.setState({ ColumnFilterBox: false });
  };

  setPageSizeChanged = (pageSizeChanged: any) => this.setState({ pageSizeChanged });

  render() {
    const {
      currentActiveColumn,
      pageNo,
      leads,
      totalPages,
      period,
      filters,
      loadingFilters,
      totalRecords,
      loading,
      singlePageItemsCount,
      setSinglePageItemsCount,
    } = this.props;
    const {
      checkedRows,
      columns,
      ColumnFilterBox,
      activeColumn,
      activeColumnFilters,
      pageSizeChanged,
    } = this.state;
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
      <div className={`leads-table ${loading && 'disabled'}`}>
        <React.Fragment>
          <div style={{ display: 'flex' }}>
            {columns.slice(0, 2).map((c: any, i: any) => (
              <div className={c.className} key={`left-${i}`} />
            ))}
            <div className="lt-toggle-button-container" onScroll={onScroll}>
              {columns.slice(2, 6).map((c: any, i: any) => (
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
            {columns.slice(6, columns.length - 2).map((c: any, i: any) => (
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
            data={leads || []}
            singlePageItemsCount={singlePageItemsCount}
            currentPage={pageNo}
            setPage={page => {
              if (page !== pageNo) {
                this.fetchLeadsData({ page, loading: false, ...pageSizeChanged });
              }
            }}
            name={'leads-tracker'}
            pageCount={totalPages}
            showFilter={true}
            onSort={(setSortDirection, dataKey) =>
              this.onSort(setSortDirection, dataKey ? dataKey : '')
            }
            checkedRows={checkedRows}
            updateCheckedRows={this.updateCheckedRows}
            toggleColumnCheckbox={this.handleClick}
            middleScroll={true}
            columnFilterBox={ColumnFilterBox}
            columnDnD={true}
            activeColumnFilters={activeColumnFilters}
            toggleColumnFilters={this.setActiveColumnFilters}
            resetColumnFilters={(resetKey: string) => {
              this.fetchLeadsData(this.getFilters(), resetKey);
              this.setState({ ColumnFilterBox: false });
            }}
            setSinglePageItemsCount={per_page => {
              if (pageNo === 1) {
                this.fetchLeadsData({ per_page, page: 1 });
              }
              this.setPageSizeChanged({ per_page, page: 1 });
              setSinglePageItemsCount(per_page);
            }}
            loadingFilters={loadingFilters}
            filterValues={filters}
            stickyChartSelector
            applyColumnFilters={this.applyFilters}
            cancelColumnFilters={() => this.setState({ ColumnFilterBox: false })}
            count={totalRecords}
            loading={loading}
            leftFixedColumns={2}
            rightFixedColumns={6}
          />
        </React.Fragment>
      </div>
    );
  }
}
const mapStateToProps = (state: {}) => ({
  singlePageItemsCount: get(state, 'leads.singlePageItemsCount'),
  pageNumber: supplierPageNumberSelector(state),
  leads: leads(state),
  currentActiveColumn: get(state, 'supplier.activeColumn'),
  pageSize: get(state, 'leads.pageSize'),
  pageNo: get(state, 'leads.pageNo'),
  sort: get(state, 'leads.sort'),
  sortDirection: get(state, 'leads.sortDirection'),
  period: get(state, 'leads.period'),
  totalRecords: get(state, 'leads.totalRecords'),
  totalPages: get(state, 'leads.totalPages'),
  loading: get(state, 'leads.loading'),
  filters: filters(state),
  loadingFilters: loadingFilters(state),
});

const mapDispatchToProps = {
  setSinglePageItemsCount: (itemsCount: number) => setLeadsTrackerSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
  fetchLeads: (payload: FetchLeadsFilters) => fetchLeadsKPIs(payload),
  fetchFilters: (payload: any) => fetchFilters(payload),

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
