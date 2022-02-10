import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

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
}

const SalesEstimationStat = (props: Props) => {
  const { daysOffset, updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;
  const [onHovered, setOnHovered] = React.useState<boolean>(false);

  /* Formatting key stats */
  const stat = showNAIfZeroOrNull(rowData[dataKey], formatRating(rowData[dataKey]));
  const included = rowData[`${dataKey}_included`];
  const weight = formatDecimal(rowData[`${dataKey}_weight`]);
  const label = rowData[`${dataKey}_label`];

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
        onMouseEnter={() => setOnHovered(true)}
        onMouseLeave={() => setOnHovered(false)}
        onClick={handleIncludeExcludeStat}
      >
        {!onHovered ? (
          <>
            <div className={styles.mainStat}>{stat}</div>
            <div className={styles.weight}>{weight}%</div>
          </>
        ) : (
          <HoveredCell daysOffset={daysOffset} disabled={!included} />
        )}
      </div>
    );
  }

  return <Table.Cell {...otherProps}>{displayContent}</Table.Cell>;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
      dispatch(updateSalesProjectionProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SalesEstimationStat);
