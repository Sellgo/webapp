import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import AccountConnectionSection from './AccountConnectionSection';
import ExtensionSection from './ExtensionSection';
import FeaturesSection from './FeaturesSection';
import PilotLoginHeader from '../../components/PilotLoginHeader';
import AiStockOnboardingForm from '../../components/AiStockOnboardingForm';

/* Services */
import { getSellerSubscription } from '../../selectors/Subscription';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';

/* Actions */
import { updateSeller } from '../../actions/Settings/Subscription';

interface Props {
  subscription: SellerSubscription;
  updateSeller: (payload: any) => void;
}

const PilotLogin = (props: Props) => {
  const { subscription, updateSeller } = props;
  const [showOnboardingForm, setShowOnboardingForm] = React.useState(false);

  const handleSubmitOnboardingForm = () => {
    updateSeller({ is_aistock_on_boarding_survey_filled: true, doNotRefresh: true });
  };

  React.useEffect(() => {
    if (!subscription.is_aistock_on_boarding_survey_filled) {
      setShowOnboardingForm(true);
    }
  }, []);

  return (
    <>
      <main className={styles.pilotLoginPageWrapper}>
        <PilotLoginHeader />
        <AccountConnectionSection />
        <ExtensionSection />
        <FeaturesSection />

        <AiStockOnboardingForm
          isOpen={showOnboardingForm}
          setModalOpen={setShowOnboardingForm}
          onSubmit={handleSubmitOnboardingForm}
        />
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    subscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSeller: (payload: any) => {
      dispatch(updateSeller(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PilotLogin);
