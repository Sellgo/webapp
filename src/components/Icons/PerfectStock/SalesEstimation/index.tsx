import React from 'react';

interface Props {
  fill?: string;
}

const SalesEstimationIcon: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
      <path
        fill={fill || '#fff'}
        /* eslint-disable-next-line max-len */
        d="M4.6,72.346a.625.625,0,0,0,.884,0l2.02-2.02,3.308,3.308a.625.625,0,0,0,.884,0L16,69.328,17.15,70.48a.937.937,0,0,0,1.6-.663V65.875a.625.625,0,0,0-.625-.625H14.182a.937.937,0,0,0-.663,1.6L14.672,68,11.25,71.424,7.942,68.116a.625.625,0,0,0-.884,0l-2.9,2.9a.625.625,0,0,0,0,.884Zm14.779,4.779H1.875v-12.5A.625.625,0,0,0,1.25,64H.625A.625.625,0,0,0,0,64.625V77.75A1.25,1.25,0,0,0,1.25,79H19.375A.625.625,0,0,0,20,78.375V77.75A.625.625,0,0,0,19.375,77.125Z"
        transform="translate(0 -64)"
      />
    </svg>
  );
};

export default SalesEstimationIcon;
