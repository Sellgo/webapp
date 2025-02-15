import { UNIT_WIDTH } from '../../constants/PerfectStock/OrderPlanning';

export const MODE_NONE = 0;
export const MODE_MOVE = 1;
export const MOVE_RESIZE_LEFT = 2;
export const MOVE_RESIZE_RIGHT = 3;

export const BUFFER_DAYS = 0;

export const DATA_CONTAINER_WIDTH = 5000;

export const VIEW_MODE_DAY = 'day';
export const VIEW_MODE_WEEK = 'week';
export const VIEW_MODE_MONTH = 'month';
export const VIEW_MODE_YEAR = 'year';

export const DAY_YEAR_MODE = UNIT_WIDTH / 7;
export const DAY_MONTH_MODE = UNIT_WIDTH;
export const DAY_WEEK_MODE = 480; //each hour 20 px
export const HOUR_DAY_WEEK = 20;
export const DAY_DAY_MODE = 1440; //each hour 60 px
export const HOUR_DAY_DAY = 60;

export const LINK_POS_RIGHT = 'LINK_POS_RIGHT';

export const LINK_POS_LEFT = 'LINK_POS_LEFT';
