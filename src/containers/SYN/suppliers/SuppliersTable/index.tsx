import React, { Component, useEffect } from 'react';
import get from 'lodash/get';
import { Supplier, setFavouriteSupplier } from '../../../../Action/SYNActions';
import {
  resetSuppliers,
  fetchSuppliers,
  fetchSynthesisProgressUpdates,
} from '../../../../Action/suppliers';
import { connect } from 'react-redux';
import columns from './columns';
import { Table, Dropdown, Icon, Confirm } from 'semantic-ui-react';
import GenericTable, { Column } from '../../../../components/Table';
import { Link } from 'react-router-dom';
import { localStorageKeys } from '../../../../constant/constant';
import history from '../../../../history';
import { suppliersSelector } from '../../../../selectors/suppliers';
import isNil from 'lodash/isNil';

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
}

class SuppliersTable extends Component<SuppliersTableProps> {
  renderName = (row: Supplier) => (
    <Table.Cell as={Link} to={`/syn/${row.supplier_id}`}>
      {row.name}
    </Table.Cell>
  );

  renderFileName = (row: Supplier) => row.path.split('/').pop() || '';
  renderActions = (row: Supplier) => (
    <Dropdown
      className={'SynDropDown'}
      text="SYN"
      selectOnBlur={false}
      fluid={true}
      selection={true}
      options={[
        {
          key: '0',
          text: 'SYN',
          value: 'SYN',
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
          style={{ color: 'black' }}
        />
        <Icon
          name="thumbs down"
          onClick={() => this.props.unFavourite(row.id)}
          style={{ color: 'black' }}
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

  renderCompleted = (row: Supplier) => (!isNil(row.progress) ? `${row.progress}%` : '');

  columns: Column[] = [
    {
      label: 'Supplier Name',
      dataKey: 'name',
      sortable: true,
      render: this.renderName,
    },
    {
      label: 'File Name',
      dataKey: 'fileName',
      render: this.renderFileName,
    },
    {
      label: 'Status',
      dataKey: 'status',
    },
    {
      label: 'Action',
      dataKey: 'action',
      render: this.renderActions,
    },
    {
      label: 'Inventory',
      dataKey: 'item_total_count',
    },
    {
      label: 'Speed',
      render: this.renderSpeed,
    },
    {
      label: 'Completed',
      render: this.renderCompleted,
    },
    {
      label: 'Product to Listing Ratio',
      dataKey: 'p2l_ratio',
    },
    {
      label: 'Supplier Rate (%)',
      dataKey: 'rate',
      sortable: true,
      type: 'number',
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
    fetchSynthesisProgressUpdates();
  }

  componentWillUnmount() {
    this.props.resetSuppliers();
  }

  render() {
    const { suppliers, delete_confirmation, onCancelDelete, onDeleteSupplier } = this.props;

    return (
      <>
        <GenericTable
          data={suppliers.filter(supplier => supplier.status !== 'inactive')}
          columns={this.columns}
        />
        ;
        <Confirm
          content="Do you want to delete supplier?"
          open={delete_confirmation}
          onCancel={onCancelDelete}
          onConfirm={onDeleteSupplier}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersTable);
