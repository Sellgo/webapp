import React from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
interface Props {
  tracking: boolean;
  type?: string;
}

const TrackSeller = (props: Props) => {
  return (
    <div className={'track-btn-container'}>
      <Button
        className={`${props.type === 'seller' ? 'track-seller' : 'track-product'} ${
          props.tracking ? 'tracking' : 'not-tracking'
        }`}
      >
        <span>
          {props.type === 'product' && <i className={'fas fa-fingerprint'} />}
          {props.type === 'seller' && '+'}
        </span>
        <span className="tracking-label">Track</span>
      </Button>
      {props.type === 'product' && (
        <span>
          <Icon name="refresh" color="grey" />
        </span>
      )}
    </div>
  );
};

export default TrackSeller;
