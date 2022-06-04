import React from 'react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';

/* Interfaces */
import {
  CreateOrderPayload,
  PaymentTerm,
} from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import history from '../../../../../history';

interface Props {
  handlePrevious: () => void;
  handleNext: () => void;
  createOrderStep: number;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const PaymentTermSelection = (props: Props) => {
  const {
    handlePrevious,
    createOrderStep,
    handleNext,
    createOrderPayload,
    setCreateOrderPayload,
  } = props;
  const [paymentTermGroups, setPaymentTermGroups] = React.useState<PaymentTerm[]>([]);

  const fetchPaymentTermGroups = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/order-payment-terms`
      );

      if (data && data.length > 0) {
        setPaymentTermGroups(data);
        const defaultPaymentTerm = data.find((leadTime: PaymentTerm) => leadTime.is_default);
        if (defaultPaymentTerm && createOrderPayload.order_payment_term_id === -1) {
          setCreateOrderPayload({
            ...createOrderPayload,
            order_payment_term_id: defaultPaymentTerm.id,
            payment_term: defaultPaymentTerm,
          });
        } else if (createOrderPayload.order_payment_term_id === -1) {
          setCreateOrderPayload({
            ...createOrderPayload,
            order_payment_term_id: data[0].id,
            payment_term: data[0],
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPaymentTermGroups = paymentTermGroups.filter(
    (paymentTerm: PaymentTerm) => paymentTerm.status === 'active'
  );

  const paymentTermOptions = filteredPaymentTermGroups.map(paymentTerm => ({
    key: paymentTerm.id?.toString() || '',
    value: paymentTerm.id?.toString() || '',
    text: paymentTerm.name,
  }));

  paymentTermOptions.push({
    key: 'Create new payment term',
    value: 'Create new payment term',
    text: 'Create new payment term',
  });

  /* Disable user from proceeding when any of the fields are empty */
  const isHandleNextDisabled =
    createOrderPayload.start_date === '' || createOrderPayload.order_payment_term_id === -1;

  React.useEffect(() => {
    fetchPaymentTermGroups();
  }, []);

  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);

  const onOrderCreate = () => {
    setIsCreatingOrder(true);
    handleNext();
  };

  const handleSelectPaymentTerm = async (paymentTermId: string) => {
    if (paymentTermId === 'Create new payment term') {
      await localStorage.setItem('createOrderStep', createOrderStep.toString());
      await localStorage.setItem('createOrderPayload', JSON.stringify(createOrderPayload));
      history.push('/settings/aistock/payment-term-settings');
      return;
    }
    const paymentTermGroup = paymentTermGroups.find(
      paymentTerm => paymentTerm.id?.toString() === paymentTermId
    );

    setCreateOrderPayload({
      ...createOrderPayload,
      order_payment_term_id: parseInt(paymentTermId),
      payment_term: paymentTermGroup,
    });
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Please Select Payment Term</h2>
        <SelectionFilter
          filterOptions={paymentTermOptions}
          value={createOrderPayload.order_payment_term_id.toString()}
          handleChange={handleSelectPaymentTerm}
          placeholder=""
          label=""
          className={styles.inputField}
        />
        {/* {createOrderPayload.order_payment_term_id !== -1 && (
          <LeadTimeBar
            className={styles.leadTimeBar}
            leadTimes={createOrderPayload.payment_term?.lead_times || []}
            showDurationOnTop
          />
        )} */}
      </div>

      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.cancelButton}
          onClick={handlePrevious}
          variant="reset"
          size="md"
        >
          Back
        </ActionButton>
        <ActionButton
          className={styles.createButton}
          onClick={onOrderCreate}
          variant="secondary"
          type="purpleGradient"
          size="md"
          disabled={isHandleNextDisabled}
          loading={isCreatingOrder}
        >
          Continue
        </ActionButton>
      </div>
    </div>
  );
};

export default PaymentTermSelection;
