import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* Components */
import RestockLimitCard from '../RestockLimitCard';
import ActionButton from '../../../../../components/ActionButton';

/* Styles */
import styles from './index.module.scss';

/* Constants */
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { AppConfig } from '../../../../../config';
import { error, success } from '../../../../../utils/notifications';
import Placeholder from '../../../../../components/Placeholder';

const RestockLimitCore = () => {
  const [restockLimits, setRestockLimits] = useState<any[]>([]);
  const [updatedRestockThresholds, setUpdatedRestockThresholds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sellerID = window.localStorage.getItem('userId');

  const fetchRestockLimits = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/restock-limits`
      );

      if (data && data.length > 0) {
        setRestockLimits(data);
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchRestockLimits();
  }, []);

  const handleSave = async () => {
    try {
      if (!updatedRestockThresholds.length) return;
      setIsLoading(true);

      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/restock-limits`;

      const { status, data } = await axios.patch(url, { restock_limits: updatedRestockThresholds });

      if (status === 200) {
        const updatedRestockLimits: any[] = restockLimits;

        for (let i = 0; i < updatedRestockLimits.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (updatedRestockLimits[i].id === data[j].id) {
              updatedRestockLimits[i] = data[j];
            }
          }
        }

        setRestockLimits(updatedRestockLimits);
        setIsLoading(false);
        success('Restock limits successfully saved');
      }
    } catch (err) {
      error('Failed to update restock limits');
      console.error(err);
    }
  };

  return (
    <div className={styles.restockLimitContainer}>
      {isLoading && <Placeholder numberRows={5} numberParagraphs={1} />}

      <div className={styles.restockLimits}>
        {restockLimits?.length
          ? restockLimits.map((restockLimit) => (
              <RestockLimitCard
                key={restockLimit.id}
                restockLimit={restockLimit}
                setUpdatedRestockThresholds={setUpdatedRestockThresholds}
                updatedRestockThresholds={updatedRestockThresholds}
              />
            ))
          : null}
      </div>

      <ActionButton
        className={styles.applyButton}
        variant="secondary"
        type="purpleGradient"
        size="md"
        onClick={handleSave}
        disabled={false}
      >
        Apply
      </ActionButton>
    </div>
  );
};

export default RestockLimitCore;
