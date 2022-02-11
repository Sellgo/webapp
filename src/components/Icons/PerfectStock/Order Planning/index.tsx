import React from 'react';

interface Props {
  fill?: string;
}

const OrderPlanningIcon: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
      <path
        fill={fill || '#fff'}
        /* eslint-disable-next-line max-len */
        d="M.625,66.5h16.25a.625.625,0,0,0,.625-.625v-1.25A.625.625,0,0,0,16.875,64H.625A.625.625,0,0,0,0,64.625v1.25A.625.625,0,0,0,.625,66.5Zm18.75,3.75H3.125a.625.625,0,0,0-.625.625v1.25a.625.625,0,0,0,.625.625h16.25A.625.625,0,0,0,20,72.125v-1.25A.625.625,0,0,0,19.375,70.25Zm-2.5,6.25H.625A.625.625,0,0,0,0,77.125v1.25A.625.625,0,0,0,.625,79h16.25a.625.625,0,0,0,.625-.625v-1.25A.625.625,0,0,0,16.875,76.5Z"
        transform="translate(0 -64)"
      />
    </svg>
  );
};

export default OrderPlanningIcon;
