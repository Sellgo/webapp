import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Checkbox, Dimmer, Loader } from 'semantic-ui-react';

/* Components */
import Message from './Message';

/* Hooks */
import useClickOutside from '../../hooks/useClickOutside';

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
  toggleMarkAllAsRead,
  fetchNotifications,
} from '../../actions/NotificationInbox';

interface Props {
  notificationsList: any;
  isIncomingNotification: boolean;
  isLoadingNotifications: boolean;
  toggleIncomingNotification: (payload: boolean) => void;
  toggleMarkAllAsRead: (payload: any[]) => void;
  fetchNotifications: (payload: number) => void;
}

const NotificationInbox = (props: Props) => {
  const {
    isLoadingNotifications,
    notificationsList,
    isIncomingNotification,
    toggleIncomingNotification,
    toggleMarkAllAsRead,
    fetchNotifications,
  } = props;

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showOnlyUnread, setShowOnlyUnread] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastElement, setLastElement] = useState<any>(0);

  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => {
    setShowNotifications(false);
  });

  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage(prev => prev + 1);
      }
    })
  );

  const unreadNotifications = notificationsList?.results?.filter(
    (notification: any) => !notification.is_read
  );

  const filterUnread = (notifications: any) => {
    const unreadNotifications = notifications?.filter((notification: any) => !notification.is_read);
    return showOnlyUnread ? unreadNotifications : notifications;
  };

  const sortByDate = (notifications: any) => {
    return notifications?.sort((a: any, b: any) => Date.parse(b.cdate) - Date.parse(a.cdate));
  };

  const displayToday = (notifications: any) => {
    const todayNotifications = notifications?.filter(
      (notification: any) =>
        new Date(notification.cdate).toDateString() === new Date().toDateString()
    );

    return sortByDate(filterUnread(todayNotifications));
  };

  const displayLatest = (notifications: any) => {
    const latestNotifications = notifications?.filter((notification: any) => {
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
    const olderNotifications = notifications?.filter((notification: any) => {
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
    if (unreadNotifications?.length) {
      toggleIncomingNotification(true);
    } else {
      toggleIncomingNotification(false);
    }
  }, [isIncomingNotification, notificationsList?.results]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    if (page <= notificationsList?.total_pages) {
      fetchNotifications(page);
    }
  }, [page]);

  const handleNotificationIconClick = () => {
    setShowNotifications(prev => !prev);
  };

  const handleShowOnlyUnread = () => {
    setShowOnlyUnread(prev => !prev);
  };

  const handleMarkAllAsRead = () => {
    if (!unreadNotifications?.length) return;

    const payload = unreadNotifications?.map((msg: any) => ({
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
        <div ref={wrapperRef} className={styles.notificationContainer}>
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

          {displayToday(notificationsList?.results)?.length ? (
            <div className={styles.latestContainer}>
              <div className={styles.latestHeader}>
                <h6>TODAY</h6>
                <button onClick={handleMarkAllAsRead}>Mark all as read</button>
              </div>

              {displayToday(notificationsList?.results).map((message: any) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          ) : (
            ''
          )}

          {displayLatest(notificationsList?.results)?.length ? (
            <div className={styles.latestContainer}>
              <div className={styles.latestHeader}>
                <h6>LATEST</h6>
                {!displayToday(notificationsList?.results)?.length && (
                  <button onClick={handleMarkAllAsRead}>Mark all as read</button>
                )}
              </div>

              {displayLatest(notificationsList?.results).map((message: any) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          ) : (
            ''
          )}

          {displayOlder(notificationsList?.results)?.length ? (
            <div className={styles.latestContainer}>
              <div className={styles.latestHeader}>
                <h6>OLDER</h6>
                {!displayToday(notificationsList?.results)?.length &&
                  !displayLatest(notificationsList?.results)?.length && (
                    <button onClick={handleMarkAllAsRead}>Mark all as read</button>
                  )}
              </div>

              {displayOlder(notificationsList?.results).map((message: any) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          ) : (
            ''
          )}
          {page <= notificationsList?.total_pages && (
            <div style={{ height: '3em' }} ref={setLastElement} />
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
    fetchNotifications: (payload: number) => dispatch(fetchNotifications(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationInbox);
