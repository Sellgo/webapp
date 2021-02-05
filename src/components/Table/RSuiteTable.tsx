import React from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'; // or 'rsuite-table/dist/css/rsuite-table.css';
import './RSutieTable.scss';
interface Props {
  data: any[];
  columns: any[];
}

const RSuiteTable = (props: Props) => {
  const { data, columns } = props;
  return (
    <div>
      <Table
        height={600}
        data={data}
        onRowClick={data => {
          console.log(data);
        }}
        headerHeight={50}
        hover
        locale={{ emptyMessage: 'Loading ...' }}
        minHeight={400}
        rowHeight={60}
        rowKey={'id'}
      >
        {columns.map((c: any) => {
          return (
            <Column width={180} align="center" key={c.dataKey} fixed={c.fixed}>
              <HeaderCell depth={50} width={180}>
                {c.label || '#'}
              </HeaderCell>
              <Cell depth={50} width={180} dataKey={c.dataKey}>
                {(rowData: any) => {
                  return c.render ? c.render(rowData) : '';
                }}
              </Cell>
            </Column>
          );
        })}
      </Table>
    </div>
  );
};

export default RSuiteTable;
