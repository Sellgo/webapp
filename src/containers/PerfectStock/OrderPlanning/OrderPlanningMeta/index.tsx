import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import ToggleRadio from '../../../../components/ToggleRadio';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';

/* Actions */
import { refreshInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import { PurchaseOrder } from '../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  setIsEditingSKUs: (isEditingSKUs: boolean) => void;
  activePurchaseOrder: PurchaseOrder;
  isShowingDaysUntilStockout: boolean;
  setIsShowingDaysUntilStockout: (isShowingDaysUntilStockout: boolean) => void;
}

const OrderPlanningMeta = (props: Props) => {
  const {
    activePurchaseOrder,
    setIsEditingSKUs,
    isShowingDaysUntilStockout,
    setIsShowingDaysUntilStockout,
  } = props;

  let hasActivePurchaseOrder = false;
  if (activePurchaseOrder && activePurchaseOrder.id !== -1) {
    hasActivePurchaseOrder = true;
  }

  return (
    <>
      <div className={styles.orderPlanningMeta}>
        <ActionButton
          variant="secondary"
          type="purpleGradient"
          size="md"
          className={styles.editSkuButton}
          onClick={() => setIsEditingSKUs(true)}
          disabled={!hasActivePurchaseOrder}
        >
          <ThinAddIcon />
          <span>Add/ Edit SKUs</span>
        </ActionButton>

        <ToggleRadio
          isToggled={isShowingDaysUntilStockout}
          handleChange={() => setIsShowingDaysUntilStockout(!isShowingDaysUntilStockout)}
          label={
            isShowingDaysUntilStockout ? 'Hide Days Until Stockout' : 'Show Days Until Stockout'
          }
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  inventoryTableUpdateDate: getInventoryTableUpdateDate(state),
  activePurchaseOrder: getActivePurchaseOrder(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshInventoryTable: () => dispatch(refreshInventoryTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanningMeta);
