import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  deleteSellerInventoryTableGroup,
  updateSellerInventoryTableGroup,
} from '../../../../../actions/SellerResearch/SellerInventory';

/* Selectors */
import { getSellerInventoryTableResults } from '../../../../../selectors/SellerResearch/SellerInventory';

/* Utils */
import { timeout } from '../../../../../utils/timeout';

/* Components */
import FormFilterActions from '../../../../../components/FormFilters/FormFilterActions';

/* Interfaces */
import {
  DeleteSellergroup,
  UpdateSellerGroup,
} from '../../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  currentGroupId: number;
  currentGroupName: string;
  sellerInventoryTableResults: any[];

  deleteSellerInventoryTableGroup: (payload: DeleteSellergroup) => void;
  updateSellerInventoryTableGroup: (payload: UpdateSellerGroup) => void;
  closeModal: () => void;
}

const InventoryDeleteGroup = (props: Props) => {
  const {
    currentGroupId,
    currentGroupName,
    sellerInventoryTableResults,
    deleteSellerInventoryTableGroup,
    updateSellerInventoryTableGroup,
    closeModal,
  } = props;

  /* Keep tracking means just update the group status to inactive */
  const handleKeepTracking = async () => {
    updateSellerInventoryTableGroup({
      id: currentGroupId,
      status: 'inactive',
    });
    await timeout(500);
    closeModal();
  };

  /* Untrack means delete group  */
  const handleUntrack = async () => {
    deleteSellerInventoryTableGroup({ id: currentGroupId, refreshTable: true });
    await timeout(500);
    closeModal();
  };

  /* Run Delete logic on mount */
  useEffect(() => {
    const filterSellersInGroup =
      sellerInventoryTableResults &&
      sellerInventoryTableResults.filter((s: any) => {
        return s.merchant_group === currentGroupId;
      });

    const isGroupEmpty = filterSellersInGroup.length === 0;

    // if empty just delet the group and close modal
    if (isGroupEmpty) {
      deleteSellerInventoryTableGroup({ id: currentGroupId });
      closeModal();
    }
    // else let user decide the delete options
  }, []);

  return (
    <div className={styles.deleteGroupForm}>
      <div className={styles.deleteMessage}>
        <h2>
          <Icon name="trash" />
          Deleting group - {currentGroupName}
        </h2>

        <p>Do you want to keep the items in the group tracked?</p>
      </div>

      <FormFilterActions
        submitLabel="Keep Tracking"
        resetLabel="Untrack"
        onFind={handleKeepTracking}
        onReset={handleUntrack}
        className={styles.formAction}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerInventoryTableResults: getSellerInventoryTableResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteSellerInventoryTableGroup: (payload: DeleteSellergroup) =>
      dispatch(deleteSellerInventoryTableGroup(payload)),
    updateSellerInventoryTableGroup: (payload: UpdateSellerGroup) =>
      dispatch(updateSellerInventoryTableGroup(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDeleteGroup);
