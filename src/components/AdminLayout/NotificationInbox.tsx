import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Checkbox, Dimmer, Loader } from 'semantic-ui-react';

/* Components */
import Message from './Message';

/* Styles */
import styles from './NotificationInbox.module.scss';

/* Selectors */
import {
  selectNotificationsList,
  selectIncomingNotification,
  selectIsLoadingNotifications,
} from '../../selectors/NotificationInbox';

/* Actions */
import { toggleIncomingNotification, toggleMarkAllAsRead } from '../../actions/NotificationInbox';

interface Props {
  notificationsList: any;
  isIncomingNotification: boolean;
  isLoadingNotifications: boolean;
  toggleIncomingNotification: (payload: boolean) => void;
  toggleMarkAllAsRead: (payload: any[]) => void;
}

const NotificationInbox = (props: Props) => {
  const {
    isLoadingNotifications,
    notificationsList,
    isIncomingNotification,
    toggleIncomingNotification,
    toggleMarkAllAsRead,
  } = props;

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showOnlyUnread, setShowOnlyUnread] = useState<boolean>(false);

  const unreadNotifications = notificationsList?.filter(
    (notification: any) => !notification.is_read
  );

  const filterUnread = (notifications: any) => {
    const unreadNotifications = notifications?.filter((notification: any) => !notification.is_read);
    return showOnlyUnread ? unreadNotifications : notifications;
  };

  const sortByDate = (notifications: any) => {
    return notifications.sort((a: any, b: any) => Date.parse(b.cdate) - Date.parse(a.cdate));
  };

  const displayToday = (notifications: any) => {
    const todayNotifications = notifications.filter(
      (notification: any) =>
        new Date(notification.cdate).toDateString() === new Date().toDateString()
    );

    return sortByDate(filterUnread(todayNotifications));
  };

  const displayLatest = (notifications: any) => {
    const latestNotifications = notifications.filter((notification: any) => {
      for (let i = 1; i < 8; i++) {
        const cdate = new Date(notification.cdate);
        const today = new Date();
        today.setDate(today.getDate() - i);

        if (cdate.toDateString() === today.toDateString()) return true;
      }

      return false;
    });

    return sortByDate(filterUnread(latestNotifications));
  };

  const displayOlder = (notifications: any) => {
    const olderNotifications = notifications.filter((notification: any) => {
      for (let i = 0; i < 8; i++) {
        const cdate = new Date(notification.cdate);
        const today = new Date();
        today.setDate(today.getDate() - i);

        if (cdate.toDateString() === today.toDateString()) return false;
      }

      return true;
    });

    return sortByDate(filterUnread(olderNotifications));
  };

  useEffect(() => {
    if (unreadNotifications.length) {
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

  const handleMarkAllAsRead = () => {
    if (!unreadNotifications.length) return;

    const payload = unreadNotifications.map((msg: any) => ({
      id: msg.id,
      is_read: true,
    }));

    toggleMarkAllAsRead(payload);
  };

  return (
    <>
      <Button icon onClick={handleNotificationIconClick} className={styles.notificationIconBtn}>
        <Icon name="bell" className={styles.bellIcon} />
        {isIncomingNotification && <div className={styles.newNotificationDot} />}
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

          {displayToday(notificationsList).length ? (
            <div className={styles.latestContainer}>
              <div className={styles.latestHeader}>
                <h6>TODAY</h6>
                <button onClick={handleMarkAllAsRead}>Mark all as read</button>
              </div>

              {displayToday(notificationsList).map((message: any) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          ) : (
            ''
          )}

          {displayLatest(notificationsList).length ? (
            <div className={styles.latestContainer}>
              <div className={styles.latestHeader}>
                <h6>LATEST</h6>
              </div>

              {displayLatest(notificationsList).map((message: any) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          ) : (
            ''
          )}

          {displayOlder(notificationsList).length ? (
            <div className={styles.latestContainer}>
              <div className={styles.latestHeader}>
                <h6>OLDER</h6>
              </div>

              {displayOlder(notificationsList).map((message: any) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          ) : (
            ''
          )}
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
    toggleMarkAllAsRead: (payload: any[]) => dispatch(toggleMarkAllAsRead(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationInbox);
