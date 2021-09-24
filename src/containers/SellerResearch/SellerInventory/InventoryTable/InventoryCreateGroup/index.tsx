import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { createSellerInventoryTableGroup } from '../../../../../actions/SellerResearch/SellerInventory';

/* Utils */
import { timeout } from '../../../../../utils/timeout';

/* Components */
import FormFilterActions from '../../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../../components/FormFilters/InputFilter';

/* Interfaces */
import { CreateSellerGroup } from '../../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  createSellerInventoryTableGroup: (payload: CreateSellerGroup) => void;
  closeModal: () => void;
}

const InventoryCreateGorup = (props: Props) => {
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

export default connect(null, mapDispatchToProps)(InventoryCreateGorup);
