import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';

/* Utils */
import { formatDecimal, showNAIfZeroOrNull, formatRating } from '../../../../../utils/format';

/* Components */
import HoveredCell from './HoveredCell';
import TooltipWrapper from '../../../../../components/TooltipWrapper';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

interface Props extends RowCell {
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
  daysOffset: number;
  secondaryDaysOffset?: number;
}

const SalesEstimationStat = (props: Props) => {
  const { daysOffset, secondaryDaysOffset, updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;

  /* Formatting key stats */
  const stat = showNAIfZeroOrNull(rowData[dataKey], formatRating(rowData[dataKey]));
  const included =
    rowData[`${dataKey}_included`] === 'true' || rowData[`${dataKey}_included`] === true;
  const showWeight = rowData.weighted_average_included;
  const weight = formatDecimal(rowData[`${dataKey}_weight`]);
  const label = rowData[`${dataKey}_label`];
  const totalDays = rowData[`${dataKey}_days_count`];
  const inStockDays = rowData[`${dataKey}_instock_count`];
  const isLoading = rowData.isLoading;
  // const isBestSeller = rowData[`${dataKey}_best_seller`];

  const handleIncludeExcludeStat = () => {
    /* If stat is currently included, update it to be false */
    const updatePayload = {
      id: rowData.id,
      updatePayload: {
        [`${dataKey}_included`]: included ? 'false' : 'true',
      },
    };
    updateSalesProjectionProduct(updatePayload);
  };

  let displayContent;
  if (label === 'no_projections') {
    displayContent = (
      <div className={styles.labelWrapper}>
        <div className={styles.noProjections}>
          <TooltipWrapper tooltipKey="No Projections">No Projections</TooltipWrapper>
        </div>
      </div>
    );
  } else if (label === 'stockout') {
    displayContent = (
      <div className={styles.labelWrapper}>
        <div className={styles.stockout}>
          <TooltipWrapper tooltipKey="Stock Out">Stockout</TooltipWrapper>
        </div>
      </div>
    );
  } else {
    displayContent = (
      <div
        className={`
          ${styles.salesEstimationStatCell}
          ${!included ? styles.salesEstimationStatCell__disabled : ''}
        `}
        onClick={handleIncludeExcludeStat}
      >
        {/* {isBestSeller && (
          <img src={BestSellerLogo} alt="best seller logo" className={styles.bestSellerLogo} />
        )} */}
        <div className={styles.statsDisplayCell}>
          <div className={styles.inStockDays}>
            In-stock {inStockDays}/{totalDays}
          </div>
          <div className={styles.mainStat}>{stat}</div>
          {showWeight && <div className={styles.weight}>{weight}%</div>}
        </div>
        <HoveredCell
          className={styles.hoveredCell}
          daysOffset={daysOffset}
          secondaryDaysOffset={secondaryDaysOffset}
          disabled={!included}
        />
      </div>
    );
  }

  return (
    <Table.Cell {...otherProps}>
      {isLoading ? <Loader active inline size="tiny" /> : displayContent}
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
      dispatch(updateSalesProjectionProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SalesEstimationStat);
