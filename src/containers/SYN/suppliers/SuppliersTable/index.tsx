import React, { Component, useEffect } from 'react';
import get from 'lodash/get';
import { Supplier, setFavouriteSupplier, postSynthesisRerun } from '../../../../Action/SYNActions';
import {
  resetSuppliers,
  fetchSuppliers,
  fetchSynthesisProgressUpdates,
} from '../../../../Action/suppliers';
import { connect } from 'react-redux';
import columns from './columns';
import { Table, Dropdown, Icon, Confirm, Segment, Loader } from 'semantic-ui-react';
import GenericTable, { Column } from '../../../../components/Table';
import { Link } from 'react-router-dom';
import { localStorageKeys } from '../../../../constant/constant';
import history from '../../../../history';
import { suppliersSelector } from '../../../../selectors/suppliers';
import isNil from 'lodash/isNil';
import PieChartModal from './PieChartModal';

const ensure2Digits = (num: number) => (num > 9 ? `${num}` : `0${num}`);

interface SuppliersTableProps {
  delete_confirmation: boolean;
  suppliers: Supplier[];
  onMessageChange: any;
  onEdit: any;
  onDelete: any;
  onPageChange: any;
  onCancelDelete: any;
  onDeleteSupplier: any;
  fetchSuppliers: () => void;
  fetchSynthesisProgressUpdates: () => void;
  resetSuppliers: typeof resetSuppliers;
  favourite: (id: number) => void;
  unFavourite: (id: number) => void;
  reRun: (supplier: Supplier) => void;
}

class SuppliersTable extends Component<SuppliersTableProps> {
  state = { showPieChartModalOpen: false, supplier: undefined };
  renderName = (row: Supplier) => {
    if (row.file_status !== 'completed') return row.name;
    return <Link to={`/syn/${row.supplier_id}`}>{row.name}</Link>;
  };

  renderFileName = (row: Supplier) => {
    if (!row.file_status) return '';
    const fileName = row.path ? row.path.split('/').pop() : '';
    return (
      <a href={row.file_url} download>
        {' '}
        {fileName}{' '}
      </a>
    );
  };
  renderActions = (row: Supplier) => (
    <Dropdown
      className={'SynDropDownLink'}
      text="SYN"
      floating
      selectOnBlur={false}
      fluid
      selection
      disabled={row.file_status !== 'completed' ? true : false}
      options={[
        {
          key: '0',
          text: <Dropdown.Item icon="spinner" text=" Synthesis" />,
          value: 'SYN',
        },
        {
          key: '1',
          text: (
            <a href={row.file_url} download>
              <Dropdown.Item icon="cart arrow down" text=" Download Supplier File" />
            </a>
          ),
          value: 'dwn_sp_file',
        },
        {
          key: '2',
          text: (
            <a href={row.report_url} download>
              <Dropdown.Item icon="download" text=" Download Results" />
            </a>
          ),
          value: 'dwn_res',
        },
        {
          key: '3',
          text: (
            <Dropdown.Item
              icon="sync alternate"
              text=" Rerun"
              onClick={() => this.props.reRun(row)}
            />
          ),
          value: 'rerun',
        },
      ]}
      onChange={(e, data) => {
        if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
          if (data.value === 'SYN') {
            history.push(`/syn/${row.supplier_id}`);
          }
        } else {
          const message: any = {};
          message.title = 'Unauthorized Access';
          message.message = 'MWS Auth token not found';
          message.description = 'Please Setup MWS Authorization Token';
          message.to = '/dashboard/setting';
          message.icon = 'warning sign';
          message.color = '#cf3105';

          this.props.onMessageChange(message);
        }
      }}
    />
  );

  renderOperations = (row: Supplier) => {
    return (
      <div className="operations">
        <Icon
          name="thumbs up"
          onClick={() => this.props.favourite(row.id)}
          style={row.tag === 'like' ? { color: 'green' } : { color: 'lightgrey' }}
        />
        <Icon
          name="thumbs down"
          onClick={() => this.props.unFavourite(row.id)}
          style={row.tag === 'dislike' ? { color: 'red' } : { color: 'lightgrey' }}
        />
        <Icon name="pencil" style={{ color: 'black' }} onClick={() => this.props.onEdit(row)} />
        <Icon
          name="trash alternate"
          style={{ color: 'black' }}
          onClick={() => this.props.onDelete({ ...row, id: row.supplier_id })}
        />
      </div>
    );
  };

  renderSpeed = (row: Supplier) => (!isNil(row.speed) ? `${row.speed}/min` : '');

  renderProgress = (row: Supplier) => (!isNil(row.progress) ? `${row.progress}%` : '');

  renderCompleted = (row: Supplier) => {
    if (row.file_status !== 'completed') return '';
    return new Date(row.udate).toLocaleString();
  };

  handlePieChartModalOpen = (supplier: any) => {
    this.setState({ showPieChartModalOpen: true, supplier });
  };
  handleClose = () => {
    this.setState({ showPieChartModalOpen: false, supplier: undefined });
  };

  renderPLRatio = (row: Supplier) => {
    if (row.file_status !== 'completed') return '';
    return (
      <>
        {`${ensure2Digits(Math.floor(Math.abs(row.p2l_ratio)))}.${ensure2Digits(
          Math.floor(Math.abs((row.p2l_ratio % 1) * 100))
        )}  `}
        <Icon name="chart pie" onClick={this.handlePieChartModalOpen.bind(this, row)} />
      </>
    );
  };

  renderSupplierRate = (row: Supplier) => {
    if (row.file_status !== 'completed') return '';
    return row.rate;
  };

  columns: Column[] = [
    {
      label: 'Supplier',
      dataKey: 'name',
      sortable: true,
      render: this.renderName,
    },
    {
      label: 'Filename',
      dataKey: 'fileName',
      sortable: true,
      render: this.renderFileName,
    },
    {
      label: 'Account Status',
      sortable: true,
      dataKey: 'account_status',
    },
    {
      label: 'Action',
      dataKey: 'action',
      render: this.renderActions,
    },
    {
      label: 'Inventory',
      sortable: true,
      dataKey: 'item_total_count',
    },
    {
      label: 'Speed',
      sortable: true,
      render: this.renderSpeed,
    },
    {
      label: 'Progress',
      sortable: true,
      render: this.renderProgress,
    },
    {
      label: 'Completed',
      sortable: true,
      render: this.renderCompleted,
    },
    {
      label: 'Product to Listing Ratio',
      sortable: true,
      dataKey: 'p2l_ratio',
      render: this.renderPLRatio,
    },
    {
      label: 'Supplier Rate (%)',
      dataKey: 'rate',
      sortable: true,
      render: this.renderSupplierRate,
    },
    {
      label: '',
      render: this.renderOperations,
    },
  ];

  componentDidMount() {
    const { resetSuppliers, fetchSuppliers, fetchSynthesisProgressUpdates } = this.props;
    resetSuppliers();
    fetchSuppliers();
    if (this.props.suppliers.length !== 1 && this.props.suppliers[0] !== undefined)
      fetchSynthesisProgressUpdates();
  }

  componentWillUnmount() {
    this.props.resetSuppliers();
  }

  render() {
    const { suppliers, delete_confirmation, onCancelDelete, onDeleteSupplier } = this.props;

    return suppliers.length === 1 && suppliers[0] === undefined ? (
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
    ) : (
      <>
        <GenericTable
          data={suppliers.filter(supplier => supplier.status !== 'inactive')}
          columns={this.columns}
        />
        <Confirm
          content="Do you want to delete supplier?"
          open={delete_confirmation}
          onCancel={onCancelDelete}
          onConfirm={onDeleteSupplier}
        />
        <PieChartModal
          supplier={this.state.supplier}
          showPieChartModalOpen={this.state.showPieChartModalOpen}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  suppliers: suppliersSelector(state),
});

const mapDispatchToProps = {
  resetSuppliers,
  fetchSuppliers,
  fetchSynthesisProgressUpdates,
  favourite: (id: number) => setFavouriteSupplier(id, true),
  unFavourite: (id: number) => setFavouriteSupplier(id, false),
  reRun: (supplier: Supplier) => postSynthesisRerun(supplier),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersTable);
