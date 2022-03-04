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
import { ReactComponent as EnRouteIcon } from '../../../../../assets/images/enRouteIcon.svg';
import { ReactComponent as TPLIcon } from '../../../../../assets/images/3PLIcon.svg';
import { ReactComponent as InProductionIcon } from '../../../../../assets/images/InProductionIcon.svg';

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
          rowHeight={90}
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
                dataKey="total_expected_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<InventoryIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="total_expected_inventory" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Domestic\nInventory`}
                dataKey="total_domestic_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<InventoryIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="total_domestic_inventory" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Amz FBA\nInventory`}
                dataKey="total_fba_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<AmazonIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="total_fba_inventory" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Fulfillable\nInventory`}
                dataKey="fulfillable_fba"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<AmazonIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="fulfillable_fba" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Working\nInventory`}
                dataKey="working_fba"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<TruckIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="working_fba" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Inbound\nto FBA`}
                dataKey="inbound_fba"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<TruckIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="inbound_fba" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`3PL\nInventory`}
                dataKey="tpl_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<TPLIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="tpl_inventory" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Incoming\nInventory`}
                dataKey="incoming_inventory"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<InventoryIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="incoming_inventory" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`In\nProduction`}
                dataKey="in_production"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<InProductionIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="in_production" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={100} verticalAlign="top" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`En Route`}
                dataKey="en_route"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
                icon={<EnRouteIcon className={styles.headerIcon} />}
              />
            </Table.HeaderCell>
            <SkuStatCell dataKey="en_route" />
          </Table.Column>
        </Table>
      </BoxContainer>
    </div>
  );
};

export default InventorySkuStatus;
