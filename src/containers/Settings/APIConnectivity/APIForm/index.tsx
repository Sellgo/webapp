import React, { useState } from 'react';
import { Form, Icon, Confirm, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

/* Constants */
import { API_TYPES_LIST, API_TYPES } from '../../../../constants/Settings/apiKeys';

/* Utils*/
import { error, success } from '../../../../utils/notifications';
import { AppConfig } from '../../../../config';

/* Styles */
import styles from './index.module.scss';

/* Components */
import OrangeButton from '../../../../components/OrangeButton';
import ActionButton from '../../../../components/ActionButton';

/* Types */
import { ApiType } from '../../../../interfaces/Settings/apiKeys';

/* Assets */
import KeyIcon from '../../../../assets/images/key-regular.svg';

const trigger = (
  <>
    <div className={styles.dropdownTrigger}>
      <img src={API_TYPES_LIST[0].icon} alt={API_TYPES_LIST[0].name} />
      <span>{API_TYPES_LIST[0].name}</span>
    </div>
  </>
);

const APIForm = () => {
  const [apiKeyId, setApiKeyId] = useState<number>();
  const [apiType, setApiType] = useState<string>(API_TYPES_LIST[0].value);
  const [apiName, setApiName] = useState<string>('');
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isEditingName, setEditingName] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const sellerID = localStorage.getItem('userId');

  React.useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${AppConfig.BASE_URL_API}sellers/${sellerID}/api-key`);
        if (res.data.api_key_id) {
          setApiKeyId(res.data.api_key_id);
          setApiName(res.data.name);
          setIsNew(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchApiKeys();
  }, []);

  const handleApiUpdate = async () => {
    setLoading(true);
    if (apiType === API_TYPES.ZAPIER.value) {
      if (isNew && !apiKeyId) {
        /* Create new API KEY */
        try {
          const data = { name: apiName };
          const res = await axios.post(
            `${AppConfig.BASE_URL_API}sellers/${sellerID}/api-key`,
            data
          );

          if (res.status === 200) {
            setApiKeyId(res.data.api_key_id);
            setApiName(res.data.name);
            setIsNew(false);
            success('Successfully created new API key.');
          } else {
            error('Failed to create API key.');
          }
        } catch (err) {
          console.error(err);
          error('Failed to create API key.');
        }
        success('Successfully created new API key.');
      } else {
        /* Update existing API KEY */
        try {
          const data = { name: apiName, api_key_id: apiKeyId };
          const res = await axios.patch(
            `${AppConfig.BASE_URL_API}sellers/${sellerID}/api-key`,
            data
          );

          if (res.status === 200) {
            setApiKeyId(res.data.api_key_id);
            setApiName(res.data.name);
            setIsNew(false);
            setEditingName(false);
            success('Successfully updated API key.');
          } else {
            error('Failed to update API key.');
          }
        } catch (err) {
          console.error(err);
          error('Failed to update API key.');
        }
      }
    }
    setLoading(false);
  };

  const handleApiDelete = async () => {
    setLoading(true);
    if (apiType === API_TYPES.ZAPIER.value) {
      try {
        const data = { api_key_id: apiKeyId, status: 'inactive' };
        const res = await axios.patch(`${AppConfig.BASE_URL_API}sellers/${sellerID}/api-key`, data);
        if (res.status === 200) {
          setIsNew(true);
          setApiName('');
          success('Successfully deleted API key.');
        } else {
          error('Failed to delete API key.');
        }
      } catch (err) {
        console.log(err);
        error('Failed to delete API key.');
      }
    }
    setLoading(false);
  };

  return (
    <section>
      <Form className={`${styles.apiFormGrid} apiForm`}>
        <Dimmer blurring inverted active={isLoading}>
          <Loader />
        </Dimmer>
        <Icon
          name="trash alternate"
          className={
            isNew ? `${styles.deleteIcon} ${styles.deleteIcon__disabled}` : styles.deleteIcon
          }
          onClick={() => setDeleteConfirmation(true)}
        />
        <div className={`${styles.formInput}`}>
          <label className={styles.formLabel}> 3rd Party API </label>
          <Dropdown className={styles.dropdown} floating scrolling trigger={trigger}>
            <Dropdown.Menu className={styles.dropdownMenu}>
              {API_TYPES_LIST.map((option: ApiType) => {
                return (
                  <Dropdown.Item
                    key={option.value}
                    value={option.value}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setApiType(option.value);
                    }}
                  >
                    <img src={option.icon} alt={option.value} />
                    <span>{option.name}</span>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {!isNew && !isEditingName && (
          <div className={`${styles.formInput} ${styles.formInput__name}`}>
            <p className={styles.formLabel}> Name </p>
            <p className={styles.formValue}>
              {apiName}
              <Icon
                name="pencil"
                className={`${styles.pencilIcon}`}
                onClick={() => setEditingName(!isEditingName)}
              />
            </p>
          </div>
        )}
        {(isNew || isEditingName) && (
          <Form.Input
            className={`${styles.formInput} ${styles.formInput__name}`}
            label={
              <div className={styles.formLabel}>
                <span>Name &nbsp;</span>
              </div>
            }
            placeholder="My API Key"
            value={apiName}
            name="token"
            onChange={(e, { value }) => setApiName(value)}
          />
        )}
        {!isNew && (
          <div className={styles.formInput}>
            <p className={styles.formLabel}> API Key ID </p>
            <p className={styles.formValue}>{apiKeyId}</p>
          </div>
        )}
        {!isNew && (
          <div className={`${styles.formInput} ${styles.formInput__key}`}>
            <p className={styles.formLabel}> API Key</p>
            <p className={`${styles.formValue} ${styles.formValue__key}`}>
              <img src={KeyIcon} alt="key-icon" />
              **** **** **** ****
            </p>
          </div>
        )}
        <div className={styles.buttonsRow}>
          {isEditingName && (
            <ActionButton onClick={() => setEditingName(false)} variant="reset" size="md">
              Cancel
            </ActionButton>
          )}
          <OrangeButton
            type="blue"
            size="small"
            onClick={handleApiUpdate}
            className={
              !isNew && !isEditingName
                ? `${styles.updateButton} ${styles.updateButton__disabled}`
                : styles.updateButton
            }
          >
            {' '}
            {isNew ? 'Create' : 'Update'}
          </OrangeButton>
        </div>
      </Form>
      <Confirm
        content="Do you want to delete your API key?"
        open={deleteConfirmation}
        onCancel={() => setDeleteConfirmation(false)}
        onConfirm={() => {
          setDeleteConfirmation(false);
          handleApiDelete();
        }}
      />
    </section>
  );
};

export default APIForm;
