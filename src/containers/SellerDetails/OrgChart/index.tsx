import React, { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

/* Styling */
import styles from './index.module.scss';
import { tempOrgData } from './temp';
import EmployeeBox from './EmployeeBox';
import ActionButton from '../../../components/ActionButton';

interface Props {
  setStep: (a: number) => void;
}
const OrgChart = (props: Props) => {
  const { setStep } = props;
  const [isOrgChartLoading, setIsOrgChartLoading] = useState<boolean>(false);
  const [headData, setHeadData] = useState<any>({});
  const [reportingEmployeesData, setReportingEmployeesData] = useState<any[]>([]);

  const createOrgChartData = () => {
    const data = tempOrgData;
    let headEmployee: any = null;
    let childEmployees = [];
    headEmployee = data.find(employeeData => {
      return employeeData.is_head && employeeData.is_decision_maker;
    });
    childEmployees = data.filter(employeeData => {
      return employeeData.is_decision_maker && !employeeData.is_head;
    });
    setHeadData(headEmployee);
    setReportingEmployeesData([...childEmployees]);
    setIsOrgChartLoading(false);
  };

  useEffect(() => {
    setIsOrgChartLoading(true);
    createOrgChartData();
  }, []);
  return (
    <div className={styles.OrgChartBox}>
      <div className={styles.informationHeading}>
        <p>COMPANY ORG</p>{' '}
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
      </div>

      {!isOrgChartLoading && (
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
                    onNameClick={() => {
                      localStorage.setItem('activeEmployeeId', headData.id);
                      setStep(0);
                    }}
                  />
                }
              </div>
            }
          >
            {reportingEmployeesData &&
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
                      onNameClick={() => {
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
