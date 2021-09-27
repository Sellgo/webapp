import React from 'react';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

const CentralScrapingProgress = () => {
  const progressPercent = Number.parseFloat(String('50' || '0'));

  return (
    <>
      <Progress
        percent={progressPercent || 0}
        progress
        indicating
        className={'defaultProgressBar'}
      />
    </>
  );
};

export default CentralScrapingProgress;
