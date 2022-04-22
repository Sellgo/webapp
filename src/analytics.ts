/* eslint-disable import/no-named-as-default */
// @ts-ignore
import Analytics from 'analytics';
// @ts-ignore
import fullStoryPlugin from '@analytics/fullstory';

// @ts-ignore
import googleTagManager from '@analytics/google-tag-manager';

import history from './history';
import { AppConfig } from './config';

// Initialize analytics and plugins
// Documentation: https://getanalytics.io
const analytics = Analytics({
  debug: process.env.REACT_APP_ENV !== 'production',
  plugins: [
    fullStoryPlugin({
      org: AppConfig.fullStoryOrgId,
    }),
    googleTagManager({
      containerId: AppConfig.googleTagManagerContainerId,
    }),
  ],
});

// Track initial pageview
if (typeof window !== 'undefined') {
  analytics.page();
}

// Track pageview on route change
history.listen(() => {
  analytics.page();
});

export default analytics;
