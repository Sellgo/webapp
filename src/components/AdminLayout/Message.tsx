import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

/* Styles */
import styles from './Message.module.scss';

/* Actions */
import { toggleMarkAsRead } from '../../actions/NotificationInbox';

interface Props {
  message: any;
  toggleMarkAsRead: (payload: number) => void;
}

const truncate = (str: string, n: number) => {
  return str?.length > n ? str.slice(0, n - 1) + '...' : str;
};

const getFormattedDate = (date: string) => {
  return date ? moment(date).fromNow() : '';
};

const Message = (props: Props) => {
  const { message, toggleMarkAsRead } = props;

  const handleMarkAsRead = (id: number) => {
    toggleMarkAsRead(id);
  };

  return (
    <div
      className={styles.messageContainer}
      onClick={() => handleMarkAsRead(message.id)}
      key={message.id}
    >
      <div className={styles.picture}>
        {message?.image_url ? (
          <img src={message.image_url} alt={message?.message} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      <div className={styles.message}>
        <p className={styles.messageText}>
          {truncate(message?.message, 90)}
          <span className={styles.date}>{getFormattedDate(message?.cdate)}</span>
        </p>

        <div className={styles.skuContainer}>
          {message?.severity ? (
            <div className={styles.severityContainer}>
              <div className={`${styles.severityDot} ${styles?.[message.severity]}`} />
              <div className={styles.severityText}>{message.severity}</div>
            </div>
          ) : (
            '-'
          )}

          <div>{message?.sku || '-'}</div>
          <div>{message?.asin || '-'}</div>
          <div>{message?.order_number || '-'}</div>
        </div>
      </div>

      <div className={`${styles.read} ${!message.is_read ? styles.readDot : ''}`} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleMarkAsRead: (payload: number) => dispatch(toggleMarkAsRead(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Message);
