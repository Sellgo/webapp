import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

import {
  EXPANDED_TABLE_CELL_KEY,
  COLLAPSE_TABLE_CELL_KEY,
  FALLBACK_ONBOARDING_DETAILS,
  TABLE_SPECIAL_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Interfaces */
import { RowCell } from '../../../interfaces/Table';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../assets/images/deExpandCell.svg';

interface Props extends RowCell {
  onChange: (rowData: any) => void;
  expandedRowKeys: string[];
  userOnboarding: boolean;
  userOnboardingResources: any;
  type?: 'buyBox' | 'sellerInventoryTable';
}

const ExpansionCell = (props: Props) => {
  const {
    expandedRowKeys,
    onChange,
    userOnboarding,
    userOnboardingResources,
    type,
    ...otherProps
  } = props;
  const { rowData, dataKey } = otherProps;

  const isExpandedRow = expandedRowKeys.find((rowKey: any) => rowKey === rowData[dataKey]);

  /* On Boarding Logic */
  const specialCellOnboardingDetails =
    userOnboardingResources[TABLE_SPECIAL_ONBOARDING_INDEX] || {};
  const showOnboarding = userOnboarding && Object.keys(specialCellOnboardingDetails).length > 0;

  const { youtubeLink, tooltipText } =
    specialCellOnboardingDetails[
      !isExpandedRow ? EXPANDED_TABLE_CELL_KEY : COLLAPSE_TABLE_CELL_KEY
    ] || FALLBACK_ONBOARDING_DETAILS;

  /* Handle Expansion icon clicks */
  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    onChange(rowData);
  };

  let isDisabled = false;
  if (type === 'sellerInventoryTable') {
    isDisabled = !rowData.has_inventory;
  } else if (type === 'buyBox') {
    isDisabled = !rowData.num_sellers;
    console.log(isDisabled);
  } else {
    isDisabled = false;
  }

  const expanionIconClasses = `${isDisabled ? styles.expansionIconDisabled : styles.expansionIcon}`;

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.expansionCell}>
        {isExpandedRow ? (
          <DeExpandedCellIcon onClick={handleClick} className={expanionIconClasses} />
        ) : (
          <ExpandedCellIcon onClick={handleClick} className={expanionIconClasses} />
        )}

        {/* Youtube On boarding Icon */}
        {showOnboarding && (youtubeLink || tooltipText) && (
          <OnboardingTooltip
            youtubeLink={youtubeLink}
            tooltipMessage={tooltipText}
            infoIconClassName={styles.infoCircle}
            youtubeIconClassName={styles.youtubeLogo}
          />
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
