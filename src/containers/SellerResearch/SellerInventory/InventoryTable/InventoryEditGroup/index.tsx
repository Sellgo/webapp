import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { updateSellerInventoryTableGroup } from '../../../../../actions/SellerResearch/SellerInventory';

/* Utils */
import { timeout } from '../../../../../utils/timeout';

/* Components */
import FormFilterActions from '../../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../../components/FormFilters/InputFilter';

/* Interfaces */
import { UpdateSellerGroup } from '../../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  currentGroupName: string;
  currentGroupId: number;

  updateSellerInventoryTableGroup: (payload: UpdateSellerGroup) => void;
  closeModal: () => void;
}

const InventoryEditGroup = (props: Props) => {
  const { updateSellerInventoryTableGroup, closeModal, currentGroupName, currentGroupId } = props;

  const [groupName, setGroupName] = useState<string>('');

  useEffect(() => {
    setGroupName(currentGroupName);
  }, []);

  const handleSubmit = async () => {
    updateSellerInventoryTableGroup({
      name: groupName,
      id: currentGroupId,
    });

    await timeout(500);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className={styles.editGroupForm}>
      <InputFilter
        label="Group Name"
        placeholder="Enter a group name"
        value={groupName}
        handleChange={value => setGroupName(value)}
        className={styles.longInput}
      />
      <FormFilterActions
        submitLabel="Edit"
        resetLabel="Cancel"
        onFind={handleSubmit}
        onReset={handleCancel}
        disabled={groupName.length <= 0}
        className={styles.formAction}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSellerInventoryTableGroup: (payload: UpdateSellerGroup) =>
      dispatch(updateSellerInventoryTableGroup(payload)),
  };
};

export default connect(null, mapDispatchToProps)(InventoryEditGroup);
