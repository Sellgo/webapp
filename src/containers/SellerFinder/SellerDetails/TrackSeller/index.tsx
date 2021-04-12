import React from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
interface Props {
  tracking: boolean;
}

const TrackSeller = (props: Props) => {
  return (
    <div className={'track-btn-container'}>
      <Button className={`track-seller ${props.tracking ? 'tracking' : 'not-tracking'}`}>
        <span>
          <i className={'fas fa-fingerprint'} />
        </span>
        <span className="tracking-label">Track</span>
      </Button>
      <span>
        <Icon name="refresh" color="grey" />
      </span>
    </div>
  );
};

export default TrackSeller;
