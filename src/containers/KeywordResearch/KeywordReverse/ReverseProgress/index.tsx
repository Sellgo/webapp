import React from 'react';

import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';
import {
  fetchKeywordReverseProgress,
  shouldFetchKeywordReverseProgress,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Hooks */
import { useInterval } from '../../../../hooks/useInterval';

/* Inerfaces */
import { ReverseKeywordProgressData } from '../../../../interfaces/KeywordResearch/KeywordReverse';

import {
  getKeywordReverseProgressData,
  getShouldFetchKeywordReverseProgress,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Styling */
import './index.scss';

interface Props {
  shouldFetchKeywordReverseProgressState: boolean;
  keywordReverseProgressData: ReverseKeywordProgressData;
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

  useInterval(() => {
    if (shouldFetchKeywordReverseProgressState) {
      fetchKeywordReverseProgress();
      return;
    }
    return;
  }, 5000);

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
