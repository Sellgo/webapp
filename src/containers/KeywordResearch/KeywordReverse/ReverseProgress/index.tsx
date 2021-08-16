import React from 'react';

import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';
import {
  fetchKeywordReverseProgress,
  shouldFetchKeywordReverseProgress,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Hooks */
import { useInterval } from '../../../../hooks/useInterval';

import {
  getKeywordReverseProgressData,
  getShouldFetchKeywordReverseProgress,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Styling */
import './index.scss';

interface Props {
  shouldFetchKeywordReverseProgressState: boolean;
  keywordReverseProgressData: any;
  fetchKeywordReverseProgress: () => void;
  shouldFetchKeywordReverseProgressAction: (payload: boolean) => void;
}

const ReverseProgress = (props: Props) => {
  const {
    keywordReverseProgressData,
    fetchKeywordReverseProgress,
    shouldFetchKeywordReverseProgressState,
  } = props;

  const progressPercent = Number.parseFloat(keywordReverseProgressData.progress);
  const isFailedStatus = keywordReverseProgressData.status === 'failed';

  console.log('From components', {
    shouldFetchKeywordReverseProgressState,
    progressPercent,
    isFailedStatus,
  });

  useInterval(
    () => {
      fetchKeywordReverseProgress();
    },
    5000,
    shouldFetchKeywordReverseProgressState
  );

  return (
    <>
      {shouldFetchKeywordReverseProgressState && (
        <Progress
          percent={progressPercent || 0}
          progress
          indicating
          className={'keywordReverseProgress'}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    shouldFetchKeywordReverseProgressState: getShouldFetchKeywordReverseProgress(state),
    keywordReverseProgressData: getKeywordReverseProgressData(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseProgress: () => dispatch(fetchKeywordReverseProgress()),
    shouldFetchKeywordReverseProgressAction: (payload: boolean) =>
      dispatch(shouldFetchKeywordReverseProgress(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseProgress);
