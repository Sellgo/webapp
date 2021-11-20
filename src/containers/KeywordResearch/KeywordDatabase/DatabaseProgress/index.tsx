import React from 'react';
import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

/* Actions */
import { fetchKeywordDatabaseProgress } from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Hooks */
import { useInterval } from '../../../../hooks/useInterval';

/* Interfaces */
import { KeywordDatabaseProgressData } from '../../../../interfaces/KeywordResearch/KeywordDatabase';

/* Selectors */
import {
  getKeywordDatabaseProgressData,
  getShouldFetchkeywordDatabaseProgress,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

interface Props {
  shouldFetchKeywordDatabaseProgressState: boolean;
  keywordDatabaseProgressData: KeywordDatabaseProgressData;
  fetchKeywordDatabaseProgress: () => void;
}

const DatabaseProgress = (props: Props) => {
  const {
    keywordDatabaseProgressData,
    fetchKeywordDatabaseProgress,
    shouldFetchKeywordDatabaseProgressState,
  } = props;

  const progressPercent = Math.floor(Number.parseFloat(keywordDatabaseProgressData.progress));

  useInterval(() => {
    if (shouldFetchKeywordDatabaseProgressState) {
      fetchKeywordDatabaseProgress();
      return;
    }
    return;
  }, 5000);

  return (
    <>
      {shouldFetchKeywordDatabaseProgressState && (
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
    shouldFetchKeywordDatabaseProgressState: getShouldFetchkeywordDatabaseProgress(state),
    keywordDatabaseProgressData: getKeywordDatabaseProgressData(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseProgress: () => dispatch(fetchKeywordDatabaseProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseProgress);
