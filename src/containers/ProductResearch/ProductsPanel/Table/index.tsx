import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Table } from 'rsuite';

/* import default style */
import 'rsuite/dist/styles/rsuite-default.css';

/* Styling */
import styles from './index.module.scss';
import '../../tableReset.scss';

/* Components */
import AnalyticsGrid from '../TableDetails/AnalyticsGrid';

const dataList = [
  {
    id: 1,
    avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg',
    city: 'New Amieshire',
    email: 'Leora13@yahoo.com',
    firstName: 'Ernest Schuppe SchuppeSchuppeSchuppeSchuppeSchuppeSchuppe Schuppe',
    lastName: 'Schuppe',
    street: 'Ratke Port',
    zipCode: '17026-3154',
    date: '2016-09-23T07:57:40.195Z',
    bs: 'global drive functionalities',
    catchPhrase: 'Intuitive impactful software',
    companyName: 'Lebsack - Nicolas',
    words: 'saepe et omnis',
    sentence: 'Quos aut sunt id nihil qui.',
    stars: 820,
    followers: 70,
  },
  {
    id: 2,
    avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg',
    city: 'New Gust',
    email: 'Mose_Gerhold51@yahoo.com',
    firstName: 'Janis',
    lastName: 'Vandervort',
    street: 'Dickinson Keys',
    zipCode: '43767',
    date: '2017-03-06T09:59:12.551Z',
    bs: 'e-business maximize bandwidth',
    catchPhrase: 'De-engineered discrete secured line',
    companyName: 'Glover - Hermiston',
    words: 'deleniti dolor nihil',
    sentence: 'Illo quidem libero corporis laborum.',
    stars: 1200,
    followers: 170,
  },
  {
    id: 3,
    avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg',
    city: 'New Gust',
    email: 'Mose_Gerhold51@yahoo.com',
    firstName: 'Janis',
    lastName: 'Vandervort',
    street: 'Dickinson Keys',
    zipCode: '43767',
    date: '2017-03-06T09:59:12.551Z',
    bs: 'e-business maximize bandwidth',
    catchPhrase: 'De-engineered discrete secured line',
    companyName: 'Glover - Hermiston',
    words: 'deleniti dolor nihil',
    sentence: 'Illo quidem libero corporis laborum.',
    stars: 1200,
    followers: 170,
  },
];

const ROW_KEY = 'id';
/* Icon to be clicked to expand row (the plus icon) */
// @ts-ignore
const ExpandCell = ({ rowData, dataKey, onChange, ...props }) => (
  <Table.Cell {...props}>
    <p
      onClick={() => {
        onChange(rowData, dataKey);
      }}
    >
      ICON
    </p>
  </Table.Cell>
);

/* Div that appears if you click the ICON to expand the row, to be replaced. */
const ExpandedCell = (rowData: any) => {
  return <div>{rowData.firstName}</div>;
};

const ProductsDatabaseTable = () => {
  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<any[]>([]);

  const handleExpanded = (rowData: any, dataKey: any) => {
    if (dataKey === ROW_KEY) {
      if (expandedRowKeys[0] && expandedRowKeys[0] === rowData[ROW_KEY]) {
        setExpandedRowKeys([]);
      } else {
        setExpandedRowKeys([rowData[ROW_KEY]]);
      }
    }
  };

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  return (
    <section className={styles.productsDatabaseTable}>
      <Table
        data={dataList}
        hover
        height={1000}
        rowHeight={250}
        onSortColumn={handleSortColumn}
        sortType={sortType}
        sortColumn={sortColumn}
        /* Expandable row settings */
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={ExpandedCell}
        rowExpandedHeight={100}
        rowKey="id"
      >
        <Table.Column width={80} fixed>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <ExpandCell
            rowData="id"
            dataKey="id"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Table.Column>

        <Table.Column width={250} fixed>
          <Table.HeaderCell>grid</Table.HeaderCell>
          <Table.Cell dataKey="id">
            <AnalyticsGrid />
          </Table.Cell>
        </Table.Column>

        <Table.Column width={200} fixed sortable>
          <Table.HeaderCell>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
              <p>First Name</p>
              {sortColumn === 'firstName' && sortType === 'asc' && <Icon name="sort up" />}
              {sortColumn === 'firstName' && sortType === 'desc' && <Icon name="sort down" />}
              {sortColumn !== 'firstName' && <Icon name="sort" />}
            </div>
          </Table.HeaderCell>
          <Table.Cell dataKey="firstName" />
        </Table.Column>

        <Table.Column width={200}>
          <Table.HeaderCell>Last Name</Table.HeaderCell>
          <Table.Cell dataKey="lastName" />
        </Table.Column>

        <Table.Column width={200}>
          <Table.HeaderCell>City</Table.HeaderCell>
          <Table.Cell dataKey="city" />
        </Table.Column>

        <Table.Column width={200}>
          <Table.HeaderCell>Street</Table.HeaderCell>
          <Table.Cell dataKey="street" />
        </Table.Column>

        <Table.Column width={300}>
          <Table.HeaderCell>Company Name</Table.HeaderCell>
          <Table.Cell dataKey="companyName" />
        </Table.Column>

        <Table.Column width={800}>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.Cell dataKey="email" />
        </Table.Column>
      </Table>
    </section>
  );
};

export default ProductsDatabaseTable;
