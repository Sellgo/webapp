import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PaymentTermsGroup from '../PaymentTermsGroup';
import Placeholder from '../../../../../components/Placeholder';
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';
import ActionButton from '../../../../../components/ActionButton';

/* Types */
import { PaymentTerm } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Constants */
import { AppConfig } from '../../../../../config';
import { error, success } from '../../../../../utils/notifications';
import { getCashflowOnboardingStatus } from '../../../../../selectors/PerfectStock/Cashflow';
import {
  fetchCashflowOnboardingStatus,
  updateCashflowOnboardingStatus,
} from '../../../../../actions/PerfectStock/Home';

interface Props {
  cashflowOnboardingStatus: any[];
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
}

const PaymentTermsCore: React.FC<Props> = props => {
  const { cashflowOnboardingStatus, updateCashflowOnboardingStatus } = props;
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
  const handleAddPaymentTermGroup = () => {
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

      /* Payment term is not stored in backend yet */
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
    fetchCashflowOnboardingStatus();
  }, []);

  return (
    <div className={styles.paymentTermsSettingsWrapper}>
      <div className={styles.paymentTerms}>
        {paymentTermsLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
        {!paymentTermsLoading &&
          paymentTermGroups.map((paymentTerm: PaymentTerm) => (
            <PaymentTermsGroup
              cashflowOnboardingStatus={cashflowOnboardingStatus?.find(
                cost => cost?.step_name === 'payment_terms'
              )}
              updateCashflowOnboardingStatus={updateCashflowOnboardingStatus}
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
          onClick={handleAddPaymentTermGroup}
        >
          <ThinAddIcon />
          <span>Add payment term</span>
        </ActionButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cashflowOnboardingStatus: getCashflowOnboardingStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) =>
      dispatch(updateCashflowOnboardingStatus(onboardingCostId, newStatus)),
    fetchCashflowOnboardingStatus: () => dispatch(fetchCashflowOnboardingStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTermsCore);
