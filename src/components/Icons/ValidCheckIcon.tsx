import React, { memo } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const ValidCheckIcon: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 15}
      height={height ?? 15}
      viewBox="0 0 15 15"
    >
      <path
        id="badge-check-solid_4_"
        data-name="badge-check-solid (4)"
        // eslint-disable-next-line max-len
        d="M7.5,0A2.813,2.813,0,0,1,9.987,1.5,2.814,2.814,0,0,1,13.5,5.013a2.815,2.815,0,0,1,0,4.975A2.814,2.814,0,0,1,9.987,13.5a2.815,2.815,0,0,1-4.975,0A2.814,2.814,0,0,1,1.5,9.987a2.815,2.815,0,0,1,0-4.975A2.814,2.814,0,0,1,5.013,1.5,2.813,2.813,0,0,1,7.5,0Zm2.842,6.592A.7.7,0,0,0,9.349,5.6L6.565,8.382,5.423,7.239a.7.7,0,0,0-.993.993L6.07,9.873a.7.7,0,0,0,.993,0Z"
        fill={fill ?? '#3fc89c'}
      />
    </svg>
  );
};

export default memo(ValidCheckIcon);
