import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

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
import { error } from '../../../../utils/notifications';

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

      if (data && data.length > 0) {
        const leadTimeGroupsWithIdentifier = data.map((leadTimeGroup: SingleLeadTimeGroup) => {
          return {
            ...leadTimeGroup,
            indexIdentifier: uuid(),
          };
        });
        setLeadTimeGroups(leadTimeGroupsWithIdentifier);
      }
    } catch (err) {
      console.error(err);
    }
    setFetchLeadTimeGroupsLoading(false);
  };

  /* Adds new trigger */
  const handleAddLeadTimeGroup = () => {
    try {
      const newLeadTimeGroup: SingleLeadTimeGroup = {
        lead_times: [],
        name: `Lead Time Group ${leadTimeGroups.length}`,
        status: 'active',
        indexIdentifier: uuid(),
      };
      setLeadTimeGroups([...leadTimeGroups, newLeadTimeGroup]);
    } catch (err) {
      console.error(err);
    }
  };

  /* Deletes trigger */
  const handleDeleteLeadTimeGroup = async (deleteIndexIdentifier: string) => {
    setFetchLeadTimeGroupsLoading(true);
    const leadTimeToDelete = leadTimeGroups.find(
      (leadTimeGroup: SingleLeadTimeGroup) =>
        leadTimeGroup.indexIdentifier === deleteIndexIdentifier
    );
    if (leadTimeToDelete && leadTimeToDelete.id) {
      leadTimeToDelete.status = 'inactive';
      try {
        const { status } = await axios.patch(
          `${AppConfig.BASE_URL_API}sellers/${sellerID}/purchase-orders/lead-times`,
          leadTimeToDelete
        );

        if (status === 201) {
          let newLeadTimeGroups = [...leadTimeGroups];
          /* Remove lead time group at index 3 */
          newLeadTimeGroups = newLeadTimeGroups.filter(
            (leadTimeGroup: SingleLeadTimeGroup) =>
              leadTimeGroup.indexIdentifier !== deleteIndexIdentifier
          );

          setLeadTimeGroups(newLeadTimeGroups);
        }
      } catch (err) {
        const { response } = err;
        if (response && response.status === 400) {
          error(response.data?.message);
        }
        console.error(err);
      }

      /* Lead time is not stored in backend yet */
    } else {
      let newLeadTimeGroups = [...leadTimeGroups];
      newLeadTimeGroups = newLeadTimeGroups.filter(
        (leadTimeGroup: SingleLeadTimeGroup) =>
          leadTimeGroup.indexIdentifier !== deleteIndexIdentifier
      );
      setLeadTimeGroups([...newLeadTimeGroups]);
    }
    setFetchLeadTimeGroupsLoading(false);
  };

  const setSingleLeadTimeGroup = (newLeadTimeGroup: SingleLeadTimeGroup) => {
    const newLeadTimeGroups = [...leadTimeGroups];
    const index = newLeadTimeGroups.findIndex(
      (leadTimeGroup: SingleLeadTimeGroup) =>
        newLeadTimeGroup.indexIdentifier === leadTimeGroup.indexIdentifier
    );
    if (index) {
      newLeadTimeGroups[index] = newLeadTimeGroup;
    }
    setLeadTimeGroups([...newLeadTimeGroups]);
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
          leadTimeGroups.map((leadTimeGroup: SingleLeadTimeGroup) => (
            <LeadTimeGroup
              key={leadTimeGroup.indexIdentifier}
              fetchLeadTimeGroups={fetchLeadTimeGroups}
              handleDeleteLeadTimeGroup={handleDeleteLeadTimeGroup}
              setInitialLeadTimeGroup={setSingleLeadTimeGroup}
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
