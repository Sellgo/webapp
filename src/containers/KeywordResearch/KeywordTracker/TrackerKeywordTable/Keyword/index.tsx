import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Component */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';
import ActionsIcons from './ActionsIcons';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { truncateString } from '../../../../../utils/format';

/* Constants */
import { TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY } from '../../../../../constants/KeywordResearch/KeywordTracker';

const Keyword = (props: RowCell) => {
  const { rowData } = props;
  const { phrase, asin } = rowData;
  const keywordTrackId = rowData[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY];
  const isBoostTracked = rowData.is_boost;
  const boostExpiryDate = rowData.boost_expiry_date;
  const triggers = rowData.triggers;

  const countHoursBetweenDates = (expiryDateString: string) => {
    if (expiryDateString) {
      const expiryDate = new Date(expiryDateString);
      const currentDate = new Date();
      const diff = expiryDate.getTime() - currentDate.getTime();
      const hoursDiff = Math.ceil(diff / (1000 * 60 * 60));

      if (hoursDiff <= 1) {
        return '< 1';
      } else {
        return hoursDiff.toString();
      }
    } else {
      return '';
    }
  };

  return (
    <Table.Cell {...props}>
      <div className={styles.searchTermContainer}>
        <CopyAndLocateClipboard
          data={phrase}
          displayData={truncateString(phrase, 60)}
          link={`https://www.amazon.com/s?k=${phrase}`}
          className={styles.searchTerm}
          wrapperClassName={styles.searchTermWrapper}
        />

        <div className={styles.actionsRow}>
          {asin && (
            <CopyAndLocateClipboard
              data={asin}
              displayData={asin}
              link={`https://www.amazon.com/dp/${asin}/`}
              wrapperClassName={styles.asinWrapper}
              className={styles.asin}
            />
          )}
          <ActionsIcons
            isBoostTracked={isBoostTracked}
            keywordTrackId={keywordTrackId}
            boostExpiryDate={countHoursBetweenDates(boostExpiryDate)}
            triggers={triggers}
          />
        </div>
      </div>
    </Table.Cell>
  );
};

export default Keyword;
