import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import amazonChoiceLabel from '../../../../../assets/amazonLabels/amazonChoiceLabel.png';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const AmazonChoiceLabel = (props: RowCell) => {
  const { rowData } = props;

  const { amazon_choice_asins } = rowData;

  return (
    <Table.Cell {...props}>
      <div className={styles.amazonChoiceLabel}>
        {amazon_choice_asins > 0 ? <img src={amazonChoiceLabel} alt="Amazon Choice Label" /> : null}
      </div>
    </Table.Cell>
  );
};

export default AmazonChoiceLabel;
