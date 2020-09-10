import React from 'react';
import LeadsTrackerTable from './LeadsTrackerTable';
import PageHeader from '../../components/PageHeader';
import QuotaMeter from '../../components/QuotaMeter';

const LeadsTracker = (props: any) => {
  return (
    <div>
      <PageHeader
        title={'Leads Tracker'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Leads Tracker', to: '/leads-tracker' },
        ]}
        callToAction={<QuotaMeter />}
      />
      <LeadsTrackerTable supplierID={props.match.params.supplierID} />
    </div>
  );
};

export default LeadsTracker;
