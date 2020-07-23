import React, { Component } from 'react';
import get from 'lodash/get';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSupplierTableColumns } from '../../../actions/Suppliers';
import { Column } from '../../../components/Table';
import { isPlanEnterprise } from '../../../utils/subscriptions';

interface SelectColumnsProps {
  columns: Column[];
  setColumn: (column: {}) => void;
  subscriptionType: string;
}
class SelectColumns extends Component<SelectColumnsProps> {
  handleItemClick = (column: Column) => {
    const changeColumn: any = {};
    changeColumn[column.dataKey || ''] = column.show;
    this.props.setColumn(changeColumn);
    let suppliersTableColumns: any = localStorage.getItem('suppliersTableColumns');
    if (!suppliersTableColumns) suppliersTableColumns = {};
    else suppliersTableColumns = JSON.parse(suppliersTableColumns);
    localStorage.setItem(
      'suppliersTableColumns',
      JSON.stringify({ ...suppliersTableColumns, ...changeColumn })
    );
  };
  handleAllClick = () => {
    const isAllChecked = this.props.columns.every(e => e.show || false);
    const changeColumn = this.props.columns.reduce((a: any, c: Column) => {
      if (!a[c.dataKey || '']) a[c.dataKey || ''] = isAllChecked;
      return a;
    }, {});
    this.props.setColumn(changeColumn);
    localStorage.setItem('suppliersTableColumns', JSON.stringify(changeColumn));
  };
  render() {
    const { columns, subscriptionType } = this.props;
    const isAllChecked = columns.every(e => e.show || false);

    const filterOptions = columns.filter(column => {
      if (!isPlanEnterprise(subscriptionType)) {
        return column.dataKey !== 'leads_tracking';
      }
      return column;
    });

    return (
      <Dropdown
        selection
        floating
        text="Select Columns"
        renderLabel={() => false}
        closeOnChange={false}
        options={[
          {
            text: (
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name={'selectAll'}
                  value={'selectAll'}
                  checked={isAllChecked}
                  readOnly
                />
                <label>Select All</label>
              </div>
            ),
            value: '',
            onClick: ev => {
              ev.stopPropagation();
              this.handleAllClick();
            },
          },
          ...filterOptions.map((column: Column) => ({
            text: (
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name={column.label}
                  value={column.dataKey}
                  checked={column.show}
                  readOnly
                />
                <label id={column.dataKey}>{column.label}</label>
              </div>
            ),
            value: column.dataKey,
            onClick: (ev: any) => {
              ev.stopPropagation();
              this.handleItemClick(column);
            },
          })),
        ]}
      />
    );
  }
}

const mapStateToProps = (state: {}) => ({
  subscriptionType: get(state, 'subscription.subscriptionType'),
});

const mapDispatchToProps = {
  setColumn: (column: {}) => setSupplierTableColumns(column),
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectColumns);
