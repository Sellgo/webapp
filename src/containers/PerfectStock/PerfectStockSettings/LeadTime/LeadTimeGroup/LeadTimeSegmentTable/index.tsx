import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../../../../../components/NewTable/DeleteCell';
import EditValueCell from '../../../../../../components/NewTable/EditValueCell';

interface Props {
  leadTimeSegments: any[];
  triggerId: number;
  refreshData: () => void;
}

const LeadTimeSegmentTable = (props: Props) => {
  console.log(props);

  const handleDeleteProduct = async (productId: number) => {
    console.log(productId);
  };

  const DATA = {
    id: 1,
    name: 'default 2',
    in_production: 12,
    ocean_freight: 11,
    ground_freight: 23,
    warehouse_3pl: 2,
    fba_checkin: 12,
  };

  const tableData = [
    {
      type: 'In Production',
      duration: DATA.in_production,
    },
    {
      type: 'Ocean Freight',
      duration: DATA.ocean_freight,
    },
    {
      type: 'Ground Freight',
      duration: DATA.ground_freight,
    },
    {
      type: 'Warehouse 3PL',
      duration: DATA.warehouse_3pl,
    },
    {
      type: 'FBA Checkin',
      duration: DATA.fba_checkin,
    },
  ];

  return (
    <section className={styles.keywordTrackerTableWrapper}>
      <Table
        // loading={false}
        data={tableData}
        // height={420}
        autoHeight
        hover={false}
        rowHeight={60}
        headerHeight={55}
        id="leadTimeTable"
        shouldUpdateScroll={false}
      >
        {/* Lead Time Type */}
        <Table.Column width={200} verticalAlign="middle" align="center">
          <Table.HeaderCell>Lead Time Type</Table.HeaderCell>
          <Table.Cell dataKey="type" />
        </Table.Column>

        {/* Keywords */}
        <Table.Column width={200} verticalAlign="middle" align="center">
          <Table.HeaderCell>
            <span className={styles.orangeNumber}>60&nbsp;</span> Days
          </Table.HeaderCell>
          <EditValueCell dataKey="duration" handleChange={() => console.log('x')} />
        </Table.Column>

        {/* Delete Cell */}
        <Table.Column flexGrow={1} verticalAlign="middle" align="right">
          <Table.HeaderCell />
          <DeleteCell
            dataKey="keyword_track_product_id"
            deleteMessage="Remove this lead time?"
            handleDelete={handleDeleteProduct}
          />
        </Table.Column>
      </Table>
    </section>
  );
};

export default LeadTimeSegmentTable;
