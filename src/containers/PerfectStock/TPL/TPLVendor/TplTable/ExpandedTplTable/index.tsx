import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import DaysOfInventory from '../DaysOfInventory';
import MultipleStats from '../MultipleStats';
import SingleStatBox from '../SingleStatBox';
import ShipmentQuantity from '../Quantity';

/* Interfaces */
import { TplInbound } from '../../../../../../interfaces/PerfectStock/Tpl';

/* Selector */
import { getActiveTplInbound } from '../../../../../../selectors/PerfectStock/Tpl';
interface Props {
  // States
  isLoadingTplSkuData: boolean;
  rowData: any;
  activeTplInbound: TplInbound;
}

/* Main component */
const ExpandedTplTable = (props: Props) => {
  const { rowData, activeTplInbound } = props;
  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        {/* Expected Sales  */}
        <div
          className={styles.expandedTableCol}
          style={{
            width: '300px',
          }}
        />
        {/* <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>Automate shipment plan</p>
          <ScheduleToSendIn dataKey="interval" rowData={rowData} />
        </div>

        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>Shippment due in</p>
        </div> */}
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            Days of <br /> Inventory
          </p>
          <DaysOfInventory dataKey="inventory_threshold" rowData={rowData} />
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>Sales</p>
          <MultipleStats
            isFloat
            displayData={[
              // {
              //   title: 'Total LND',
              //   dataKey: 'total_lnd',
              // },
              // {
              //   title: 'Daily LND',
              //   dataKey: 'avg_lnd',
              // },
              {
                title: 'Forecast',
                dataKey: 'forecast',
              },
            ]}
            rowData={rowData}
            dataKey="fulfillable_fba"
          />
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            FBA Fulfillable <br /> Inventory
          </p>
          <SingleStatBox dataKey="fulfillable" rowData={rowData} highlightZero />
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            Days of Fulfillable <br /> Inventory
          </p>
          <SingleStatBox dataKey="days_until_so_fulfillable" rowData={rowData} highlightZero />
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            Total <br /> 3PL Stock
          </p>
          <SingleStatBox dataKey="tpl_quantity" rowData={rowData} />
        </div>
        {activeTplInbound.id > 0 && (
          <div className={styles.expandedTableCol}>
            <p className={styles.expandedTableCol__label}>Shipment Quantity</p>
            <ShipmentQuantity rowData={rowData} dataKey={''} />
            {/* <MultipleStats
              displayData={[
                {
                  title: 'Using LND',
                  dataKey: 'send_quantity_lnd',
                },
                {
                  title: 'Using Pred',
                  dataKey: 'send_quantity_predictive',
                },
                {
                  title: 'Avg',
                  dataKey: 'send_quantity_avg',
                },
              ]}
              dataKey="working"
              rowData={rowData}
            /> */}
          </div>
        )}
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>Shipment Quantity</p>
          <MultipleStats
            displayData={[
              {
                title: 'Units/ Carton',
                dataKey: 'carton_count',
              },
              {
                title: 'Carton #',
                dataKey: 'total_carton',
              },
            ]}
            dataKey="total_carton"
            rowData={rowData}
          />
        </div>
        {/* <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>Oversized?</p>
          <p className={styles.expandedTableCol__value}>False</p>
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            Last <br /> Replensishment
          </p>
          <p className={styles.expandedTableCol__value}>Date Time</p>
          <p className={styles.expandedTableCol__value}>Replenishment #</p>
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            L7D Potential <br /> Reimbursement
          </p>
          <p className={styles.expandedTableCol__value}>$1,000.475</p>
          <p className={styles.expandedTableCol__value}>0</p>
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            L30D Potential <br /> Reimbursement
          </p>
          <p className={styles.expandedTableCol__value}>$1,000.475</p>
          <p className={styles.expandedTableCol__value}>0</p>
        </div>
        <div className={styles.expandedTableCol}>
          <p className={styles.expandedTableCol__label}>
            YTD Potential <br /> Reimbursement
          </p>
          <p className={styles.expandedTableCol__value}>$1,000.475</p>
          <p className={styles.expandedTableCol__value}>0</p>
        </div> */}
      </section>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    activeTplInbound: getActiveTplInbound(state),
  };
};

export default connect(mapStateToProps)(ExpandedTplTable);
