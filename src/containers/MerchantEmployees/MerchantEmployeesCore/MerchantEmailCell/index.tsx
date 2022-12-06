import React, { useState, memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
/* Interface */
import { RowCell } from '../../../../interfaces/Table';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { AppConfig } from '../../../../config';
import axios from 'axios';
import ActionButton from '../../../../components/ActionButton';

/* Interface */

const MerchantEmailCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const [isEmailVisible, setIsEmailVisible] = useState<boolean>(false);
  const [employeeEmails, setEmployeeEmails] = useState<any[]>([]);
  const [isFetchingEmails, setIsFetchingEmails] = useState<boolean>(false);
  const employeeId = rowData[dataKey] || '-';

  const fetchEmails = async () => {
    const sellerID = sellerIDSelector();
    // eslint-disable-next-line max-len
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/retrieve-employee-emails?id=${employeeId}`;
    const { data } = await axios.get(URL);
    setEmployeeEmails([...data]);
    setIsEmailVisible(true);
  };

  return (
    <Table.Cell {...props}>
      <div className={styles.merchantEmailCell}>
        {isEmailVisible ? (
          <p>{employeeEmails.length > 0 ? JSON.stringify(employeeEmails) : '-'}</p>
        ) : (
          <ActionButton
            variant={'primary'}
            type="purpleGradient"
            size={'md'}
            onClick={() => {
              setIsFetchingEmails(true);
              fetchEmails();
            }}
            loading={isFetchingEmails}
          >
            Show Email
          </ActionButton>
        )}
      </div>
    </Table.Cell>
  );
};

export default memo(MerchantEmailCell);
