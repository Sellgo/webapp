import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Interfaces */
import { RowCell } from '../../../interfaces/Table';

/* Assets */
import ActionButton from '../../ActionButton';
import ValidCheckIcon from '../../Icons/ValidCheckIcon';
import AddUserIcon from '../../Icons/AddUserIcon';

interface Props extends RowCell {
  onChange?: (rowData: any) => void;
  expandedRowKeys: string[];
  userOnboarding: boolean;
  userOnboardingResources: any;
  type?: 'buyBox' | 'sellerInventoryTable';
  isArrow?: boolean;
}

const ExpansionCell = (props: Props) => {
  const { ...otherProps } = props;
  const { rowData, dataKey } = otherProps;

  const isLookedUp = rowData[dataKey];

  /* Handle Expansion icon clicks */
  // const handleClick = () => {
  //   console.log('hadnle CLick');
  //   if (isDisabled) {
  //     return;
  //   }

  //   onChange(rowData);
  // };

  // let isDisabled = false;
  // if (type === 'sellerInventoryTable') {
  //   isDisabled = !rowData.has_inventory;
  // } else if (type === 'buyBox') {
  //   isDisabled = !rowData.num_sellers;
  // } else {
  //   isDisabled = false;
  // }

  const reRouteToSellerDetailsPage = () => {
    const uri = `/insight/${rowData?.business_name?.replace(/\s+/g, '_')}_profile_${rowData?.id}`;
    window.open(uri, '_blank');
  };

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.expansionCell}>
        {!isLookedUp ? (
          <ActionButton
            variant="primary"
            type="purpleGradient"
            size="md"
            onClick={reRouteToSellerDetailsPage}
          >
            <div className={styles.unlockedBtn}>
              <AddUserIcon fill="#FFF" /> Unlock
            </div>
          </ActionButton>
        ) : (
          <ActionButton
            variant="secondary"
            type="black"
            size="md"
            onClick={reRouteToSellerDetailsPage}
          >
            <div className={styles.unlockedBtn}>
              <ValidCheckIcon fill="#5DC560" /> Insight
            </div>
          </ActionButton>
        )}
      </div>
    </Table.Cell>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(ExpansionCell);
