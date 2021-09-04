import React from 'react';
import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

/* Hooks */
import { useInterval } from '../../../../hooks/useInterval';

/* Actions */
import { fetchTrackerProductKeywordsHistoryExportProgress } from '../../../../actions/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getTrackerProductKeywordsHistoryExportProgress,
  shouldFetchTrackerProductKeywordsHistoryExportProgress,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Interface */
import { TrackerProductsKeywordsHistoryExportProgress } from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  shouldFetchTrackerProductKeywordsHistoryExportProgress: boolean;
  trackerProductKeywordsHistoryExportProgress: TrackerProductsKeywordsHistoryExportProgress;
  fetchTrackerProductKeywordsHistoryExportProgress: () => void;
}

const TrackerProgress = (props: Props) => {
  const {
    trackerProductKeywordsHistoryExportProgress,
    fetchTrackerProductKeywordsHistoryExportProgress,
    shouldFetchTrackerProductKeywordsHistoryExportProgress,
  } = props;

  const progressPercent = Number.parseFloat(
    trackerProductKeywordsHistoryExportProgress.export_progress
  );

  useInterval(() => {
    if (shouldFetchTrackerProductKeywordsHistoryExportProgress) {
      fetchTrackerProductKeywordsHistoryExportProgress();
    }
    return;
  }, 1200);

  return (
    <>
      {shouldFetchTrackerProductKeywordsHistoryExportProgress && (
        <Progress
          percent={progressPercent || 0}
          progress
          indicating
          className={'defaultProgressBar'}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    shouldFetchTrackerProductKeywordsHistoryExportProgress: shouldFetchTrackerProductKeywordsHistoryExportProgress(
      state
    ),
    trackerProductKeywordsHistoryExportProgress: getTrackerProductKeywordsHistoryExportProgress(
      state
    ),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTrackerProductKeywordsHistoryExportProgress: () =>
      dispatch(fetchTrackerProductKeywordsHistoryExportProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerProgress);
