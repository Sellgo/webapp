import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Checkbox, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';

/* Styles */
import styles from './NotificationInbox.module.scss';

/* Selectors */
import {
  selectNotificationsList,
  selectIncomingNotification,
  selectIsLoadingNotifications,
} from '../../selectors/NotificationInbox';

/* Actions */
import {
  toggleIncomingNotification,
  toggleMarkAsRead,
  toggleMarkAllAsRead,
} from '../../actions/NotificationInbox';

interface Props {
  notificationsList: any;
  isIncomingNotification: boolean;
  isLoadingNotifications: boolean;
  toggleIncomingNotification: (payload: boolean) => void;
  toggleMarkAsRead: (payload: number) => void;
  toggleMarkAllAsRead: (payload: any[]) => void;
}

const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

const getFormattedDate = (date: string) => {
  return date ? moment(date).fromNow() : '';
};

const NotificationInbox = (props: Props) => {
  const {
    isLoadingNotifications,
    notificationsList,
    isIncomingNotification,
    toggleIncomingNotification,
    toggleMarkAsRead,
    toggleMarkAllAsRead,
  } = props;

  console.log(notificationsList, 'notificationsList');

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showOnlyUnread, setShowOnlyUnread] = useState<boolean>(false);

  useEffect(() => {
    if (unreadMessages.length) {
      toggleIncomingNotification(true);
    } else {
      toggleIncomingNotification(false);
    }
  }, [isIncomingNotification, notificationsList]);

  const handleNotificationIconClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleShowOnlyUnread = () => {
    setShowOnlyUnread((prev) => !prev);
  };

  const handleMarkAsRead = (id: number) => {
    toggleMarkAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    // if (!unreadMessages.length) return;

    const payload = notificationsList.map((msg: any) => ({
      id: msg.id,
      is_read: false,
    }));

    toggleMarkAllAsRead(payload);
  };

  const unreadMessages = notificationsList?.filter((notification: any) => !notification.is_read);

  const filteredMessages = showOnlyUnread ? unreadMessages : notificationsList;

  const sortedByDateMessages = filteredMessages.sort(
    (a: any, b: any) => Date.parse(b.cdate) - Date.parse(a.cdate)
  );

  return (
    <>
      <Button icon onClick={handleNotificationIconClick} className={styles.notificationIconBtn}>
        <Icon name="bell" className={styles.bellIcon} />
        {isIncomingNotification && <div className={styles.newNotificationDot}></div>}
      </Button>

      {showNotifications ? (
        <div className={styles.notificationContainer}>
          <Dimmer active={isLoadingNotifications} inverted>
            <Loader active />
          </Dimmer>

          <div className={styles.headerWrapper}>
            <h5 className={styles.notificationHeader}>Notifications</h5>
            <div className={styles.readToggle}>
              <p>Only show unread</p>{' '}
              <Checkbox toggle onChange={handleShowOnlyUnread} checked={showOnlyUnread} />
            </div>
          </div>

          <div className={styles.latestContainer}>
            <div className={styles.latestHeader}>
              <h6>LATEST</h6>
              <button onClick={handleMarkAllAsRead}>Mark all as read</button>
            </div>

            {sortedByDateMessages?.length
              ? sortedByDateMessages.map((notification: any) => (
                  <div
                    className={styles.messageContainer}
                    onClick={() => handleMarkAsRead(notification.id)}
                    key={notification.id}
                  >
                    <div className={styles.picture}>
                      {notification?.image_url ? (
                        <img src={notification.image_url} alt={notification?.webapp_message} />
                      ) : (
                        <div className={styles.imagePlaceholder}></div>
                      )}
                    </div>

                    <div className={styles.message}>
                      <p className={styles.messageText}>
                        {truncate(notification?.webapp_message, 90)}
                        <span className={styles.date}>{getFormattedDate(notification?.cdate)}</span>
                      </p>

                      <div className={styles.skuContainer}>
                        {notification?.severity ? (
                          <div className={styles.severityContainer}>
                            <div
                              className={`${styles.severityDot} ${styles?.[notification.severity]}`}
                            ></div>
                            <div className={styles.severityText}>{notification.severity}</div>
                          </div>
                        ) : (
                          '-'
                        )}

                        <div>{notification?.sku || '-'}</div>
                        <div>{notification?.asin || '-'}</div>
                        <div>{notification?.order_number || '-'}</div>
                      </div>
                    </div>

                    <div
                      className={`${styles.read} ${!notification.is_read ? styles.readDot : ''}`}
                    ></div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    notificationsList: selectNotificationsList(state),
    isIncomingNotification: selectIncomingNotification(state),
    isLoadingNotifications: selectIsLoadingNotifications(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleIncomingNotification: (payload: boolean) => dispatch(toggleIncomingNotification(payload)),
    toggleMarkAsRead: (payload: number) => dispatch(toggleMarkAsRead(payload)),
    toggleMarkAllAsRead: (payload: any[]) => dispatch(toggleMarkAllAsRead(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationInbox);
