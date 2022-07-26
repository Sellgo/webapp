import * as React from 'react';
import { Button, Icon, Checkbox } from 'semantic-ui-react';

import styles from './NotificationInbox.module.scss';

const NotificationInbox = () => {
  const [showNotifications, setShowNotifications] = React.useState<boolean>(false);

  const handleIconClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const data = [
    {
      message: 'Adipisicing velit incidunt impedit dolor accusamus.',
      status: 'info',
      read: false,
      sku_name: 'sku name',
      asin: 'asin',
      order_name: 'order name',
      date: '2 days ago',
    },
    {
      message: 'Adipisicing velit incidunt impedit dolor accusamus.',
      status: 'info',
      read: false,
      sku_name: 'sku name',
      asin: 'asin',
      order_name: 'order name',
      date: '2 days ago',
    },
    {
      message: 'Adipisicing velit incidunt impedit dolor accusamus.',
      status: 'info',
      read: true,
      sku_name: 'sku name',
      asin: 'asin',
      order_name: 'order name',
      date: '2 days ago',
    },
    {
      message: 'Adipisicing velit incidunt impedit dolor accusamus.',
      status: 'info',
      read: false,
      sku_name: 'sku name',
      asin: 'asin',
      order_name: 'order name',
      date: '2 days ago',
    },
    {
      message: 'Adipisicing velit incidunt impedit dolor accusamus.',
      status: 'info',
      read: false,
      sku_name: 'sku name',
      asin: 'asin',
      order_name: 'order name',
      date: '2 days ago',
    },
    {
      message: 'Adipisicing velit incidunt impedit dolor accusamus.',
      status: 'info',
      read: false,
      sku_name: 'sku name',
      asin: 'asin',
      order_name: 'order name',
      date: '2 days ago',
    },
    {
      message: 'Adipisicing velit incidunt impedit dolor accusamus.',
      status: 'info',
      read: false,
      sku_name: 'sku name',
      asin: 'asin',
      order_name: 'order name',
      date: '2 days ago',
    },
  ];

  return (
    <div>
      <Button icon onClick={handleIconClick} style={{ background: 'none', marginRight: '0.5em' }}>
        <Icon name="bell" className={styles.bellIcon} />
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

            {data.length &&
              data.map((notification) => (
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

export default NotificationInbox;
