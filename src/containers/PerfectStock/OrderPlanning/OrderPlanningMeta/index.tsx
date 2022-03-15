import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import TooltipWrapper from '../../../../components/TooltipWrapper';
import InputTabSelection from '../../../../components/InputTabSelection';

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
  tableViewMode: 'Inventory' | 'Stockout' | 'Today';
  setTableViewMode: (tableViewMode: 'Inventory' | 'Stockout' | 'Today') => void;
}

const OrderPlanningMeta = (props: Props) => {
  const { activePurchaseOrder, setIsEditingSKUs, tableViewMode, setTableViewMode } = props;

  let hasActivePurchaseOrder = false;
  if (activePurchaseOrder && activePurchaseOrder.id !== -1) {
    hasActivePurchaseOrder = true;
  }

  return (
    <>
      <div className={styles.orderPlanningMeta}>
        <TooltipWrapper tooltipKey="Add/Edit Sku">
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
        </TooltipWrapper>
        <TooltipWrapper tooltipKey="Toggle Show Days Until Stockout">
          <InputTabSelection
            options={['Inventory', 'Stockout', 'Today']}
            selectedOption={tableViewMode}
            setSelectedOption={setTableViewMode}
            isPurple
            borderless
          />
        </TooltipWrapper>
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
