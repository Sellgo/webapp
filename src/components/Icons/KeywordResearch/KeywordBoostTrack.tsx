import React from 'react';

interface Props {
  fill: string;
}

const KeywordBoostTrack: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11.667" viewBox="0 0 15 11.667">
      <path
        id="tachometer-fastest-solid"
        /* eslint-disable-next-line max-len */
        d="M7.5,32A7.5,7.5,0,0,0,1.017,43.271a.824.824,0,0,0,.715.4H13.268a.824.824,0,0,0,.715-.4A7.5,7.5,0,0,0,7.5,32Zm5.1,8.95-3.488.581a1.719,1.719,0,0,1-.18.469H6.065a1.649,1.649,0,0,1-.231-.833,1.663,1.663,0,0,1,3.083-.87l3.481-.58A.625.625,0,0,1,12.6,40.95Z"
        transform="translate(0 -32)"
        fill={fill}
      />
    </svg>
  );
};

export default KeywordBoostTrack;
