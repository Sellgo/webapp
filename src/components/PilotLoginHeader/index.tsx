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
import { fetchSellerSubscription } from '../../actions/Settings/Subscription';

interface Props {
  fetchSellerSubscription: () => void;
}

const PilotLoginHeader = (props: Props) => {
  const { fetchSellerSubscription } = props;

  const handleFinishSetup = () => {
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
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PilotLoginHeader);
