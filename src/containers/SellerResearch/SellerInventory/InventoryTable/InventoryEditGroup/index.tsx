import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createSellerInventoryTableGroup } from '../../../../../actions/SellerResearch/SellerInventory';
import FormFilterActions from '../../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import { CreateSellerGroup } from '../../../../../interfaces/SellerResearch/SellerInventory';
import { timeout } from '../../../../../utils/timeout';

/* Styling */
import styles from './index.module.scss';

interface Props {
  closeModal: () => void;
  currentGroupName: string;
  currentGroupId: number;
}

const InventoryEditGroup = (props: Props) => {
  const { closeModal, currentGroupName, currentGroupId } = props;

  const [groupName, setGroupName] = useState<string>('');

  useEffect(() => {
    setGroupName(currentGroupName);
  }, []);

  const handleSubmit = async () => {
    console.log({
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
    createSellerInventoryTableGroup: (payload: CreateSellerGroup) =>
      dispatch(createSellerInventoryTableGroup(payload)),
  };
};

export default connect(null, mapDispatchToProps)(InventoryEditGroup);
