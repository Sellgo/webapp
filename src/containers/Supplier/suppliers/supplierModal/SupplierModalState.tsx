import * as React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

interface Props {
  supplierModalState: number;
}

const renderSupplyHelpPopUp = () => {
  return (
    <div>
      <h2>Add Supplier Tutorial</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      <div>
        <h3>
          <Icon name="youtube play" size={'large'} color={'black'} />
          Youtube Tutorial
        </h3>
      </div>
    </div>
  );
};

const SupplierModalState: React.SFC<Props> = props => {
  return (
    <div className="supplierModalState">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={'circleState--active'}>
          <Icon name="plus square outline" color={'blue'} size="big" />
        </div>
        <span className="circleHeader">
          Add New Supplier{' '}
          <Popup
            content={renderSupplyHelpPopUp()}
            on="click"
            pinned
            trigger={<Icon name="question circle" size={'large'} color={'grey'} />}
            wide
          />
        </span>
      </div>
      <div className={props.supplierModalState > 1 ? 'lineState--active' : 'lineState'} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={props.supplierModalState > 1 ? 'circleState--active' : 'circleState'}>
          <Icon name="file" color={props.supplierModalState > 1 ? 'blue' : 'grey'} size="big" />
        </div>
        <span className="circleHeader">
          New Supply File{' '}
          <Popup
            content={renderSupplyHelpPopUp()}
            on="click"
            pinned
            trigger={<Icon name="question circle" size={'large'} color={'grey'} />}
            wide
          />
        </span>
      </div>

      <div className={props.supplierModalState >= 3 ? 'lineState--active' : 'lineState'} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={props.supplierModalState >= 3 ? 'circleState--active' : 'circleState'}>
          <Icon
            name="clipboard list"
            color={props.supplierModalState >= 3 ? 'blue' : 'grey'}
            size="big"
          />
        </div>
        <span className="circleHeader">
          Data Mapping{' '}
          <Popup
            content={renderSupplyHelpPopUp()}
            on="click"
            pinned
            trigger={<Icon name="question circle" size={'large'} color={'grey'} />}
            wide
          />
        </span>
      </div>

      <div className={props.supplierModalState >= 4 ? 'lineState--active' : 'lineState'} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={props.supplierModalState >= 4 ? 'circleState--active' : 'circleState'}>
          <Icon
            name="clipboard check"
            color={props.supplierModalState >= 4 ? 'blue' : 'grey'}
            size="big"
          />
        </div>
        <span className="circleHeader">
          Data Validation{' '}
          <Popup
            content={renderSupplyHelpPopUp()}
            on="click"
            pinned
            trigger={<Icon name="question circle" size={'large'} color={'grey'} />}
            wide
          />
        </span>
      </div>
    </div>
  );
};

export default SupplierModalState;
