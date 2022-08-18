import React, { useEffect } from 'react';
import upvoty from './upvoty';

const UpvotyWidget = () => {
  useEffect(() => {
    upvoty.init('render', { boardHash: null, ssoToken: null, baseUrl: 'aistock.upvoty.com' });
    return () => {
      upvoty.destroy();
    };
  }, []);
  return <div data-upvoty style={{ height: '1000px' }} />;
};

export default UpvotyWidget;
