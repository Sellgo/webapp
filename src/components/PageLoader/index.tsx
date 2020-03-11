import React from 'react';
import loading from './loading.svg';
import './index.scss';

export default () => (
  <div className="page-loader">
    <img src={loading} alt="loading" />
  </div>
);
