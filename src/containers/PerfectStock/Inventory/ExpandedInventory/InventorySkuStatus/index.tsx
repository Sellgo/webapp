import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import HeaderSortCell from '../../../../../components/NewTable/HeaderSortCell';
import SkuStatCell from './SkuStatCell';
import Placeholder from '../../../../../components/Placeholder';

/* Assets */
import { ReactComponent as InventoryIcon } from '../../../../../assets/images/inventory.svg';
import { ReactComponent as AmazonIcon } from '../../../../../assets/images/amazonLogo.svg';
import { ReactComponent as TruckIcon } from '../../../../../assets/images/truck-solid.svg';
import { ReactComponent as SigmaIcon } from '../../../../../assets/images/sigmaIcon.svg';

interface Props {
  className?: string;
  rowData: any;
}

const InventorySkuStatus = (props: Props) => {
  const { className, rowData } = props;

  return (
    <div className={`${styles.expandedProductSettings} ${className}`}>
      <BoxHeader className={styles.settingsBoxHeader}>Today&apos;s SKU Status</BoxHeader>
      <BoxContainer className={styles.settingsBoxContainer}>
        <Table
          renderLoading={() => false && <Placeholder numberParagraphs={2} numberRows={3} isGrey />}
          renderEmpty={() => <div />}
          data={[rowData]}
          hover={false}
          autoHeight
          rowHeight={120}
          headerHeight={60}
          rowKey="id"
          className={styles.inventorySkuStatusTable}
          id="inventorySkuStatusTable"
        >
          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Expected\nInventory`}
                dataKey="expected_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<InventoryIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="expected_inventory" icon={<SigmaIcon />} />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Amz FBA\nInventory`}
                dataKey="fba_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<AmazonIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="fba_inventory" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Inbound\nto FBA`}
                dataKey="fba_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<TruckIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="fba_inventory" />
          </Table.Column>
        </Table>
      </BoxContainer>
    </div>
  );
};

export default InventorySkuStatus;
