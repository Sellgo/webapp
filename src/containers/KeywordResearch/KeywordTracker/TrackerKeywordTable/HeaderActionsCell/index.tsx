import React, { memo } from 'react';
import { Icon } from 'semantic-ui-react';
import { copyToClipboard } from '../../../../../utils/file';
import { success } from '../../../../../utils/notifications';

/* Styling */
import styles from './index.module.scss';

interface Props {
  checkedRows: any[];
}

const HeaderActionsCell = (props: Props) => {
  const { checkedRows } = props;

  const totalCheckedRows = checkedRows && checkedRows.length;

  /* ============== COPY KEYWORDS ACTIONS *================ */
  const disableCopy = totalCheckedRows === 0;

  const handleCopyKeywords = async (delimiter = ',') => {
    const allKeywords =
      checkedRows &&
      checkedRows.map((row: any) => {
        return row.phrase;
      });

    await copyToClipboard(allKeywords.join(delimiter));
    success('Keyword successfully copied');
  };

  return (
    <div className={styles.actionCellContent}>
      {/* Copy Keywords */}
      <button disabled={disableCopy} onClick={() => handleCopyKeywords(',')}>
        <Icon name="copy outline" />
        Copy keywords in row
      </button>

      <button disabled={disableCopy} onClick={() => handleCopyKeywords('\n')}>
        <Icon name="copy outline" />
        Copy keywords in columns
      </button>
    </div>
  );
};

export default memo(HeaderActionsCell);
