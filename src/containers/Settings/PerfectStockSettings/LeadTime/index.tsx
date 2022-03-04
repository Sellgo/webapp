import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import LeadTimeGroup from './LeadTimeGroup';
import LeadTimeMeta from './LeadTimeMeta';
import Placeholder from '../../../../components/Placeholder';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';

/* Types */
import { SingleLeadTimeGroup } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Constants */
import { AppConfig } from '../../../../config';
import ActionButton from '../../../../components/ActionButton';

interface Props {
  match: any;
}
const LeadTime = (props: Props) => {
  const { match } = props;

  const [leadTimeGroups, setLeadTimeGroups] = React.useState<SingleLeadTimeGroup[]>([]);
  const [isFetchLeadTimeGroupsLoading, setFetchLeadTimeGroupsLoading] = React.useState<boolean>(
    true
  );
  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */
  const fetchLeadTimeGroups = async () => {
    setFetchLeadTimeGroupsLoading(true);
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/purchase-orders/lead-times`
      );
      setLeadTimeGroups(data);
    } catch (err) {
      console.error(err);
    }
    setFetchLeadTimeGroupsLoading(false);
  };

  /* Adds new trigger */
  const handleAddLeadTimeGroup = async () => {
    setFetchLeadTimeGroupsLoading(true);
    try {
      const newLeadTimeGroup: SingleLeadTimeGroup = {
        lead_times: [],
        name: 'Default Lead Time Group',
        status: 'active',
      };
      setLeadTimeGroups([...leadTimeGroups, newLeadTimeGroup]);
    } catch (err) {
      console.error(err);
    }
    setFetchLeadTimeGroupsLoading(false);
  };

  /* Deletes trigger */
  const handleDeleteLeadTimeGroup = async (id: number) => {
    setFetchLeadTimeGroupsLoading(true);
    const leadTimeToDelete = leadTimeGroups.find(leadTime => leadTime.id === id);
    if (leadTimeToDelete) {
      leadTimeToDelete.status = 'inactive';
      try {
        const { status } = await axios.patch(
          `${AppConfig.BASE_URL_API}sellers/${sellerID}/purchase-orders/lead-times`,
          leadTimeToDelete
        );

        if (status === 201) {
          let newLeadTimeGroups = [...leadTimeGroups];
          newLeadTimeGroups = newLeadTimeGroups.filter(leadTimeGroup => leadTimeGroup.id !== id);
          setLeadTimeGroups(newLeadTimeGroups);
        }
      } catch (err) {
        console.error(err);
      }
    }
    setFetchLeadTimeGroupsLoading(false);
  };

  React.useEffect(() => {
    fetchLeadTimeGroups();
  }, []);

  return (
    <main className={styles.leadTimeWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Perfect Stock' },
          { content: 'Lead Time' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.leadTime}>
        <LeadTimeMeta />
        {isFetchLeadTimeGroupsLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
        {!isFetchLeadTimeGroupsLoading &&
          leadTimeGroups.map((leadTimeGroup: SingleLeadTimeGroup, index: number) => (
            <LeadTimeGroup
              key={index}
              fetchLeadTimeGroups={fetchLeadTimeGroups}
              handleDeleteLeadTimeGroup={handleDeleteLeadTimeGroup}
              initialLeadTimeGroup={leadTimeGroup}
            />
          ))}
        <ActionButton
          type="purpleGradient"
          variant="secondary"
          size="md"
          className={styles.addTriggerButton}
          onClick={handleAddLeadTimeGroup}
        >
          <ThinAddIcon />
          <span>Add Lead Time Group</span>
        </ActionButton>
      </div>
    </main>
  );
};

export default LeadTime;
