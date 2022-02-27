import React from 'react';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import SelectionProductFilter from '../../../../../components/FormFilters/SelectionProductFilter';

/* Styles */
import styles from './index.module.scss';

/* Constants */
import ActionButton from '../../../../../components/ActionButton';
import { UpdatePurchaseOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

type ProductOption = {
  id: string;
  productName: string;
  asin: string;
  img: string;
  skuName?: string;
  activePurchaseOrders?: number;
  fulfillmentChannel?: string;
  skuStatus?: string;
};

interface Props {
  prioritySkuDetails: any;
  fetchPurchaseOrders: () => void;
  handleUpdatePrioritySku: (payload: UpdatePurchaseOrderPayload) => void;
  handleCancel: () => void;
}

const SetPrioritySkuPopup = (props: Props) => {
  const { prioritySkuDetails, handleCancel, handleUpdatePrioritySku, fetchPurchaseOrders } = props;
  const [selectedPrioritySku, setSelectedPrioritySku] = React.useState<string>('');

  const handleSubmit = async () => {
    /* Validation Checks */
    await handleUpdatePrioritySku({
      id: prioritySkuDetails.id,
      po_sku_id: parseInt(selectedPrioritySku),
      is_priority: true,
    });
    fetchPurchaseOrders();
    handleCancel();
  };

  return (
    <>
      <BoxHeader>SET PRIORITY SKU</BoxHeader>
      <BoxContainer className={styles.boxContainer}>
        <div className={styles.inputRow}>
          <label>Priority SKU:</label>
          <SelectionProductFilter
            filterOptions={prioritySkuDetails.selectedMerchantListings}
            placeholder={'Select Priority Sku'}
            value={selectedPrioritySku}
            handleChange={(value: string) => setSelectedPrioritySku(value)}
            isSingleSelect
            className={styles.selectionProductFilter}
          />
        </div>
        <div className={styles.buttonsRow}>
          <ActionButton variant={'reset'} size={'md'} onClick={handleCancel}>
            Cancel
          </ActionButton>
          <ActionButton
            type="purpleGradient"
            variant={'secondary'}
            size={'md'}
            onClick={handleSubmit}
          >
            Save
          </ActionButton>
        </div>
      </BoxContainer>
    </>
  );
};

export default SetPrioritySkuPopup;
