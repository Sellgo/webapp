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
} from '../../../actions/Suppliers';
import { currentSynthesisId } from '../../../selectors/UploadSupplier';
import { connect } from 'react-redux';
import { Icon, Confirm, Segment, Loader, Grid } from 'semantic-ui-react';
import { GenericTable, Column } from '../../../components/Table';
import {
  suppliersSelector,
  suppliersTableTabSelector,
  suppliersTableColumnsSelector,
} from '../../../selectors/Supplier';
import PieChartModal from './PieChartModal';
import SupplierMenu from './SupplierMenu';
import SelectColumns from './SelectColumns';
import { Supplier } from '../../../interfaces/Supplier';
import { amazonMWSAuthorizedSelector } from '../../../selectors/Settings';
import './index.scss';
import { tableKeys } from '../../../constants';
import { handleUnauthorizedMwsAuth } from '../../../actions/Settings';
import get from 'lodash/get';
import { isSubscriptionFree } from '../../../utils/subscriptions';

interface SuppliersTableProps {
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  subscriptionType: string;
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
  showTab: string;
  showColumns: any;
  amazonMWSAuthorized: boolean;
  currentSynthesisId: any;
  setProgress: any;
  setSpeed: any;
  handleUnauthorizedMwsAuth: any;
}

class SuppliersTable extends Component<SuppliersTableProps> {
  state = { showPieChartModalOpen: false, supplier: undefined, showDeleteConfirm: false };

  renderFileName = (row: Supplier) => {
    const { subscriptionType } = this.props;
    return (
      <div className="filename">
        {row.file_status &&
          (!isSubscriptionFree(subscriptionType) ? (
            <a href={row.file_url} download={true}>
              {row.file_name}
            </a>
          ) : (
            row.file_name
          ))}
      </div>
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
    return new Date(row.udate).toLocaleString();
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
      label: 'Rate',
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
    const { suppliers, showTab, showColumns, scrollTopSelector, stickyChartSelector } = this.props;

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
          stickyChartSelector={stickyChartSelector}
          scrollTopSelector={scrollTopSelector}
          key={`Suppliers-${showTab}`}
          tableKey={tableKeys.SUPPLIERS}
          data={data}
          columns={columns}
          name={'supplier'}
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
  amazonMWSAuthorized: amazonMWSAuthorizedSelector(state),
  currentSynthesisId: currentSynthesisId(state),
  subscriptionType: get(state, 'subscription.subscriptionType'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
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
  setProgress,
  setSpeed,
  handleUnauthorizedMwsAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersTable);
