import React from 'react';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

const TrackerProgress = () => {
  return <Progress percent={68} progress indicating className={'defaultProgressBar'} />;
};

export default TrackerProgress;
