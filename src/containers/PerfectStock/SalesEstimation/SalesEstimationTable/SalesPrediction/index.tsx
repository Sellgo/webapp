import React from 'react';
import { Table } from 'rsuite';
import { Radio, Input } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const SalesPrediction = (props: RowCell) => {
  const [usingPredictiveSales, setUsingPredictiveSales] = React.useState(true);
  const { rowData, dataKey } = props;

  return (
    <Table.Cell {...props}>
      <div
        className={`
          ${styles.salesPrediction}`}
      >
        <div className={styles.predictiveSales}>
          <Radio
            label="Predictive"
            className={styles.radioSelection}
            checked={usingPredictiveSales}
            onChange={() => setUsingPredictiveSales(!usingPredictiveSales)}
          />
          {rowData[dataKey]}
        </div>

        <div className={styles.manualSales}>
          <Radio
            label="Manual"
            className={styles.radioSelection}
            checked={!usingPredictiveSales}
            onChange={() => setUsingPredictiveSales(!usingPredictiveSales)}
          />

          <Input value="32" className={styles.textInput} disabled={usingPredictiveSales} />
        </div>
      </div>
    </Table.Cell>
  );
};

export default SalesPrediction;
