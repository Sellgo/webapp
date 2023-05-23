import React, { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

/* Styling */
import styles from './index.module.scss';
// import { tempOrgData } from './temp';
import EmployeeBox from './EmployeeBox';
// import ActionButton from '../../../components/ActionButton';
import { AppConfig } from '../../../config';
import axios from 'axios';
import { sellerIDSelector } from '../../../selectors/Seller';
import { error } from '../../../utils/notifications';
import { Placeholder } from 'semantic-ui-react';

interface Props {
  currentSeller: any;
  setStep: (a: number) => void;
}
const OrgChart = (props: Props) => {
  const { currentSeller, setStep } = props;
  const [isOrgChartLoading, setIsOrgChartLoading] = useState<boolean>(false);
  const [headData, setHeadData] = useState<any>({});
  const [reportingEmployeesData, setReportingEmployeesData] = useState<any[]>([]);

  const createOrgChartData = async () => {
    // const data = tempOrgData;
    let headEmployee: any = null;
    let childEmployees = [];
    try {
      const sellerId = sellerIDSelector();
      // eslint-disable-next-line max-len
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants-employees?page=1&ordering=id&merchant_id=${currentSeller.merchant_id}&marketplace_id=${currentSeller.marketplace_id}`;

      const { data, status } = await axios.get(URL);

      if (data) {
        headEmployee = data?.results?.find((employeeData: any) => {
          return employeeData.is_head && employeeData.is_decision_maker;
        });
        childEmployees = data?.results?.filter((employeeData: any) => {
          return employeeData.is_decision_maker && !employeeData.is_head;
        });
        setHeadData(headEmployee);
        setReportingEmployeesData([...childEmployees]);
      }

      if (status === 429) {
        error(data.message);
      }
    } catch (err) {
      console.error('Error fetching employees', err);
      const { response } = err as any;
      const { status, data } = response || {};

      if (status === 429) {
        error(data.message);
      }
    }

    setIsOrgChartLoading(false);
  };

  useEffect(() => {
    setIsOrgChartLoading(true);
    createOrgChartData();
  }, []);
  return (
    <div className={styles.OrgChartBox}>
      <div className={styles.informationHeading}>
        <p>COMPANY ORG</p>
        {isOrgChartLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
        {/* {!isOrgChartLoading && headData && Object.keys(headData)?.length > 0 && (
          <ActionButton
            variant="primary"
            type={'black'}
            size="small"
            // loading={activeEmployeeIndex === index && isUnlocking}
            onClick={() => {
              console.log('Call the bulk unlock api');
            }}
            // className={styles.continueButton}
          >
            Bulk Unlock
          </ActionButton>
        )} */}
      </div>

      {!isOrgChartLoading && headData && Object.keys(headData)?.length > 0 && (
        <div className={styles.orgChartWrapper}>
          <Tree
            lineWidth={'1px'}
            lineColor={'#CED4D9'}
            lineBorderRadius={'10px'}
            label={
              <div>
                {
                  <EmployeeBox
                    name={`${headData.first_name} ${headData.last_name}`}
                    position={headData.title}
                    socialPlatformName="linkedin"
                    socialProfileLink={headData?.links?.linkedin ?? ''}
                    numOfEmails={headData?.emails?.length ?? headData?.teasers?.emails?.length ?? 0}
                    numOfPhones={headData?.phones?.length ?? headData?.teasers?.phones?.length ?? 0}
                    isDisabled={!headData.is_looked_up}
                    isLookedUp={headData.is_looked_up}
                    onNameClick={() => {
                      localStorage.setItem('activeEmployeeId', headData.id);
                      setStep(0);
                    }}
                    onCtaClick={() => {
                      localStorage.setItem('activeEmployeeId', headData.id);
                      setStep(0);
                    }}
                  />
                }
              </div>
            }
          >
            {reportingEmployeesData &&
              reportingEmployeesData.length > 0 &&
              reportingEmployeesData.map(employeeData => (
                <TreeNode
                  key={employeeData.first_name}
                  label={
                    <EmployeeBox
                      name={`${employeeData.first_name} ${employeeData.last_name}`}
                      position={employeeData.title}
                      socialPlatformName="linkedin"
                      socialProfileLink={employeeData?.links?.linkedin ?? ''}
                      numOfEmails={
                        employeeData?.emails?.length ?? employeeData?.teasers?.emails?.length ?? 0
                      }
                      numOfPhones={
                        employeeData?.phones?.length ?? employeeData?.teasers?.phones?.length ?? 0
                      }
                      isDisabled={!employeeData.is_looked_up}
                      isLookedUp={employeeData.is_looked_up}
                      onNameClick={() => {
                        localStorage.setItem('activeEmployeeId', employeeData.id);
                        setStep(0);
                      }}
                      onCtaClick={() => {
                        localStorage.setItem('activeEmployeeId', employeeData.id);
                        setStep(0);
                      }}
                    />
                  }
                />
              ))}
          </Tree>
        </div>
      )}
    </div>
  );
};

export default OrgChart;
