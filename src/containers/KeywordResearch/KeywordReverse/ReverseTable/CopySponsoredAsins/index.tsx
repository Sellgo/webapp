import React from 'react';
import { Table } from 'rsuite';
import { Button, Icon, Popup } from 'semantic-ui-react';
import numeral from 'numeral';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { parseKpiLists, removeSpecialChars } from '../../../../../utils/format';
import { copyToClipboard } from '../../../../../utils/file';
import { success } from '../../../../../utils/notifications';
import CopyToClipboard from '../../../../../components/CopyToClipboard';

type Props = RowCell;

const CopySponsoredAsins = (props: Props) => {
  const { ...otherProps } = props;

  const { rowData } = otherProps;

  const asinList = rowData.sponsored_asins_list;
  const parsedAsinList = parseKpiLists(asinList);

  /* Copy Asins */
  const handleCopyAsins = (deliminator?: string) => {
    const prepareAsinStringCopy = removeSpecialChars(parsedAsinList, deliminator);
    copyToClipboard(prepareAsinStringCopy).then(() => {
      success('ASINs successfully copied');
    });
  };

  return (
    <>
      <Table.Cell {...otherProps}>
        <div className={styles.actionCellWrapper}>
          <div className={styles.actionCell}>
            <CopyToClipboard
              displayData={numeral(parsedAsinList.length).format('00')}
              data={removeSpecialChars(parsedAsinList, ',')}
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
                    <p>ASIN</p>
                    <button onClick={() => handleCopyAsins(',')} disabled={!parsedAsinList.length}>
                      <Icon name="copy outline" />
                      <span>Copy ASINs in rows</span>
                    </button>

                    <button onClick={() => handleCopyAsins('\n')} disabled={!parsedAsinList.length}>
                      <Icon name="copy outline" />
                      <span>Copy ASINs in columns</span>
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
          </div>
        </div>
      </Table.Cell>
    </>
  );
};

export default CopySponsoredAsins;
