import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../ActionButton';
import history from '../../history';

/* Assets */
import SellgoLogo from '../../assets/images/aistockLogo.png';

/* Actions */
import { fetchSellerSubscription, updateSeller } from '../../actions/Settings/Subscription';

interface Props {
  fetchSellerSubscription: () => void;
  updateSeller: (seller: any) => void;
}

const PilotLoginHeader = (props: Props) => {
  const { fetchSellerSubscription, updateSeller } = props;

  const handleFinishSetup = async () => {
    await updateSeller({
      is_first_time_logged_in: false,
    });
    fetchSellerSubscription();
    history.push('/');
  };

  return (
    <div className={styles.topBar}>
      <img src={SellgoLogo} alt="sellgo-logo" className={styles.sellgoLogo} />
      <ActionButton type="purpleGradient" variant="primary" size="md" onClick={handleFinishSetup}>
        Setup Later
      </ActionButton>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSeller: (seller: any) => dispatch(updateSeller(seller)),
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PilotLoginHeader);
