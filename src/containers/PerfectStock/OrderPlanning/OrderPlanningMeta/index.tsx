import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import AddEditSkuModal from '../AddEditSkuModal';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';

/* Actions */
import {
  fetchPurchaseOrders,
  refreshInventoryTable,
  updatePurchaseOrder,
} from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActiveDraftOrderTemplate,
  getActivePurchaseOrder,
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import {
  DraftOrderTemplate,
  PurchaseOrder,
  UpdatePurchaseOrderPayload,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  activeDraftOrderTemplate: DraftOrderTemplate;
  activePurchaseOrder: PurchaseOrder;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  fetchPurchaseOrders: (isDraft?: boolean) => void;
}

const OrderPlanningMeta = (props: Props) => {
  const {
    activeDraftOrderTemplate,
    activePurchaseOrder,
    updatePurchaseOrder,
    fetchPurchaseOrders,
  } = props;

  const [isEditingSku, setIsEditingSku] = React.useState(false);

  let hasActiveDraftOrderTemplate = false;
  if (activeDraftOrderTemplate && activeDraftOrderTemplate.id) {
    hasActiveDraftOrderTemplate = true;
  }

  let hasActivePurchaseOrder = false;
  if (activePurchaseOrder && activePurchaseOrder.id) {
    hasActivePurchaseOrder = true;
  }

  const handleFinalizeOrder = () => {
    updatePurchaseOrder({
      id: activePurchaseOrder.id,
      status: 'active',
    });
  };

  return (
    <>
      <div className={styles.orderPlanningMeta}>
        <ActionButton
          variant="secondary"
          type="purpleGradient"
          size="md"
          className={styles.editSkuButton}
          onClick={() => setIsEditingSku(true)}
          disabled={!hasActiveDraftOrderTemplate}
        >
          <ThinAddIcon />
          <span>Add/ Edit SKUs</span>
        </ActionButton>
        <div className={styles.saveButtons}>
          <ActionButton
            variant="primary"
            type="purpleGradient"
            size="md"
            disabled={!hasActivePurchaseOrder}
            onClick={handleFinalizeOrder}
          >
            <span>Finalize</span>
          </ActionButton>
        </div>
      </div>

      <AddEditSkuModal
        open={isEditingSku}
        onCloseModal={() => setIsEditingSku(false)}
        templateId={activeDraftOrderTemplate.id}
        refreshData={() => fetchPurchaseOrders(true)}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  inventoryTableUpdateDate: getInventoryTableUpdateDate(state),
  activeDraftOrderTemplate: getActiveDraftOrderTemplate(state),
  activePurchaseOrder: getActivePurchaseOrder(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshInventoryTable: () => dispatch(refreshInventoryTable()),
    updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) =>
      dispatch(updatePurchaseOrder(payload)),
    fetchPurchaseOrders: (isDraft?: boolean) => dispatch(fetchPurchaseOrders(isDraft)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanningMeta);
