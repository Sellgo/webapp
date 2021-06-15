import React, { memo } from 'react';
import { v4 as uuid } from 'uuid';

/* Components */
import Gem from '../Icons/Gem';

interface Props {
  name: string;
}

const GemGenerator: React.FC<Props> = props => {
  let gems: React.ReactNode;

  switch (props.name) {
    case 'Starter': {
      gems = [<Gem key={uuid()} width={12} height={12} fill="#fc7900" />];
      break;
    }
    case 'Suite': {
      gems = [
        <Gem key={uuid()} width={12} height={12} fill="#fc7900" />,
        <Gem key={uuid()} width={12} height={12} fill="#5dc560" />,
      ];
      break;
    }

    case 'Professional': {
      gems = [
        <Gem key={uuid()} width={12} height={12} fill="#fc7900" />,
        <Gem key={uuid()} width={12} height={12} fill="#5dc560" />,
        <Gem key={uuid()} width={12} height={12} fill="#349af8" />,
      ];
      break;
    }
    default: {
      gems = null;
    }
  }

  return <>{gems}</>;
};

export default memo(GemGenerator);
