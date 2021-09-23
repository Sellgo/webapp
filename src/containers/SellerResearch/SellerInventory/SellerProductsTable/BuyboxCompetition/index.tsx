import React from 'react';
import { Table } from 'rsuite';
import { Popup, Icon, Button } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Assets */
import { ReactComponent as CheckSellerIcon } from '../../../../../assets/images/userUnlockedIcon.svg';
import { ReactComponent as TrackProductIcon } from '../../../../../assets/images/fingerprint-4.svg';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const BuyboxCompetition = (props: RowCell) => {
  const { rowData } = props;

  const numOfSellers = rowData.num_sellers ? formatNumber(rowData.num_sellers) : false;

  const handleCheckSellers = () => {
    console.log('Check Sellers');
  };

  const handleExport = () => {
    console.log('Handle Export');
  };

  const handleTrackProduct = () => {
    console.log('Track Product');
  };

  return (
    <Table.Cell {...props}>
      <div className={styles.actionCellWrapper}>
        <div className={styles.actionCell}>
          <button
            className={styles.actionButton}
            onClick={handleCheckSellers}
            style={{
              color: numOfSellers ? '#3b4557' : '#636d76',
              fontWeight: numOfSellers ? 500 : 400,
            }}
          >
            {showNAIfZeroOrNull(numOfSellers, numOfSellers)}
          </button>
          <Popup
            on="click"
            position="bottom left"
            offset="-40"
            closeOnDocumentClick
            closeOnEscape
            className={styles.actionsPopover}
            trigger={
              <Button
                icon="chevron down"
                className={`${styles.iconButton} iconButtonResetGlobal`}
              />
            }
            content={
              <>
                <div className={styles.actionOptions}>
                  <p>Buybox Competition</p>
                  <button onClick={handleCheckSellers}>
                    <CheckSellerIcon />
                    <span>Check Sellers</span>
                  </button>

                  <button onClick={handleExport}>
                    <Icon name="download" />
                    <span>Export</span>
                  </button>

                  <button onClick={handleTrackProduct}>
                    <TrackProductIcon />
                    <span>Track Product</span>
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>
    </Table.Cell>
  );
};

export default BuyboxCompetition;
