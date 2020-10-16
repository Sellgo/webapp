import React, { Component } from 'react';
import {
  resetSuppliers,
  fetchSuppliers,
  fetchSynthesisProgressUpdates,
  fetchSupplierTableColumns,
  setFavouriteSupplier,
  postSynthesisRerun,
  deleteSupplier,
  setProgress,
  setSpeed,
  setLeadsTracker,
  setLatestSupplier,
} from '../../../actions/Suppliers';
import { currentSynthesisId } from '../../../selectors/UploadSupplier';
import { connect } from 'react-redux';
import { Dropdown, Icon, Confirm, Segment, Loader, Grid } from 'semantic-ui-react';
import { GenericTable, Column } from '../../../components/Table';
import { Link } from 'react-router-dom';
import history from '../../../history';
import {
  suppliersSelector,
  suppliersTableTabSelector,
  suppliersTableColumnsSelector,
} from '../../../selectors/Supplier';
import PieChartModal from './PieChartModal';
import SupplierMenu from './SupplierMenu';
import SelectColumns from './SelectColumns';
import { Supplier } from '../../../interfaces/Supplier';
import './index.scss';
import { tableKeys } from '../../../constants';
import get from 'lodash/get';
import LeadsTrackerToggle from '../../../components/LeadsTrackerToggle';
import _ from 'lodash';

import { formatCompletedDate } from '../../../utils/date';

interface SuppliersTableProps {
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  sellerSubscription: any;
  suppliers: Supplier[];
  onEdit: any;
  fetchSuppliers: () => void;
  fetchSynthesisProgressUpdates: () => void;
  fetchSupplierTableColumns: () => void;
  resetSuppliers: typeof resetSuppliers;
  favourite: (supplierID: number, tag: string) => void;
  unFavourite: (supplierID: number, tag: string) => void;
  reRun: (supplier: Supplier) => void;
  deleteSupplier: (supplierID: any) => void;
  setLeadsTracker: (sellerId: number, supplierId: number) => void;
  showTab: string;
  showColumns: any;
  currentSynthesisId: any;
  setProgress: any;
  setSpeed: any;
  currentActiveColumn: string;
  supplierSearch?: string;
  subscriptionPlan: string;
}

class SuppliersTable extends Component<SuppliersTableProps> {
  state = { showPieChartModalOpen: false, supplier: undefined, showDeleteConfirm: false };

  renderName = (row: Supplier) => {
    const name =
      row.file_status === 'completed' ? (
        <Link to={`/profit-finder/${row.supplier_id}`} onClick={() => setLatestSupplier(row)}>
          {row.search}
        </Link>
      ) : (
        row.search
      );
    return <div className="supplier">{name}</div>;
  };

  renderFileName = (row: Supplier) => {
    return (
      <div className="filename">
        {row.file_status && (
          <a href={row.file_url} download={true}>
            {row.file_name}
          </a>
        )}
      </div>
    );
  };

  renderLeadsTracker = (row: Supplier) => {
    const { setLeadsTracker } = this.props;
    const leadsStatus =
      row.leads_tracker_status === null || row.leads_tracker_status === 'inactive';
    const isToggle = leadsStatus ? false : true;

    return (
      <LeadsTrackerToggle
        setLeadsTracker={setLeadsTracker}
        seller_id={row.seller_id}
        supplier_id={row.supplier_id}
        isToggle={isToggle}
        disabled={row.file_status !== 'completed'}
      />
    );
  };

  renderActions = (row: Supplier) => {
    return (
      <Dropdown
        className={'syn-dropdown-link syn-dropdown-label'}
        text="Profit Finder"
        floating={true}
        selectOnBlur={false}
        fluid={true}
        selection={true}
        disabled={row.file_status !== 'completed' ? true : false}
        options={[
          {
            key: '0',
            text: <Dropdown.Item icon="spinner" text=" Profit Finder" />,
            value: 'SYN',
          },
          {
            key: '1',
            text: (
              <a href={row.file_url} download={true}>
                <Dropdown.Item icon="cart arrow down" text=" Download Search File" />
              </a>
            ),
            value: 'dwn_sp_file',
          },
          {
            key: '2',
            text:
              row.report_url === null ? (
                <Dropdown.Item icon="download" text=" Download Result File" />
              ) : (
                <a href={row.report_url} download={true}>
                  <Dropdown.Item icon="download" text=" Download Result File" />
                </a>
              ),
            value: 'dwn_res',
            disabled: row.report_url === null ? true : false,
          },
          {
            key: '3',
            text: <Dropdown.Item icon="sync alternate" text=" Re-run" />,
            value: 'rerun',
            onClick: () => this.props.reRun(row),
          },
        ]}
        onChange={(e, data) => {
          if (data.value === 'SYN') {
            history.push(`/profit-finder/${row.supplier_id}`);
          }
        }}
      />
    );
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteConfirm: false });
  };
  handleConfirmDelete = () => {
    this.setState({ showDeleteConfirm: false });
    const { deleteSupplier } = this.props;
    const { supplier } = this.state;
    deleteSupplier(supplier);
  };

  renderOperations = (row: Supplier) => {
    if (
      row.file_status !== 'completed' &&
      row.file_status !== 'inactive' &&
      row.file_status !== 'failed' &&
      row.file_status !== null &&
      row.file_status !== undefined &&
      row.progress < 100
    ) {
      return '';
    }
    const { favourite, unFavourite } = this.props;
    return (
      <div className="operations">
        <Icon
          name="thumbs up"
          onClick={() => favourite(row.id, row.tag === 'like' ? '' : 'like')}
          style={row.tag === 'like' ? { color: '#349AF8' } : { color: '#DEDEDF' }}
        />
        <Icon
          name="thumbs down"
          onClick={() => unFavourite(row.id, row.tag === 'dislike' ? '' : 'dislike')}
          style={row.tag === 'dislike' ? { color: '#A2A2A2' } : { color: '#DEDEDF' }}
        />
        <Icon name="pencil" style={{ color: '#DEDEDF' }} onClick={() => this.props.onEdit(row)} />
        <Icon
          name="trash alternate"
          style={{ color: '#DEDEDF' }}
          onClick={() => this.setState({ supplier: row, showDeleteConfirm: true })}
        />
      </div>
    );
  };

  renderInventory = (row: Supplier) => {
    if (row.file_status !== 'completed') {
      return '';
    }
    return row.item_total_count;
  };
  renderSpeed = (row: Supplier) => (row.speed !== -1 ? `${row.speed}/min` : '');

  renderProgress = (row: Supplier) => {
    return row.progress !== -1 ? `${row.progress}%` : '';
  };

  renderCompleted = (row: Supplier) => {
    if (row.file_status !== 'completed') {
      return '';
    }
    return formatCompletedDate(row.udate);
  };

  handlePieChartModalOpen = (supplier: any) => {
    this.setState({ showPieChartModalOpen: true, supplier });
  };
  handleClose = () => {
    this.setState({ showPieChartModalOpen: false, supplier: undefined });
  };

  renderPLRatio = (row: Supplier) => {
    if (row.file_status !== 'completed' || row.p2l_ratio === 0) {
      return '';
    }
    return (
      <div>
        <div className="product-ratio-with-pie">
          {row.p2l_ratio.toString().indexOf('.') === -1
            ? row.p2l_ratio.toString() + '.00%'
            : row.p2l_ratio.toString() + '%'}
        </div>
        <Icon name="chart pie" onClick={this.handlePieChartModalOpen.bind(this, row)} />
      </div>
    );
  };

  renderSupplierRate = (row: Supplier) => {
    if (row.file_status !== 'completed') {
      return '';
    }
    return row.rate !== null ? row.rate.toString() + '%' : row.rate;
  };

  columns: Column[] = [
    {
      label: 'Search Name',
      dataKey: 'search',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderName,
    },
    {
      label: 'File Name',
      dataKey: 'file_name',
      sortable: true,
      type: 'string',
      show: true,
      render: this.renderFileName,
    },
    {
      label: 'Inventory',
      sortable: true,
      type: 'number',
      dataKey: 'item_total_count',
      show: true,
      render: this.renderInventory,
    },
    // {
    //   label: 'Speed',
    //   dataKey: 'speed',
    //   sortable: true,
    //   type: 'number',
    //   show: true,
    //   render: this.renderSpeed,
    // },
    {
      label: 'Progress',
      dataKey: 'progress',
      sortable: true,
      type: 'number',
      show: true,
      render: this.renderProgress,
    },
    {
      label: 'Ratio',
      dataKey: 'p2l_ratio',
      sortable: true,
      type: 'number',
      show: true,
      render: this.renderPLRatio,
    },
    {
      label: 'Profitable',
      dataKey: 'rate',
      sortable: true,
      type: 'number',
      show: true,
      render: this.renderSupplierRate,
    },
    {
      label: 'Completed',
      dataKey: 'udate',
      sortable: true,
      type: 'date',
      show: true,
      render: this.renderCompleted,
    },
    {
      label: 'Action',
      dataKey: 'action',
      show: true,
      render: this.renderActions,
    },
    {
      label: 'Leads Tracking',
      dataKey: 'leads_tracking',
      show: true,
      render: this.renderLeadsTracker,
    },
    {
      label: 'Other',
      dataKey: 'other',
      show: true,
      render: this.renderOperations,
    },
  ];

  componentDidMount() {
    const {
      resetSuppliers,
      fetchSuppliers,
      fetchSynthesisProgressUpdates,
      fetchSupplierTableColumns,
    } = this.props;
    resetSuppliers();
    fetchSuppliers();
    fetchSupplierTableColumns();
    if (this.props.suppliers.length !== 1 && this.props.suppliers[0] !== undefined) {
      fetchSynthesisProgressUpdates();
    }
  }

  componentWillUnmount() {
    this.props.resetSuppliers();
  }
  render() {
    const {
      suppliers,
      showTab,
      showColumns,
      scrollTopSelector,
      stickyChartSelector,
      currentActiveColumn,
      supplierSearch,
    } = this.props;

    if (suppliers.length === 1 && suppliers[0] === undefined) {
      return (
        <Segment>
          <Loader
            hidden={suppliers.length === 1 && suppliers[0] === undefined ? false : true}
            active={true}
            inline="centered"
            size="massive"
          >
            Loading
          </Loader>
        </Segment>
      );
    }

    const all = suppliers.filter(supplier => supplier.status !== 'inactive');
    const allData = all.filter(supplier => supplier.progress !== -1);
    const draftData = all.filter(
      supplier => supplier.progress === -1 || supplier.file_status === 'inactive'
    );
    const shortlistedData = allData.filter(supplier => supplier.tag === 'like');
    const archivedData = allData.filter(supplier => supplier.tag === 'dislike');

    const data =
      showTab === 'all'
        ? allData
        : showTab === 'shortlisted'
        ? shortlistedData
        : showTab === 'archived'
        ? archivedData
        : draftData;
    const columns = this.columns.map(e =>
      showColumns[e.dataKey || ''] ? { ...e, ...{ show: false } } : e
    );

    const sortedByCompletedData = _.cloneDeep(data).sort((a, b) => (a.udate > b.udate ? 1 : -1));

    return (
      <div className="suppliers-table">
        <Grid columns={2} style={{ alignItems: 'center' }} className={'ipad-wdth100'}>
          <Grid.Column floated="left" className={'wdt100 ipad-wdth100'}>
            <SupplierMenu
              activeTab={showTab}
              allCount={allData.length}
              shortlistedCount={shortlistedData.length}
              archivedCount={archivedData.length}
              draftCount={draftData.length}
            />
          </Grid.Column>
          <Grid.Column
            floated="right"
            className={'wdt100 ipad-wdth100'}
            style={{ flex: '0 0 auto', width: 'auto' }}
          >
            <SelectColumns columns={columns} />
          </Grid.Column>
        </Grid>
        <GenericTable
          currentActiveColumn={currentActiveColumn}
          stickyChartSelector={stickyChartSelector}
          scrollTopSelector={scrollTopSelector}
          key={`Suppliers-${showTab}`}
          tableKey={tableKeys.SUPPLIERS}
          data={sortedByCompletedData}
          columns={columns}
          name={'supplier'}
          searchValue={supplierSearch}
        />
        <Confirm
          content="Do you want to delete supplier?"
          open={this.state.showDeleteConfirm}
          onCancel={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        />
        <PieChartModal
          supplier={this.state.supplier}
          showPieChartModalOpen={this.state.showPieChartModalOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  suppliers: suppliersSelector(state),
  showTab: suppliersTableTabSelector(state),
  showColumns: suppliersTableColumnsSelector(state),
  currentSynthesisId: currentSynthesisId(state),
  sellerSubscription: get(state, 'subscription.sellerSubscription'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  currentActiveColumn: get(state, 'supplier.activeColumn'),
  subscriptionPlan: get(state, 'subscription.plan'),
});

const mapDispatchToProps = {
  resetSuppliers,
  fetchSuppliers,
  fetchSynthesisProgressUpdates,
  fetchSupplierTableColumns,
  favourite: (supplierID: number, tag: string) => setFavouriteSupplier(supplierID, tag),
  unFavourite: (supplierID: number, tag: string) => setFavouriteSupplier(supplierID, tag),
  reRun: (supplier: Supplier) => postSynthesisRerun(supplier),
  deleteSupplier: (supplier: any) => deleteSupplier(supplier),
  setLeadsTracker: (sellerId: number, supplierId: number) => setLeadsTracker(sellerId, supplierId),
  setProgress,
  setSpeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersTable);
