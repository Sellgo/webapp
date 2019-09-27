import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import TableHeader from '../../components/ProfitSysTable/tableHeader';
import TableBody from '../../components/ProfitSysTable/tableBody';
import { RAW_DATA, HEADER } from '../../utils/constants';
import './profitSysTable.css';
import _ from 'lodash';

class ProfitSysTable extends React.Component<any, any> {
  state = {
    column: null,
    data: RAW_DATA,
    header: HEADER,
    direction: null,
  };

  handleSort = (clickedColumn: any, sortableColumn: any) => () => {
    if (sortableColumn) {
      const { column, data, direction } = this.state;
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          data: _.sortBy(data, [clickedColumn]),
          direction: 'ascending',
        });
        return;
      }
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      });
    }
  };

  handleSelectAll = (event: any, isChecked: any) => {
    let { data } = this.state;
    data.map(datum => (datum.checked = isChecked));
    this.setState({ data });
  };

  handleItemSelect = (e: any, isChecked: any, index: any) => {
    let { data } = this.state;
    data[index].checked = isChecked;
    this.setState({ data });
  };

  render() {
    const { column, data, direction, header } = this.state;
    return (
      <React.Fragment>
        <div className="wrap_tbl">
          <Table sortable celled className="cstm_tbl tableRowSpace unstackable">
            <TableHeader
              header={header}
              onSelectAll={this.handleSelectAll}
              sortOnClick={this.handleSort}
              column={column}
              direction={direction}
            />
            <TableBody data={data} onSelectItem={this.handleItemSelect} />
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfitSysTable;
