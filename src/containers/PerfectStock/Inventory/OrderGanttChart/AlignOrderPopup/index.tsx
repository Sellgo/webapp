import React from 'react';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import SelectionProductFilter from '../../../../../components/FormFilters/SelectionProductFilter';
import RadioRow from '../../../../../components/RadioRow';
import { ReactComponent as AlignOrderIcon } from '../../../../../assets/images/arrow-right-to-bracket-solid.svg';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Styles */
import styles from './index.module.scss';

/* Types */
import { AlignPurchaseOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  alignOrderDetails: any;
  handleAlignOrder: (payload: AlignPurchaseOrderPayload) => void;
  handleCancel: () => void;
}

const SetPrioritySkuPopup = (props: Props) => {
  const { alignOrderDetails, handleCancel, handleAlignOrder } = props;
  const [selectedTargetSku, setSelectedTargetSku] = React.useState<string>('');
  const [alignmentSetting, setAlignmentSetting] = React.useState<'moq' | 'perc' | 'days'>('moq');
  const [stockLevelThreshold, setStockLevelThreshold] = React.useState<number | null>();
  const [dusThreshold, setDusThreshold] = React.useState<number | null>();

  const handleSubmit = async () => {
    /* Validation Checks */
    const payload: AlignPurchaseOrderPayload = {
      id: alignOrderDetails.id,
      is_moq: alignmentSetting === 'moq',
      stockout_buffer_perc: alignmentSetting === 'perc' ? stockLevelThreshold : null,
      stockout_buffer_days: alignmentSetting === 'days' ? dusThreshold : null,
      priority_merchant_listing_id: parseInt(selectedTargetSku),
    };
    await handleAlignOrder(payload);
    handleCancel();
  };

  return (
    <>
      <BoxHeader>MANUAL ORDER ALIGNMENT: ORDER {alignOrderDetails.id}</BoxHeader>
      <BoxContainer className={styles.boxContainer}>
        <div className={styles.inputRow}>
          <label>Target SKU:</label>
          <SelectionProductFilter
            filterOptions={alignOrderDetails.selectedMerchantListings}
            placeholder={'Select Priority Sku'}
            value={selectedTargetSku}
            handleChange={(value: string) => setSelectedTargetSku(value)}
            isSingleSelect
            className={styles.selectionProductFilter}
          />
        </div>
        <RadioRow
          checked={alignmentSetting === 'moq'}
          handleChange={() => setAlignmentSetting('moq')}
        >
          Align to target SKU&apos;s MOQ
        </RadioRow>
        <RadioRow
          checked={alignmentSetting === 'perc'}
          handleChange={() => setAlignmentSetting('perc')}
        >
          Align to&nbsp;
          <InputFilter
            placeholder="0"
            isNumber
            isPositiveOnly
            value={stockLevelThreshold?.toString() || ''}
            handleChange={value => setStockLevelThreshold(parseFloat(value))}
            className={styles.inputFilter}
          />
          % of target SKU&apos;s stock level
        </RadioRow>
        <RadioRow
          checked={alignmentSetting === 'days'}
          handleChange={() => setAlignmentSetting('days')}
        >
          Align to&nbsp;
          <InputFilter
            placeholder="0"
            isNumber
            isPositiveOnly
            value={dusThreshold?.toString() || ''}
            handleChange={value => setDusThreshold(parseInt(value))}
            className={styles.inputFilter}
          />
          % of target SKU&apos;s days until stockout
        </RadioRow>

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
            <AlignOrderIcon />
            &nbsp; Align Order
          </ActionButton>
        </div>
      </BoxContainer>
    </>
  );
};

export default SetPrioritySkuPopup;
