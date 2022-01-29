import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import CreateOrderModal from '../CreateOrderModal';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
import { ReactComponent as ArrowDown } from '../../../../assets/images/view-detail-down-arrow.svg';
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';
import { Loader } from 'semantic-ui-react';
import { refreshInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';
import {
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';

interface Props {
  refreshInventoryTable: () => void;
  isFetchingProgressForRefresh: boolean;
  inventoryTableUpdateDate: string;
}

const OrderPlanningMeta = (props: Props) => {
  const { refreshInventoryTable, isFetchingProgressForRefresh, inventoryTableUpdateDate } = props;

  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);
  const displayDate = inventoryTableUpdateDate
    ? new Date(inventoryTableUpdateDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';
  return (
    <>
      <div className={styles.exportsContainer}>
        <ActionButton
          variant="primary"
          type="purpleGradient"
          size="md"
          className={styles.createOrderButton}
          onClick={() => setIsCreatingOrder(true)}
        >
          <ThinAddIcon />
          <span>Create</span>
          <ArrowDown />
        </ActionButton>

        {true && (
          <button
            className={styles.refreshButton}
            onClick={refreshInventoryTable}
            disabled={isFetchingProgressForRefresh}
          >
            Last Update:&nbsp;<span>{displayDate}</span>
            &nbsp;
            {!isFetchingProgressForRefresh ? (
              <UndoIcon className={styles.refreshIcon} />
            ) : (
              <Loader active inline size="tiny" />
            )}
          </button>
        )}
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
