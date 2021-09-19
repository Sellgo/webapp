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
}

const ExpansionCell = (props: Props) => {
  const {
    expandedRowKeys,
    onChange,
    userOnboarding,
    userOnboardingResources,
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

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.expansionCell}>
        {isExpandedRow ? (
          <DeExpandedCellIcon onClick={() => onChange(rowData)} className={styles.expansionIcon} />
        ) : (
          <ExpandedCellIcon onClick={() => onChange(rowData)} className={styles.expansionIcon} />
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
