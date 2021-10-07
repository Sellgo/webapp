import React from 'react';

interface Props {
  className: string;
}

const ThinCrossIcon: React.FC<Props> = props => {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7">
      <path
        className={className}
        /* eslint-disable-next-line max-len */
        d="M4.243,99.5l2.244-2.244.463-.463a.175.175,0,0,0,0-.247l-.5-.5a.175.175,0,0,0-.247,0L3.5,98.758.794,96.051a.175.175,0,0,0-.247,0l-.5.5a.175.175,0,0,0,0,.247L2.758,99.5.051,102.206a.175.175,0,0,0,0,.247l.5.5a.175.175,0,0,0,.247,0L3.5,100.243l2.244,2.244.463.463a.175.175,0,0,0,.247,0l.5-.5a.175.175,0,0,0,0-.247Z"
        transform="translate(0 -96)"
      />
    </svg>
  );
};

export default ThinCrossIcon;
