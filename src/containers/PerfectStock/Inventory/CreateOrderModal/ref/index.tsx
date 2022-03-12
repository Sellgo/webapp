import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import SelectionProductFilter from '../../../../../components/FormFilters/SelectionProductFilter';
import InputTabSelection from '../../../../../components/InputTabSelection';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import { ReactComponent as ClipboardIcon } from '../../../../../assets/images/clipboard-list-check-solid.svg';

/* Styles */
import styles from './index.module.scss';

/* Utils */
import { error } from '../../../../../utils/notifications';

/* Constants */
import ActionButton from '../../../../../components/ActionButton';
import { AutoGeneratePurchaseOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

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
  generateNextOrderDetails: {
    id: number;
    merchantListings: ProductOption[];
    defaultPrioritySku?: string;
  };
  generateNextOrder: (payload: AutoGeneratePurchaseOrderPayload) => void;
  handleCancel: () => void;
}

const AutoGenerateOrderPopup = (props: Props) => {
  const { generateNextOrderDetails, handleCancel, generateNextOrder } = props;

  /* Setting default priority sku to either be selected one, or first sku in the list */
  let defaultSelectedPrioritySku = generateNextOrderDetails.merchantListings?.find(
    merchantListing => merchantListing.skuName === generateNextOrderDetails.defaultPrioritySku
  );

  if (!defaultSelectedPrioritySku) {
    if (
      generateNextOrderDetails.merchantListings &&
      generateNextOrderDetails.merchantListings.length > 0
    ) {
      defaultSelectedPrioritySku = generateNextOrderDetails.merchantListings[0];
    }
  }

  const [selectedPrioritySku, setSelectedPrioritySku] = React.useState<string>(
    defaultSelectedPrioritySku?.id || ''
  );
  const [nextOrderPeriod, setNextOrderPeriod] = React.useState<string>('Next Order');
  const [nextOrderCondition, setNextOrderCondition] = React.useState<string>('Stock Level');
  const [stockLevelThreshold, setStockLevelThreshold] = React.useState<number>();
  const [dusThreshold, setDusThreshold] = React.useState<number>();

  const handleSubmit = () => {
    /* Validation Checks */
    if (nextOrderCondition === 'Stock Level' && !stockLevelThreshold) {
      error('Please enter a stock level alignment value');
      return;
    } else if (nextOrderCondition === 'DUS' && !dusThreshold) {
      error('Please enter a Days Until Stockout alignment value');
      return;
    }

    let nextNDays;
    if (nextOrderPeriod === 'Next Order') {
      nextNDays = null;
    } else if (nextOrderPeriod === '12 Months') {
      nextNDays = 365;
    } else if (nextOrderPeriod === '24 Months') {
      nextNDays = 730;
    } else {
      nextNDays = 0;
    }

    const payload: AutoGeneratePurchaseOrderPayload = {
      id: generateNextOrderDetails.id,
      merchant_listing_id: selectedPrioritySku.length > 0 ? parseInt(selectedPrioritySku) : null,
      next_n_days: nextNDays,
    };

    if (nextOrderCondition === 'Stock Level') {
      payload.stockout_buffer_perc = stockLevelThreshold;
    } else if (nextOrderCondition === 'DUS') {
      payload.stockout_buffer_days = dusThreshold;
    }

    generateNextOrder(payload);
    handleCancel();
  };

  return (
    <>
      <BoxHeader>GENERATE SMART ORDER</BoxHeader>
      <BoxContainer className={styles.boxContainer}>
        <div className={styles.inputRow}>
          <label>Priority SKU:</label>
          <SelectionProductFilter
            filterOptions={generateNextOrderDetails.merchantListings}
            placeholder={'Select Priority SKU'}
            value={selectedPrioritySku}
            handleChange={(value: string) => setSelectedPrioritySku(value)}
            isSingleSelect
            className={styles.selectionProductFilter}
          />
        </div>
        <div className={styles.inputRow}>
          <label>Generate Order:</label>
          <InputTabSelection
            options={['Next Order', '12 Months', '24 Months']}
            selectedOption={nextOrderPeriod}
            setSelectedOption={setNextOrderPeriod}
          />
        </div>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${nextOrderCondition === 'Stock Level' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setNextOrderCondition('Stock Level')}
        >
          <Checkbox radio checked={nextOrderCondition === 'Stock Level'} />
          &nbsp; Align to &nbsp;
          <InputFilter
            placeholder="0"
            isNumber
            isPositiveOnly
            value={stockLevelThreshold?.toString() || ''}
            handleChange={value => setStockLevelThreshold(parseFloat(value))}
            className={styles.inputFilter}
          />
          &nbsp;% of priority SKU's stock level
        </div>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${nextOrderCondition === 'DUS' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setNextOrderCondition('DUS')}
        >
          <Checkbox radio checked={nextOrderCondition === 'DUS'} />
          &nbsp; Align to &nbsp;
          <InputFilter
            placeholder="0"
            isNumber
            isPositiveOnly
            value={dusThreshold?.toString() || ''}
            handleChange={value => setDusThreshold(parseInt(value))}
            className={styles.inputFilter}
          />
          &nbsp; of priority SKU's days until stockout
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
            <ClipboardIcon />
            &nbsp; Generate
          </ActionButton>
        </div>
      </BoxContainer>
    </>
  );
};

export default AutoGenerateOrderPopup;
