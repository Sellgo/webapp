import React, { memo } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const InValidCrossIcon: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 15}
      height={height ?? 15}
      viewBox="0 0 15 15"
    >
      <path
        id="circle-xmark-solid_1_"
        data-name="circle-xmark-solid (1)"
        // eslint-disable-next-line max-len
        d="M7.5,15A7.5,7.5,0,1,0,0,7.5,7.5,7.5,0,0,0,7.5,15ZM5.127,5.127a.7.7,0,0,1,.993,0L7.5,6.5,8.874,5.127a.7.7,0,0,1,.993.993L8.49,7.5,9.867,8.874a.7.7,0,0,1-.993.993L7.5,8.49,6.12,9.867a.7.7,0,0,1-.993-.993L6.5,7.5,5.127,6.12A.7.7,0,0,1,5.127,5.127Z"
        fill={fill ?? '#ff7b82'}
      />
    </svg>
  );
};

export default memo(InValidCrossIcon);
