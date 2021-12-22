import React from 'react';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../styles/progressReset.scss';

/* Hooks */
import { useInterval } from '../../hooks/useInterval';

interface Props {
  shouldFetchProgress: boolean;
  progress: number;
  fetchProgress: () => void;
}

const ProgressBar = (props: Props) => {
  const { fetchProgress, progress, shouldFetchProgress } = props;

  useInterval(() => {
    if (shouldFetchProgress) {
      fetchProgress();
      return;
    }
    return;
  }, 5000);

  return (
    <>
      {shouldFetchProgress && (
        <Progress
          percent={progress || 0}
          progress={false}
          indicating
          className={'defaultProgressBar'}
        />
      )}
    </>
  );
};

export default ProgressBar;
