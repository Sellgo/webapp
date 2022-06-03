import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PaymentTermGroup from './PaymentTermGroup';
import Placeholder from '../../../../../components/Placeholder';
import PerfectStockSettingsNav from '../../../../../components/PerfectStockSettingsNav';
import SettingsBanner from '../../../../../components/SettingsBanner';
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';
import ActionButton from '../../../../../components/ActionButton';

/* Types */
import { PaymentTerm } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Constants */
import { AppConfig } from '../../../../../config';
import { error, success } from '../../../../../utils/notifications';
import { SETTINGS_OPTIONS } from '../../../../../constants/PerfectStock/OrderPlanning';

const PaymentTerms = () => {
  const [paymentTermGroups, setPaymentTermGroups] = React.useState<PaymentTerm[]>([]);
  React.useState<boolean>(true);
  const sellerID = localStorage.getItem('userId');
  const [paymentTermsLoading, setPaymentTermsLoading] = React.useState<boolean>(false);

  /* Fetches all the triggers from backend */
  const fetchPaymentTermGroups = async () => {
    setPaymentTermsLoading(true);
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/order-payment-terms`
      );

      if (data && data.length > 0) {
        const paymentTermGroupsWithIdentifier = data.map((paymentTermGroup: PaymentTerm) => {
          paymentTermGroup.indexIdentifier = uuid();
          return paymentTermGroup;
        });
        const activePaymentTermGroups = paymentTermGroupsWithIdentifier.filter(
          (paymentTermGroup: PaymentTerm) => paymentTermGroup.status === 'active'
        );
        setPaymentTermGroups(activePaymentTermGroups);
      }
    } catch (err) {
      console.error(err);
    }
    setPaymentTermsLoading(false);
  };

  /* Adds new trigger */
  const handleAddLeadTimeGroup = () => {
    try {
      const newPaymentTerm: PaymentTerm = {
        name: `Payment Term ${paymentTermGroups.length}`,
        status: 'active',
        indexIdentifier: uuid(),
      };
      setPaymentTermGroups([...paymentTermGroups, newPaymentTerm]);
    } catch (err) {
      console.error(err);
    }
  };

  /* Deletes trigger */
  const handleDeletePaymentTermGroup = async (deleteIndexIdentifier: string) => {
    setPaymentTermsLoading(true);
    const paymentTermGroupToDelete = paymentTermGroups.find(
      (paymentTerm: PaymentTerm) => paymentTerm.indexIdentifier === deleteIndexIdentifier
    );
    if (paymentTermGroupToDelete && paymentTermGroupToDelete.id) {
      paymentTermGroupToDelete.status = 'inactive';
      try {
        const { status } = await axios.patch(
          `${AppConfig.BASE_URL_API}sellers/${sellerID}/order-payment-terms`,
          {
            payment_terms: [paymentTermGroupToDelete],
          }
        );

        if (status === 200) {
          let newPaymentTerms = [...paymentTermGroups];
          newPaymentTerms = newPaymentTerms.filter(
            (paymentTerm: PaymentTerm) => paymentTerm.indexIdentifier !== deleteIndexIdentifier
          );
          success('Successfully deleted payment term');
          setPaymentTermGroups(newPaymentTerms);
        }
      } catch (err) {
        const { response } = err;
        if (response && response.status === 400) {
          error(response.data?.message);
        }
        console.error(err);
      }

      /* Lead time is not stored in backend yet */
    } else {
      let newPaymentTerms = [...paymentTermGroups];
      newPaymentTerms = newPaymentTerms.filter(
        (paymentTerm: PaymentTerm) => paymentTerm.indexIdentifier !== deleteIndexIdentifier
      );
      setPaymentTermGroups([...newPaymentTerms]);
    }
    setPaymentTermsLoading(false);
  };

  const setPaymentTerm = (newPaymentTerm: PaymentTerm) => {
    const newPaymentTerms = [...paymentTermGroups];
    const index = newPaymentTerms.findIndex(
      (paymentTerm: PaymentTerm) => paymentTerm.indexIdentifier === newPaymentTerm.indexIdentifier
    );
    if (index) {
      newPaymentTerms[index] = newPaymentTerm;
    }
    setPaymentTermGroups([...newPaymentTerms]);
  };

  React.useEffect(() => {
    fetchPaymentTermGroups();
  }, []);

  return (
    <main className={styles.paymentTermsPageWrapper}>
      <SettingsBanner
        title="Payment Terms"
        bannerColor="#FD8373"
        textColor="#fff"
        backUrl="/aistock/order"
      />
      <div className={styles.paymentTermsSettingsWrapper}>
        <PerfectStockSettingsNav settingsPages={SETTINGS_OPTIONS} />
        <div className={styles.paymentTerms}>
          {paymentTermsLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
          {!paymentTermsLoading &&
            paymentTermGroups.map((paymentTerm: PaymentTerm) => (
              <PaymentTermGroup
                key={paymentTerm.indexIdentifier}
                fetchPaymentTermGroups={fetchPaymentTermGroups}
                handleDeletePaymentTermGroup={handleDeletePaymentTermGroup}
                setInitialPaymentTermGroup={setPaymentTerm}
                initialPaymentTerm={paymentTerm}
              />
            ))}
          <ActionButton
            type="purpleGradient"
            variant="secondary"
            size="md"
            className={styles.addTriggerButton}
            onClick={handleAddLeadTimeGroup}
          >
            <ThinAddIcon />
            <span>Add Lead Time Group</span>
          </ActionButton>
        </div>
      </div>
    </main>
  );
};

export default PaymentTerms;
