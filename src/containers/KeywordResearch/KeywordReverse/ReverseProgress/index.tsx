import React from 'react';
import { Progress } from 'semantic-ui-react';

/* Styling */
import './index.scss';

const ReverseProgress = () => {
  return (
    <>
      <Progress percent={44} progress indicating className={'keywordReverseProgress'} />
    </>
  );
};

export default ReverseProgress;
