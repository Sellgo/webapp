import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSellerInventoryTableGroup } from '../../../../../actions/SellerResearch/SellerInventory';
import FormFilterActions from '../../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import { CreateSellerGroup } from '../../../../../interfaces/SellerResearch/SellerInventory';
import { timeout } from '../../../../../utils/timeout';

/* Styling */
import styles from './index.module.scss';

interface Props {
  createSellerInventoryTableGroup: (payload: CreateSellerGroup) => void;
  closeModal: () => void;
}

const CreateGroup = (props: Props) => {
  const { closeModal, createSellerInventoryTableGroup } = props;

  const [groupName, setGroupName] = useState<string>('');

  const handleSubmit = async () => {
    createSellerInventoryTableGroup({ name: groupName });
    await timeout(500);
    closeModal();
  };

  const handleCancel = () => {
    setGroupName('');
    closeModal();
  };

  return (
    <div className={styles.createGroupForm}>
      <InputFilter
        label="Group Name"
        placeholder="Enter a group name"
        value={groupName}
        handleChange={value => setGroupName(value)}
        className={styles.longInput}
      />
      <FormFilterActions
        submitLabel="Create"
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

export default connect(null, mapDispatchToProps)(CreateGroup);
