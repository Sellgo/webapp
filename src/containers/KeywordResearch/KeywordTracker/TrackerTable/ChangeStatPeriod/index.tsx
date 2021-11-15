import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';
import { Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Component */
// import OnboardingTooltip from '../../../../../components/OnboardingTooltip';
import TooltipMessage from '../../../../../components/TooltipMessage';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  TABLE_KPI_ONBOARDING_INDEX,
} from '../../../../../constants/UserOnboarding';

/* Selectors */
import {
  getUserOnboarding,
  getUserOnboardingResources,
} from '../../../../../selectors/UserOnboarding';

/* Assets */
import { ReactComponent as Top10Icon } from '../../../../../assets/images/top10.svg';
import { ReactComponent as Top50Icon } from '../../../../../assets/images/top50.svg';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

interface Props extends RowCell {
  userOnboarding: boolean;
  userOnboardingResources: any[];
}
const ChangeStatPeriod = (props: Props) => {
  const { userOnboardingResources, ...otherProps } = props;
  const { dataKey } = otherProps;

  const tableKpiOnboardingDetails = userOnboardingResources[TABLE_KPI_ONBOARDING_INDEX] || {};
  // const showTableKpiOnboarding =
  //   userOnboarding && Object.keys(tableKpiOnboardingDetails).length > 0;
  const { tooltipText } = tableKpiOnboardingDetails[dataKey] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.changeStatPeriod}>
        <Popup
          on="hover"
          className={
            tooltipText && tooltipText.length > 0
              ? styles.onboardingTooltipPopup
              : styles.hideTooltipPopup
          }
          trigger={<Top10Icon className={styles.top50Icon} />}
          content={tooltipText && <TooltipMessage tooltipMessage={tooltipText} />}
        />
        <Top50Icon className={styles.top50Icon} />
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

export default connect(mapStateToProps)(ChangeStatPeriod);
