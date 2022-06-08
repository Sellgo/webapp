import React from 'react';
import axios from 'axios';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import ActionButton from '../../../../../components/ActionButton';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';

/* Styles */
import styles from './index.module.scss';

/* Types */
import {
  PaymentTerm,
  UpdatePurchaseOrderPayload,
} from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { AppConfig } from '../../../../../config';

interface Props {
  prioritySkuDetails: any;
  handleUpdatePaymentTermSku: (payload: UpdatePurchaseOrderPayload) => void;
  handleCancel: () => void;
  refreshPurchaseOrders: () => void;
}

const SetPaymentTermPopup = (props: Props) => {
  const {
    prioritySkuDetails,
    handleCancel,
    handleUpdatePaymentTermSku,
    refreshPurchaseOrders,
  } = props;
  const [selectedPaymentTermId, setSelectedPaymentTermId] = React.useState<string>(
    prioritySkuDetails.order_payment_term_id?.toString() || '-1'
  );
  const [paymentTermGroups, setPaymentTermGroups] = React.useState<PaymentTerm[]>([]);

  const fetchPaymentTermGroups = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/order-payment-terms`
      );

      if (data && data.length > 0) {
        setPaymentTermGroups(data);
        const defaultPaymentTerm = data.find((leadTime: PaymentTerm) => leadTime.is_default);
        if (defaultPaymentTerm) {
          setSelectedPaymentTermId(defaultPaymentTerm.id.toString());
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchPaymentTermGroups();
  }, []);

  React.useEffect(() => {
    setSelectedPaymentTermId(prioritySkuDetails.order_payment_term_id?.toString());
  }, [prioritySkuDetails.order_payment_term_id, paymentTermGroups]);

  const filteredPaymentTerms = paymentTermGroups.filter(
    paymentTerm => paymentTerm.status === 'active'
  );
  const paymentTermOptions = filteredPaymentTerms.map(paymentTerm => ({
    key: paymentTerm.id?.toString() || '',
    value: paymentTerm.id?.toString() || '',
    text: paymentTerm.name,
  }));

  paymentTermOptions.push({
    key: 'None',
    value: '-1',
    text: 'None',
  });

  const handleSubmit = async () => {
    const payloadPaymentTermId = parseInt(selectedPaymentTermId);
    /* Validation Checks */
    await handleUpdatePaymentTermSku({
      id: prioritySkuDetails.id,
      order_payment_term_id: payloadPaymentTermId === -1 ? null : payloadPaymentTermId,
    });
    refreshPurchaseOrders();
    handleCancel();
  };

  return (
    <>
      <BoxHeader>SET PAYMENT TERM</BoxHeader>
      <BoxContainer className={styles.boxContainer}>
        <div className={styles.inputRow}>
          <label>Payment Term:</label>
          <SelectionFilter
            filterOptions={paymentTermOptions}
            value={selectedPaymentTermId}
            handleChange={(value: string) => setSelectedPaymentTermId(value)}
            placeholder=""
            label=""
            className={styles.inputField}
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

export default SetPaymentTermPopup;
