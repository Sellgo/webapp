import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import AddEditSkuModal from '../AddEditSkuModal';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
import { refreshInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';
import {
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';

const OrderPlanningMeta = () => {
  const [isEditingSku, setIsEditingSku] = React.useState(false);

  return (
    <>
      <div className={styles.orderPlanningMeta}>
        <ActionButton
          variant="secondary"
          type="purpleGradient"
          size="md"
          className={styles.editSkuButton}
          onClick={() => setIsEditingSku(true)}
        >
          <ThinAddIcon />
          <span>Add/ Edit SKUs</span>
        </ActionButton>
        <div className={styles.saveButtons}>
          <ActionButton variant="primary" type="purpleGradient" size="md">
            <span>Finalize</span>
          </ActionButton>
        </div>
      </div>

      <AddEditSkuModal open={isEditingSku} onCloseModal={() => setIsEditingSku(false)} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  inventoryTableUpdateDate: getInventoryTableUpdateDate(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshInventoryTable: () => dispatch(refreshInventoryTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanningMeta);
