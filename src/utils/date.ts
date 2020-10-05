export const HOURS_IN_A_DAY = 24;
export const MINUTES_IN_A_DAY = HOURS_IN_A_DAY * 60; // 1440
export const SECONDS_IN_A_DAY = MINUTES_IN_A_DAY * 60; // 86400
export const MILLISECONDS_IN_A_DAY = SECONDS_IN_A_DAY * 1000; // 86400000
export const MILLISECONDS_IN_A_MINUTE = 60 * 1000; // 60000

export const formatCompletedTime = (timestamp: Date) => {
  return new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const formatCompletedDate = (timestamp: Date) => {
  const months: Array<string> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const toFormatDate: Date = new Date(timestamp);
  const date: number = toFormatDate.getDate();
  const month: string = months[toFormatDate.getMonth()];
  const year: number = toFormatDate.getFullYear();
  const formattedTime = formatCompletedTime(toFormatDate);
  return `${date}-${month}-${year} \n ${formattedTime}`;
};
