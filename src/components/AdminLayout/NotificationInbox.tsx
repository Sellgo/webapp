import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Checkbox } from 'semantic-ui-react';

/* Styles */
import styles from './NotificationInbox.module.scss';

/* Selector */
import {
  selectNotificationsList,
  selectIsNewIncomingNotification,
} from '../../selectors/NotificationInbox';

interface Props {
  notificationsList: any;
  isNewIncomingNotification: boolean;
}

const NotificationInbox = (props: Props) => {
  const { notificationsList, isNewIncomingNotification } = props;

  console.log(notificationsList, isNewIncomingNotification, 'notificationsList');

  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const handleIconClick = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <div>
      <Button icon onClick={handleIconClick} style={{ background: 'none', marginRight: '0.5em' }}>
        <Icon name="bell" className={styles.bellIcon} />
        {isNewIncomingNotification && <Icon corner name="add" />}
      </Button>
      {showNotifications && (
        <div className={styles.notificationContainer}>
          <div className={styles.headerWrapper}>
            <h5 className={styles.notificationHeader}>Notifications</h5>
            <div className={styles.readToggle}>
              <span>Only show unread</span> <Checkbox toggle />
            </div>
          </div>

          <div className={styles.latestContainer}>
            <div className={styles.latestHeader}>
              <p>LATEST</p>
              <p>Mark all as read</p>
            </div>

            {notificationsList?.length &&
              notificationsList.map((notification: any) => (
                <div className={styles.messageContainer}>
                  <div className={styles.picture}></div>
                  <div className={styles.message}>
                    <div className={styles.messageText}>
                      {notification.message}{' '}
                      <span className={styles.date}>{notification.date}</span>
                    </div>
                    <div className={styles.skuContainer}>
                      <div>{notification.sku_name}</div>
                      <div>{notification.asin}</div>
                      <div>{notification.order_name}</div>
                    </div>
                  </div>

                  <div className={!notification.read ? styles.read : ''}></div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    notificationsList: selectNotificationsList(state),
    isNewIncomingNotification: selectIsNewIncomingNotification(state),
  };
};

export default connect(mapStateToProps)(NotificationInbox);
