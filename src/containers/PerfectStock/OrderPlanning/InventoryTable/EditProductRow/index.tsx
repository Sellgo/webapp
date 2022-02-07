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
      <StatBox title={'MOQ'} stat={rowData.moq} />
      <StatBox title={'Cartons'} stat={rowData.carton_count} />
      <StatBox title={'CBM'} stat={rowData.cbm} append="m3" />
      <StatBox title={'CFT'} stat={rowData.cft} append="ft3" />
      <StatBox title={'Weight (KG)'} stat={rowData.weigth_kg} append="kg" asFloat />
      <StatBox title={'Weight (LBs)'} stat={rowData.weigth_lbs} append="lbs" asFloat />
      <StatBox title={'Est. Shipping/ Unit'} stat={rowData.shipping_cost} prepend="$" asFloat />
      <StatBox title={'Cost Per Unit'} stat={rowData.product_cost} prepend="$" asFloat />
      <StatBox
        title={'Cost + Shipping Per Unit'}
        stat={
          (rowData.product_cost ? parseFloat(rowData.product_cost) : 0) +
          (rowData.shipping_cost ? parseFloat(rowData.shipping_cost) : 0)
        }
        asFloat
        prepend="$"
      />
      <StatBox title={'Total Cost'} stat={rowData.total_cost} prepend="$" asFloat />
    </div>
  );
};

export default EditProductRow;
