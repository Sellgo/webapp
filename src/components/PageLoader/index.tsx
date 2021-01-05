import React from 'react';
import './index.scss';
import loadingAnimation from '../../assets/images/sellgo-loading-animation-450-1.gif';

const PageLoader = (props: any) => {
  const { pageLoading } = props;
  return (
    <div className={`page-loader ${pageLoading && 'full'}`}>
      <img src={loadingAnimation} alt="loading" />
    </div>
  );
};

export default PageLoader;
