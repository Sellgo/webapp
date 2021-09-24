import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';
import { Popup } from 'semantic-ui-react';

/* Selectors */
import { getSellerInventoryTableGroups } from '../../../../../selectors/SellerResearch/SellerInventory';

/* Assets */
import { ReactComponent as GroupFolderIcon } from '../../../../../assets/images/folder-plus.svg';

/* Interfaces */
import { SellerInventoryTableGroup } from '../../../../../interfaces/SellerResearch/SellerInventory';
import { RowCell } from '../../../../../interfaces/Table';

/* Styling */
import styles from './index.module.scss';

interface Props extends RowCell {
  sellerInventoryTableGroups: SellerInventoryTableGroup[];
}

const GroupCell = (props: Props) => {
  const { sellerInventoryTableGroups, ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const currentGroupId = rowData[dataKey];

  const filterOutGroups =
    sellerInventoryTableGroups &&
    sellerInventoryTableGroups.filter(g => {
      return g.id !== currentGroupId;
    });

  const groupsAvailable = filterOutGroups.length > 0;

  const handleClick = (e: any) => {
    e.preventDefault();
    console.log('Update groups here');
  };

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.groupCell}>
        <Popup
          on={'click'}
          trigger={
            <GroupFolderIcon
              className={groupsAvailable ? styles.activeIcon : styles.inActiveIcon}
            />
          }
          position="bottom center"
          offset="-30"
          className={styles.groupCellPopup}
          content={
            <div className={styles.sellerGroupOptions}>
              <p>SELECT GROUP</p>

              {/* If groups avialable show them */}
              {groupsAvailable &&
                filterOutGroups &&
                filterOutGroups.map(g => {
                  return (
                    <button key={g.id} onClick={handleClick}>
                      {g.name}
                    </button>
                  );
                })}

              {/* If no groups show a message */}
              {!groupsAvailable && <span>No groups available</span>}
            </div>
          }
        />
      </div>
    </Table.Cell>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerInventoryTableGroups: getSellerInventoryTableGroups(state),
  };
};

export default connect(mapStateToProps)(GroupCell);
