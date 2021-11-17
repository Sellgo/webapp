import React from 'react';
import { connect } from 'react-redux';
import ActionButton from '../../../../components/ActionButton';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
/* Actions */

/* Styling */
import styles from './index.module.scss';

/* Components */

/* Constants */

interface Props {
  handleAddTrigger: () => void;
}
const ZapierMeta = (props: Props) => {
  const { handleAddTrigger } = props;
  return (
    <>
      <ActionButton
        type="purpleGradient"
        variant="secondary"
        size="md"
        className={styles.addTriggerButton}
        onClick={handleAddTrigger}
      >
        <ThinAddIcon />
        <span>Add Product Trigger</span>
      </ActionButton>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  // getSeller: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ZapierMeta);
