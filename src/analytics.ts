//@ts-ignore
import Analytics from 'analytics';
//@ts-ignore
import googleAnalyticsPlugin from '@analytics/google-analytics';
//@ts-ignore
import fullStoryPlugin from '@analytics/fullstory';
import history from './history';
import { AppConfig } from './config';

// Initialize analytics and plugins
// Documentation: https://getanalytics.io
const analytics = Analytics({
  debug: process.env.REACT_APP_ENV !== 'production',
  plugins: [
    googleAnalyticsPlugin({
      trackingId: AppConfig.gaTrackingId,
    }),
    fullStoryPlugin({
      org: AppConfig.fullStoryOrgId,
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
