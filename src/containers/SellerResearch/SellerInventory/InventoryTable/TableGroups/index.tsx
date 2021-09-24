import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  fetchSellerInventoryTableGroups,
  setSellerInventoryTableActiveGroupId,
} from '../../../../../actions/SellerResearch/SellerInventory';

/* Selectors */
import {
  getSellerInventoryTableActiveGroupId,
  getSellerInventoryTableGroups,
} from '../../../../../selectors/SellerResearch/SellerInventory';

/* Constants */
import {
  DEFAULT_ALLGROUPS_ID,
  DEFAULT_UNGROUPED_ID,
} from '../../../../../constants/SellerResearch/SellerInventory';

/* Containers */
import CreateGroup from '../CreateGroup';

/* Interfaces */
import {
  SellerInventoryTableGroup,
  SellerInventoryTableActiveGroupId,
} from '../../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  sellerInventoryTableGroups: SellerInventoryTableGroup[];
  sellerInventoryTableActiveGroupId: SellerInventoryTableActiveGroupId;

  setSellerInventoryTableActiveGroupId: (payload: SellerInventoryTableActiveGroupId) => void;
  fetchSellerInventoryTableGroups: () => void;
}

const TableGroups = (props: Props) => {
  const {
    sellerInventoryTableGroups,
    sellerInventoryTableActiveGroupId,
    setSellerInventoryTableActiveGroupId,
    fetchSellerInventoryTableGroups,
  } = props;

  /* State for creating a group modal */
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  /* Is all groups active */
  const allGroupsClassName = `${styles.groupListTab} ${
    sellerInventoryTableActiveGroupId === DEFAULT_ALLGROUPS_ID ? styles.activeTab : ''
  }`;

  /* Is ungrouped active */
  const unGroupedClassName = `${styles.groupListTab} ${
    sellerInventoryTableActiveGroupId === DEFAULT_UNGROUPED_ID ? styles.activeTab : ''
  }`;

  /* Fetch all groups on mount */
  useEffect(() => {
    fetchSellerInventoryTableGroups();
  }, []);

  /* Change the active group id */
  const handleActiveGroupChange = (id: SellerInventoryTableActiveGroupId) => {
    setSellerInventoryTableActiveGroupId(id);
  };

  return (
    <>
      <div className={styles.tableGroupsWrapper}>
        {/* Seller groups */}
        <ul className={styles.groupList}>
          {/* All groups */}
          <li
            className={allGroupsClassName}
            onClick={() => handleActiveGroupChange(DEFAULT_ALLGROUPS_ID)}
          >
            All Groups
          </li>

          {/* Un grouped */}
          <li
            className={unGroupedClassName}
            onClick={() => handleActiveGroupChange(DEFAULT_UNGROUPED_ID)}
          >
            Ungrouped
          </li>

          {/* Custom groups created from users */}
          <div className={styles.preventOverflow}>
            {sellerInventoryTableGroups &&
              sellerInventoryTableGroups.map(g => {
                const groupdActive = g.id === sellerInventoryTableActiveGroupId;
                return (
                  <li
                    key={uuid()}
                    className={groupdActive ? styles.activeTab : ''}
                    onClick={() => handleActiveGroupChange(g.id)}
                  >
                    {g.name}
                  </li>
                );
              })}
          </div>

          {/* Create group icon */}
          <li className={styles.addGroupIconWrapper} onClick={() => setOpenCreateGroup(true)}>
            +
          </li>
        </ul>

        {/* Search by seller/merchant IDs */}
      </div>

      {/* Create group modal */}
      <Modal
        className={styles.modalReset}
        open={openCreateGroup}
        closeOnEscape
        content={<CreateGroup closeModal={() => setOpenCreateGroup(false)} />}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerInventoryTableGroups: getSellerInventoryTableGroups(state),
    sellerInventoryTableActiveGroupId: getSellerInventoryTableActiveGroupId(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerInventoryTableGroups: () => dispatch(fetchSellerInventoryTableGroups()),
    setSellerInventoryTableActiveGroupId: (payload: SellerInventoryTableActiveGroupId) =>
      dispatch(setSellerInventoryTableActiveGroupId(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableGroups);
