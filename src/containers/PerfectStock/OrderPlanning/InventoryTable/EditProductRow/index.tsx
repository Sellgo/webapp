import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import StatBox from './StatBox';
import UnitsToOrder from './UnitsToOrder';

interface Props {
  rowData: any;
  orderId: number;
}

const EditProductRow = (props: Props) => {
  const { rowData, orderId } = props;
  return (
    <div className={styles.editProductRow}>
      <UnitsToOrder orderId={orderId} rowData={rowData} />
      <StatBox title={'Cartons'} stat={rowData.carton_count} />
      <StatBox title={'Cost Per Unit'} stat={rowData.product_cost} />
      <StatBox title={'Total Cost'} stat={rowData.total_cost} />
    </div>
  );
};

export default EditProductRow;
