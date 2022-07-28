import React from 'react';
import './index.scss';
import sellgoLoadingAnimation from '../../assets/images/sellgo-loading-animation-450-1.gif';
import aistockLoadingAnimation from '../../assets/images/sellgo-loading-animation-450-1.gif';
import { isSellgoSession } from '../../utils/session';

const PageLoader = (props: any) => {
  const { pageLoading, isSearchManagement } = props;
  return (
    <div
      className={`page-loader ${pageLoading && 'full'} ${
        isSearchManagement ? 'search-management-page' : ''
      }`}
    >
      {isSellgoSession() ? (
        <img src={sellgoLoadingAnimation} alt="loading" />
      ) : (
        <img src={aistockLoadingAnimation} alt="loading" />
      )}
    </div>
  );
};

export default PageLoader;
