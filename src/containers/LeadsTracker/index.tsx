import React from 'react';
import LeadsTrackerTable from './LeadsTrackerTable';
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';

interface LeadsTrackerProps {
  match: any;
}

const LeadsTracker = (props: LeadsTrackerProps) => {
  const { match } = props;

  return (
    <div>
      <PageHeader
        title={'Leads Tracker'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Leads Tracker', to: '/leads-tracker' },
        ]}
        callToAction={<QuotaMeter />}
        auth={match.params.auth}
      />
      <LeadsTrackerTable />
    </div>
  );
};

export default LeadsTracker;
