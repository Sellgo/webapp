import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import AccountConnectionSection from './AccountConnectionSection';
import ExtensionSection from './ExtensionSection';
import FeaturesSection from './FeaturesSection';
import PilotLoginHeader from '../../components/PilotLoginHeader';
import AiStockOnboardingForm from '../../components/AiStockOnboardingForm';
import { connect } from 'react-redux';
import { getSellerSubscription } from '../../selectors/Subscription';
import { SellerSubscription } from '../../interfaces/Seller';
import { updateSeller } from '../../actions/Settings/Subscription';

interface Props {
  subscription: SellerSubscription;
  updateSeller: (payload: any) => void;
}

const PilotLogin = (props: Props) => {
  const { subscription, updateSeller } = props;
  const [showOnboardingForm, setShowOnboardingForm] = React.useState(false);

  const handleSubmitOnboardingForm = () => {
    updateSeller({ is_aistock_on_boarding_survey_filled: true });
  };

  React.useEffect(() => {
    if (!subscription.is_aistock_on_boarding_survey_filled) {
      setShowOnboardingForm(true);
    }
  }, [subscription.is_aistock_on_boarding_survey_filled]);

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
