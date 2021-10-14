import React from 'react';
import { Table } from 'rsuite';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

/* Styles */
import styles from './index.module.scss';

/* Icon */
import CreditCardIcon from '../../../../../assets/images/credit-card-solid.svg';

/* Utils */
import { capitalizeFirstLetter } from '../../../../../utils/format';

const PaymentMethodCell = (props: RowCell) => {
  const { rowData } = props;
  return (
    <Table.Cell {...props}>
      <div className={styles.paymentMethodCell}>
        <img src={CreditCardIcon} alt="credit-card" />
        <p>{capitalizeFirstLetter(rowData.card_type)}</p>
        <p>**** **** **** {rowData.card_number}</p>
      </div>
    </Table.Cell>
  );
};

export default PaymentMethodCell;
