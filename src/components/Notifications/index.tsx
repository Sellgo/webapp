import React from 'react';
import { Icon, Menu, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './index.scss';

const Notifications = () => {
  return (
    <Popup
      content={
        <div>
          <div className="title">
            <p>Notifications</p>
          </div>
        </div>
      }
      on="click"
      className="notifications"
      basic
      trigger={
        <Menu.Item as={Link}>
          <Icon name="bell" color={'black'} size={'large'} />
        </Menu.Item>
      }
    />
  );
};

export default Notifications;
