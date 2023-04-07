import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image, Placeholder, Icon } from 'semantic-ui-react';

// Styles
import styles from './index.module.scss';

// Components
import ActionButton from '../../../components/ActionButton';

// Selectors
import { sellerIDSelector } from '../../../selectors/Seller';

// Config
import { AppConfig } from '../../../config';
import { error, success } from '../../../utils/notifications';
import ValidCheckIcon from '../../../components/Icons/ValidCheckIcon';
import UserMagnifyingIcon from '../../../components/Icons/UserMagnifyingIcon';
import UserRequestIcon from '../../../components/Icons/UserRequestIcon';
import ContactDetailInformation from './ContactDetailInformation';

interface Props {
  rowData?: any;
  setCurrentData: (a: any) => void;
}
const EmployeesInformation = (props: Props) => {
  const { rowData, setCurrentData } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRetriveCompanyLoading, setIsRetriveCompanyLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [employeesData, setEmployeesData] = useState<any>(null);
  const [activeEmployeeIndex, setActiveEmployeeIndex] = useState<number>(-1);
  console.log(open, activeEmployeeIndex);
  const fetchEmployeesInformation = async () => {
    try {
      const sellerId = sellerIDSelector();
      // eslint-disable-next-line max-len
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants-employees?page=1&ordering=id&merchant_id=${rowData.merchant_id}&marketplace_id=${rowData.marketplace_id}`;

      const { data, status } = await axios.get(URL);

      if (data) {
        setEmployeesData(data.results);
      }

      if (status === 429) {
        error(data.message);
      }
    } catch (err) {
      console.error('Error fetching employees', err);
      const { response } = err as any;
      const { status, data } = response;

      if (status === 429) {
        error(data.message);
      }
    }
    setIsLoading(false);
  };
  const retriveCompanyInformation = async () => {
    setIsRetriveCompanyLoading(true);
    try {
      const sellerId = sellerIDSelector();
      // eslint-disable-next-line max-len
      const formData = new FormData();
      formData.append('merchant_id', `${rowData.merchant_id}`);

      formData.append('object_id', `${rowData.id}`);
      formData.append('marketplace_id', `${rowData.marketplace_id}`);
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/company-contact-request`;

      const { data } = await axios.post(URL, formData);
      if (data) {
        if (data.company_info) {
          const retrivedData = {
            ...data.company_info,
            is_contact_requested: true,
          };
          setCurrentData({
            ...rowData,
            company_info: retrivedData,
          });
        }
        success('Company Details unlocked successfully');
      }
    } catch (err) {
      error('Cannot unlock details at the moment');
      console.error('Error fetching employees', err);
    }
    setIsRetriveCompanyLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchEmployeesInformation();
  }, []);

  return (
    <>
      <div className={styles.ContactInformationBox}>
        <div className={styles.informationHeading}>CONTACT INFO</div>
        <div className={styles.employeeInformationDetailsBox}>
          <div className={styles.employeeInformationDetails}>
            {isLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
            {!isLoading &&
              employeesData &&
              employeesData.length > 0 &&
              employeesData.map((emploeeData: any, index: number) => {
                const {
                  first_name,
                  last_name,
                  title,
                  teaser,
                  is_looked_up,
                  emails,
                  phones,
                  location,
                } = emploeeData;
                return (
                  <Card
                    className={styles.employeeInformationDetails__card}
                    key={`employeeData-${index}`}
                  >
                    <Card.Content className={styles.employeeInformationDetails__card__content}>
                      <div className={styles.employeeInformationDetails__card__description}>
                        <Image
                          floated="left"
                          size="mini"
                          src={require(`../../../assets/images/avatarPlaceholder.svg`)}
                          className={styles.employeeInformationDetails__card__description__image}
                        />
                        <Card.Header className={styles.employeeInformationDetails__card__header}>
                          {first_name} {last_name}{' '}
                          <div className={styles.employeeInformationDetails__card__contact}>
                            <Icon name="mail" disabled={!is_looked_up} color="grey" />
                            <p>{emails?.length ?? teaser?.emails?.length}</p>{' '}
                            <div className={styles.phoneIcon}>
                              <Icon
                                flipped="horizontally"
                                name="phone"
                                disabled={!is_looked_up}
                                color="grey"
                              />{' '}
                              {phones?.length ?? teaser?.phones?.length}
                            </div>
                          </div>
                        </Card.Header>
                        <Card.Meta className={styles.employeeInformationDetails__card__meta}>
                          {title}
                        </Card.Meta>
                        <Card.Meta className={styles.employeeInformationDetails__card__meta}>
                          <Icon name="map marker alternate" size="small" color="grey" />{' '}
                          <span className={styles.location}>{location}</span>
                        </Card.Meta>
                      </div>
                      <div className={styles.employeeInformationDetails__card__button}>
                        <ActionButton
                          variant="primary"
                          type={is_looked_up ? 'black' : 'purpleGradient'}
                          size="small"
                          onClick={() => {
                            setActiveEmployeeIndex(index);
                            setOpen(true);
                          }}
                          // className={styles.continueButton}
                        >
                          {is_looked_up ? (
                            <div className={styles.continueButton}>
                              <ValidCheckIcon fill="#3CF7AF" /> View
                            </div>
                          ) : (
                            <div className={styles.continueButton}>
                              <UserMagnifyingIcon fill="#fff" /> Get info
                            </div>
                          )}
                        </ActionButton>
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}
            {!isLoading && employeesData && employeesData.length === 0 && (
              <Card className={styles.employeeInformationDetails__noDataFoundCard}>
                <Card.Content
                  className={styles.employeeInformationDetails__noDataFoundCard__content}
                >
                  <Card.Header
                    className={styles.employeeInformationDetails__noDataFoundCard__header}
                  >
                    No Contact Found
                  </Card.Header>
                  <Card.Meta className={styles.employeeInformationDetails__noDataFoundCard__meta}>
                    *We add new contacts every week and will notify you when it is available
                  </Card.Meta>
                  <Card.Meta>
                    <ActionButton
                      variant="primary"
                      type={
                        rowData?.company_info?.is_contact_requested || rowData?.is_contact_requested
                          ? 'grey'
                          : 'black'
                      }
                      size="small"
                      onClick={() => {
                        retriveCompanyInformation();
                      }}
                      className={styles.continueButton}
                      loading={isRetriveCompanyLoading}
                      disabled={
                        rowData?.company_info?.is_contact_requested || rowData?.is_contact_requested
                      }
                    >
                      <div className={styles.continueButton}>
                        <UserRequestIcon fill="#FFF" /> Request
                      </div>
                    </ActionButton>
                  </Card.Meta>
                </Card.Content>
              </Card>
            )}
          </div>
          <div className={styles.contactDetailsInformation}>
            {activeEmployeeIndex >= 0 && (
              <ContactDetailInformation
                employeeData={employeesData[activeEmployeeIndex]}
                activeEmployeeIndex={activeEmployeeIndex}
                setEmployeeData={setEmployeesData}
                rowData={rowData}
                setCurrentData={setCurrentData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesInformation;
