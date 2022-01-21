import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, formatDecimal, showNAIfZeroOrNull } from '../../../utils/format';
import { getMarketplaceCurrency } from '../../../constants/Settings';
/* Types */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  appendWith?: string;
  prependWith?: string;
  align?: 'left' | 'right' | 'center';
  specialKpi?: boolean;
  asRounded?: boolean;
  asFloatRounded?: boolean;
  autoPrependCurrencySign?: boolean;
  className?: string;
}

const StatsCell = (props: Props) => {
  const {
    appendWith = '',
    prependWith = '',
    align = 'left',
    specialKpi = false,
    asRounded = true,
    asFloatRounded = false,
    autoPrependCurrencySign = false,
    className = '',
    ...otherProps
  } = props;

  const { rowData, dataKey } = otherProps;
  const currencySign = autoPrependCurrencySign
    ? getMarketplaceCurrency(rowData.marketplace_id)
    : '';

  let alignSettings;
  switch (align) {
    case 'right':
      alignSettings = 'flex-end';
      break;

    case 'left':
      alignSettings = 'flex-start';
      break;

    case 'center':
      alignSettings = 'center';
      break;
  }

  let displayStat;
  if (asRounded) {
    displayStat = formatNumber(rowData[dataKey]);
  } else if (asFloatRounded) {
    displayStat = formatDecimal(rowData[dataKey]);
  } else {
    displayStat = rowData[dataKey];
  }

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`${styles.statsCell} ${className}`}
        style={{
          alignSelf: alignSettings,
          color: specialKpi ? '#3B4557' : '#636d76',
          fontWeight: specialKpi ? 500 : 400,
          textAlign: align,
        }}
      >
        {showNAIfZeroOrNull(
          displayStat,
          `${currencySign}${prependWith}${displayStat}${appendWith}`
        )}
      </div>
    </Table.Cell>
  );
};

export default memo(StatsCell);
