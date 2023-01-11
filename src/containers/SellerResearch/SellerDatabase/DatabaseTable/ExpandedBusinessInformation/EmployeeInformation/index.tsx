import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image, Modal, Placeholder, Icon } from 'semantic-ui-react';

// Styles
import styles from './index.module.scss';

// Components
import ActionButton from '../../../../../../components/ActionButton';

// Selectors
import { sellerIDSelector } from '../../../../../../selectors/Seller';

// Config
import { AppConfig } from '../../../../../../config';
import EmployeeDetailInformation from '../EmployeeDetailInformation';
import { setCompanyInfo } from '../../../../../../actions/SellerResearch/SellerDatabase';
import { connect } from 'react-redux';
import { error, success } from '../../../../../../utils/notifications';

interface Props {
  rowData?: any;
  className: string;
  setCompanyInfo: (a: any, b: string) => void;
}
const EmployeesInformation = (props: Props) => {
  const { rowData, className, setCompanyInfo } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRetriveCompanyLoading, setIsRetriveCompanyLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [employeesData, setEmployeesData] = useState<any>(null);
  const [activeEmployeeIndex, setActiveEmployeeIndex] = useState<number>(-1);
  const fetchEmployeesInformation = async () => {
    try {
      const sellerId = sellerIDSelector();
      // eslint-disable-next-line max-len
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants-employees?page=1&ordering=id&merchant_id=${rowData.merchant_id}`;

      const { data } = await axios.get(URL);

      if (data) {
        setEmployeesData(data.results);
      }
    } catch (err) {
      console.error('Error fetching employees', err);
    }
    setIsLoading(false);
  };
  const retriveCompanyInformation = async () => {
    setIsRetriveCompanyLoading(true);
    try {
      const sellerId = sellerIDSelector();
      // eslint-disable-next-line max-len
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/retrieve-employee-detail?merchant_id=${rowData.merchant_id}&id=${rowData.id}&marketplace_id=${rowData.marketplace_id}`;

      const { data } = await axios.get(URL);

      if (data) {
        if (data.company_info) {
          setCompanyInfo(data.company_info, rowData.merchant_id);
        }
        success('Details unlocked successfully');
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
      <div className={className}>
        <p className={styles.informationHeading}>
          Top decision makers from {rowData?.business_name}
        </p>
        <div className={styles.employeeInformationDetails}>
          {isLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
          {!isLoading &&
            employeesData &&
            employeesData.length > 0 &&
            employeesData.map((emploeeData: any, index: number) => {
              const { first_name, last_name, title, teaser, is_looked_up } = emploeeData;
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
                        src={require(`../../../../../../assets/images/avatarPlaceholder.svg`)}
                        className={styles.employeeInformationDetails__card__description__image}
                      />
                      <Card.Header className={styles.employeeInformationDetails__card__header}>
                        {first_name} {last_name}
                      </Card.Header>
                      <Card.Meta className={styles.employeeInformationDetails__card__meta}>
                        {title}
                      </Card.Meta>
                      <Card.Meta className={styles.employeeInformationDetails__card__meta}>
                        <Icon name="mail" /> {teaser.emails.length}
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
                        className={styles.continueButton}
                      >
                        {is_looked_up ? 'VIEW' : 'GET INFO'}
                      </ActionButton>
                    </div>
                  </Card.Content>
                </Card>
              );
            })}
          {!isLoading && employeesData && employeesData.length === 0 && (
            <Card className={styles.employeeInformationDetails__noDataFoundCard}>
              <Card.Content className={styles.employeeInformationDetails__noDataFoundCard__content}>
                <Card.Header className={styles.employeeInformationDetails__noDataFoundCard__header}>
                  No Contact Found
                </Card.Header>
                <Card.Meta className={styles.employeeInformationDetails__noDataFoundCard__meta}>
                  *We add new contacts every week and will notify you when it is available
                </Card.Meta>
                <Card.Meta>
                  <ActionButton
                    variant="primary"
                    type={'purpleGradient'}
                    size="small"
                    onClick={() => {
                      retriveCompanyInformation();
                    }}
                    className={styles.continueButton}
                    loading={isRetriveCompanyLoading}
                  >
                    Request
                  </ActionButton>
                </Card.Meta>
              </Card.Content>
            </Card>
          )}
        </div>
      </div>
      {activeEmployeeIndex >= 0 && (
        <Modal open={open} className={styles.modalWrapper} onClose={() => setOpen(false)} closeIcon>
          <EmployeeDetailInformation
            employeeData={employeesData[activeEmployeeIndex]}
            activeEmployeeIndex={activeEmployeeIndex}
            setEmployeeData={setEmployeesData}
            merchantId={rowData.merchant_id}
          />
        </Modal>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCompanyInfo: (companyInfo: any, merhcantId: string) =>
    dispatch(setCompanyInfo(companyInfo, merhcantId)),
});

export default connect(null, mapDispatchToProps)(EmployeesInformation);
