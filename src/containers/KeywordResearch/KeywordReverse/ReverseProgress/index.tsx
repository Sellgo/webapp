import React from 'react';

import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

/* Actions */
import {
  fetchKeywordReverseProgress,
  shouldFetchKeywordReverseProgress,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Hooks */
import { useInterval } from '../../../../hooks/useInterval';

/* Inerfaces */
import { KeywordReverseProgressData } from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Selectors */
import {
  getKeywordReverseProgressData,
  getShouldFetchKeywordReverseProgress,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

interface Props {
  shouldFetchKeywordReverseProgressState: boolean;
  keywordReverseProgressData: KeywordReverseProgressData;
  fetchKeywordReverseProgress: () => void;
  shouldFetchKeywordReverseProgressAction: (payload: boolean) => void;
}

const ReverseProgress = (props: Props) => {
  const {
    keywordReverseProgressData,
    fetchKeywordReverseProgress,
    shouldFetchKeywordReverseProgressState,
  } = props;

  const progressPercent = Math.floor(Number.parseFloat(keywordReverseProgressData.progress));

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
          progress={false}
          indicating
          className={'defaultProgressBar'}
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
