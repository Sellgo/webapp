import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../constants/PerfectStock/OrderPlanning';

/* Utils */
import { showNAIfZeroOrNull, formatDecimal } from '../../utils/format';

interface Props {
  name: string;
  containerDropDownOptions: any;
  maxVolumeCBM: string;
  maxVolumeFT: string;
  orderEfficency: string;
  orderVolumeCDM: string;
  orderVolumeFT: string;
  dropDownActiveValue: number;
  handleContainerChange: any;
}

const OrderVolumeOptimizationComponent = (props: Props) => {
  const {
    name,
    containerDropDownOptions,
    maxVolumeCBM,
    maxVolumeFT,
    orderEfficency,
    orderVolumeCDM,
    orderVolumeFT,
    dropDownActiveValue,
    handleContainerChange,
  } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  return (
    <>
      <div
        className={
          isOpen
            ? styles.orderSummaryWrapper
            : `${styles.orderSummaryWrapper} ${styles.orderSummaryWrapperClosed}`
        }
      >
        <div
          className={styles.orderName}
          style={{
            minWidth: OFFSET_TO_CHART_WIDTH - 112,
          }}
        >
          volume optimization: {name}
        </div>
        {isOpen && (
          <>
            <div className={styles.statWrapper}>
              <span className={styles.statHeader}>Container</span>
              <Dropdown
                placeholder="Select Container"
                fluid
                selection
                value={dropDownActiveValue}
                onChange={(e, { value }) => {
                  handleContainerChange(value);
                }}
                options={containerDropDownOptions}
              />
            </div>
            <div className={styles.statWrapper}>
              <span className={styles.statHeader}>Max Volume</span>
              <span className={`${styles.stat} ${styles.stat__double}`}>
                {showNAIfZeroOrNull(maxVolumeCBM, formatDecimal(maxVolumeCBM))}m
                <span className={styles.super}>3</span>
              </span>
              <span className={`${styles.stat} ${styles.stat__double}`}>
                {showNAIfZeroOrNull(maxVolumeFT, formatDecimal(maxVolumeFT))}ft
                <span className={styles.super}>3</span>
              </span>
            </div>
            <div className={styles.statWrapper}>
              <span className={styles.statHeader}>Order Efficency</span>
              <span className={`${styles.stat}`}>
                {showNAIfZeroOrNull(orderEfficency, formatDecimal(orderEfficency))}%
              </span>
            </div>
            <div className={styles.statWrapper}>
              <span className={styles.statHeader}>Order Volume</span>
              <span className={`${styles.stat} ${styles.stat__double}`}>
                {showNAIfZeroOrNull(orderVolumeCDM, formatDecimal(orderVolumeCDM))}m
                <span className={styles.super}>3</span>
              </span>
              <span className={`${styles.stat} ${styles.stat__double}`}>
                {showNAIfZeroOrNull(orderVolumeFT, formatDecimal(orderVolumeFT))}ft
                <span className={styles.super}>3</span>
              </span>
            </div>
          </>
        )}
        <span
          className={styles.icon}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Icon name={isOpen ? 'caret up' : 'caret down'} />
        </span>
      </div>
    </>
  );
};
export default React.memo(OrderVolumeOptimizationComponent);
