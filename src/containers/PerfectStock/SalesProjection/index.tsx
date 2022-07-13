import React from 'react';
import { connect } from 'react-redux';
import JoyRide from 'react-joyride';
import axios from 'axios';

/* Actions */
import {
  fetchSalesProjection,
  fetchRefreshProgress,
} from '../../../actions/PerfectStock/SalesProjection';
import { updatePerfectStockGetStartedStatus } from '../../../actions/UserOnboarding';

/* Interfaces */
import {
  GraphDataSeries,
  SalesProjectionFilters,
  SalesProjectionPayload,
} from '../../../interfaces/PerfectStock/SalesProjection';
import { PerfectStockGetStartedStatus } from '../../../interfaces/UserOnboarding';

/* Selectors */
import {
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
  getSalesProjectionFilters,
  getSalesProjectionResults,
} from '../../../selectors/PerfectStock/SalesProjection';
import { getPerfectStockGetStartedStatus } from '../../../selectors/UserOnboarding';

/* Containers */
import SalesProjectionMeta from './SalesProjectionMeta';
import SalesProjectionTable from './SalesProjectionTable';
import ProgressBar from '../../../components/ProgressBar';
import TopGraph from './TopGraph';

/* Utils */
import { getDateOnly, addNumberOfDays } from '../../../utils/date';
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';

const steps = [
  {
    target: '#salesProjectionRefreshButton',
    content: 'Step 1',
    disableBeacon: true,
  },
];

interface Props {
  updatePerfectStockGetStartedStatus: (key: string, status: boolean) => void;
  perfectStockGetStartedStatus: PerfectStockGetStartedStatus;
  fetchSalesProjection: (payload: SalesProjectionPayload) => void;
  refreshProgress: number;
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  salesProjectionFilters: SalesProjectionFilters;
  salesProjectionResult: any[];
}

const SalesProjection = (props: Props) => {
  const {
    fetchSalesProjection,
    fetchRefreshProgress,
    salesProjectionFilters,
    salesProjectionResult,
    refreshProgress,
    isFetchingProgressForRefresh,
    perfectStockGetStartedStatus,
    updatePerfectStockGetStartedStatus,
  } = props;

  const [salesProjectionGraphData, setSalesProjectionGraphData] = React.useState<GraphDataSeries[]>(
    []
  );

  const fetchSalesProjectionChart = async (granularity?: number, merchantListingIds?: number[]) => {
    if (!salesProjectionResult || salesProjectionResult.length === 0) {
      return;
    }
    const type = encodeURIComponent('revenue');
    const dates =
      `&start_date=` +
      `${getDateOnly(new Date())}` +
      `&end_date=${getDateOnly(addNumberOfDays(new Date(), 365))}`;
    const granularityString = `&granularity=${granularity || 1}`;

    const _merchantListingIds = `&merchant_listing_ids=${
      merchantListingIds?.length
        ? merchantListingIds
        : salesProjectionResult.map((item) => item.merchant_listing_id)
    }`;

    const url = `${
      AppConfig.BASE_URL_API
    }sellers/${sellerIDSelector()}/cash-flow-chart?types=${type}${dates}${granularityString}${_merchantListingIds}`;
    const { data } = await axios.get(url);
    const mainGraph = data[0];
    const chartData = mainGraph.data.map((item: any) => [
      new Date(item.date).getTime(),
      parseFloat(item.amount),
    ]);
    setSalesProjectionGraphData([
      {
        name: 'Revenue',
        type: 'line',
        data: chartData,
      },
    ]);
  };

  React.useEffect(() => {
    fetchSalesProjectionChart();
  }, [salesProjectionResult]);

  React.useEffect(() => {
    fetchSalesProjection({});
  }, [salesProjectionFilters.active, salesProjectionFilters.fba]);

  return (
    <main>
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />
      <TopGraph
        fetchMainChart={fetchSalesProjectionChart}
        isLoading={false}
        data={salesProjectionGraphData}
      />
      <SalesProjectionMeta />
      <SalesProjectionTable />
      <JoyRide
        steps={steps}
        run={perfectStockGetStartedStatus.isSalesProjectionTourRunning}
        continuous={true}
        showProgress={true}
        callback={(data: any) => {
          if (data.action === 'close' || data.action === 'reset') {
            updatePerfectStockGetStartedStatus('isSalesProjectionTourRunning', false);
          }
        }}
        scrollToFirstStep={false}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    refreshProgress: getRefreshProgress(state),
    isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
    perfectStockGetStartedStatus: getPerfectStockGetStartedStatus(state),
    salesProjectionFilters: getSalesProjectionFilters(state),
    salesProjectionResult: getSalesProjectionResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    updatePerfectStockGetStartedStatus: (key: string, status: boolean) =>
      dispatch(updatePerfectStockGetStartedStatus(key, status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SalesProjection);
