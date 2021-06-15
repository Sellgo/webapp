import * as React from 'react';

type GroupProp = {
  count: number;
};

const GroupBadgeCount = ({ count }: GroupProp) => (
  <span className={count ? 'has-group' : 'no-group'}>{count}</span>
);

export default GroupBadgeCount;
