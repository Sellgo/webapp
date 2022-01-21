import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import CreateOrderModal from '../CreateOrderModal';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
import { refreshInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';
import {
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';

const OrderPlanningMeta = () => {
  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);
  return (
    <>
      <div className={styles.orderPlanningMeta}>
        <ActionButton
          variant="secondary"
          type="purpleGradient"
          size="md"
          className={styles.editSkuButton}
          onClick={() => setIsCreatingOrder(true)}
        >
          <ThinAddIcon />
          <span>Add/ Edit SKUs</span>
        </ActionButton>
        <div className={styles.saveButtons}>
          <ActionButton variant="secondary" type="purpleGradient" size="md">
            <span>Save Draft</span>
          </ActionButton>
          <ActionButton variant="primary" type="purpleGradient" size="md">
            <span>Finalize</span>
          </ActionButton>
        </div>
      </div>
      <CreateOrderModal open={isCreatingOrder} onCloseModal={() => setIsCreatingOrder(false)} />
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
