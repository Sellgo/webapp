import React from 'react';
import { Table } from 'rsuite';
import { Button, Icon, Popup } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Utils */
import { parseKpiLists, removeSpecialChars, showNAIfZeroOrNull } from '../../../utils/format';
import { copyToClipboard } from '../../../utils/file';
import { success } from '../../../utils/notifications';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Components */
import CopyToClipboard from '../../CopyToClipboard';

/* Row cell, Appends $ sign infront of monetary cells */
const BrandsListCell = (props: RowCell) => {
  const { rowData, dataKey } = props;

  const brands = rowData[dataKey];

  const parsedBrands = parseKpiLists(brands);

  /* Copy Asins */
  const handleCopyBrands = (deliminator?: string) => {
    const prepareAsinStringCopy = removeSpecialChars(parsedBrands, deliminator);
    copyToClipboard(prepareAsinStringCopy).then(() => {
      success('ASINs successfully copied');
    });
  };

  return (
    <Table.Cell {...props}>
      <div className={styles.brandsListWrapper}>
        {parsedBrands.length > 0 ? (
          <>
            <CopyToClipboard
              displayData={showNAIfZeroOrNull(parsedBrands.length, parsedBrands.length)}
              data={removeSpecialChars(parsedBrands)}
              className={styles.brandsCount}
            />
            <Popup
              on="click"
              position="bottom left"
              offset="-40"
              closeOnDocumentClick
              closeOnEscape
              className={styles.actionsPopover}
              content={
                <>
                  <div className={styles.actionOptions}>
                    <p>BRANDS</p>

                    <button onClick={() => handleCopyBrands(',')}>
                      <Icon name="copy outline" />
                      <span>Copy Brands in rows with comma</span>
                    </button>

                    <button onClick={() => handleCopyBrands('\n')}>
                      <Icon name="copy outline" />
                      <span>Copy Brands in columns</span>
                    </button>
                  </div>
                </>
              }
              trigger={
                <Button
                  icon="chevron down"
                  className={`${styles.iconButton} iconButtonResetGlobal`}
                />
              }
            />
          </>
        ) : (
          <span>-</span>
        )}
      </div>
    </Table.Cell>
  );
};

export default BrandsListCell;
