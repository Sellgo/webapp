import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Icon, Image } from 'semantic-ui-react';
// Styles
import styles from './index.module.scss';

// Components
import ActionButton from '../../../../../../components/ActionButton';
import SocialLinkIcon from '../../../../../../components/SocialLinkIcon';
import ValidCheckIcon from '../../../../../../components/Icons/ValidCheckIcon';
import InValidCrossIcon from '../../../../../../components/Icons/InValidIcon';

// Actions
import { setCompanyInfo } from '../../../../../../actions/SellerResearch/SellerDatabase';

// Selectors
import { sellerIDSelector } from '../../../../../../selectors/Seller';

// Config
import { AppConfig } from '../../../../../../config';

// Utils
import { error, success } from '../../../../../../utils/notifications';
import { getNumberOfDaysTillToday } from '../../../../../../utils/date';

// Constant
import { SOCIAL_LINK_COLORS } from '../../../../../../constants/SellerResearch/SellerDatabase';

interface Props {
  employeeData?: any;
  activeEmployeeIndex: number;
  merchantId: string;
  setEmployeeData: (a: any) => void;
  setCompanyInfo: (a: any, b: string) => void;
}
const EmployeeDetailInformation = (props: Props) => {
  const { employeeData, setEmployeeData, activeEmployeeIndex, merchantId, setCompanyInfo } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const unlockEmplloyeeDetail = async () => {
    setIsLoading(true);
    try {
      const sellerId = sellerIDSelector();
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/retrieve-employee-detail?id=${employeeData.id}`;

      const { data } = await axios.get(URL);

      if (data) {
        setEmployeeData((preValue: any) => {
          const temp = [...preValue];
          temp[activeEmployeeIndex] = {
            ...temp[activeEmployeeIndex],
            emails: data?.emails,
            links: data?.links,
            is_looked_up: true,
          };
          return temp;
        });
        if (data.company_info) {
          setCompanyInfo(data.company_info, merchantId);
        }
        success('Details unlocked successfully');
      }
    } catch (err) {
      error('Cannot unlock details at the moment');
      console.error('Error fetching employees', err);
    }
    setIsLoading(false);
  };

  const emailVerificationIcons: { [key: string]: any } = {
    valid: <ValidCheckIcon />,
    invalid: <InValidCrossIcon />,
  };

  return (
    <>
      <div className={styles.employeeInformationDetailPopup}>
        {/* Personal information */}
        <div className={styles.employeeInformationDetailPopup__personalInformation}>
          <div className={styles.employeeInformationDetailPopup__personalInformation__bio}>
            <Image />
            <p className={styles.employeeInformationDetailPopup__personalInformation__bio__name}>
              {employeeData.first_name} {employeeData.last_name}
            </p>
          </div>
          <p className={styles.informationHeading}>Contact Person Social Presence</p>
          <div className={styles.socialPresence__linksRow}>
            {Object.keys(employeeData?.links ?? {}).map((link: string) => (
              <SocialLinkIcon
                key={link}
                site={link.toLowerCase()}
                link={employeeData?.links[link]}
                color={SOCIAL_LINK_COLORS[link.toLowerCase()]}
                className={styles.socialPresence__linksRow__links}
                disabled={!employeeData?.is_looked_up}
              />
            ))}
          </div>
          <p className={styles.informationHeading}>Contact Person Information</p>
          <div>
            <div className={styles.employeeInformationDetailPopup__personalInformation__detailsBox}>
              <Icon
                name="amazon"
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_icon
                }
              />
              <p
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_heading
                }
              >
                Industry
              </p>
              <p
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_text
                }
              >
                {employeeData?.company ?? '-'}
              </p>
            </div>
            <div className={styles.employeeInformationDetailPopup__personalInformation__detailsBox}>
              <Icon
                name="amazon"
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_icon
                }
              />
              <p
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_heading
                }
              >
                Location
              </p>
              <p
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_text
                }
              >
                {employeeData?.location ?? '-'}
              </p>
            </div>
            <div className={styles.employeeInformationDetailPopup__personalInformation__detailsBox}>
              <Icon
                name="amazon"
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_icon
                }
              />
              <p
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_heading
                }
              >
                Skills
              </p>
              <p
                className={
                  styles.employeeInformationDetailPopup__personalInformation__detailsBox_text
                }
              >
                {employeeData?.skills.map((skill: any, index: number) => (
                  <span>
                    {skill}
                    {index < employeeData?.skills?.length - 1 && ','}
                    &nbsp;
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        {/* Contact Information */}
        <div className={styles.employeeInformationDetailPopup__contactInformation}>
          <div className={styles.employeeInformationDetailPopup__contactInformation_emails}>
            <p className={styles.informationHeading}>Emails</p>
            {!employeeData?.is_looked_up &&
              employeeData?.teaser?.emails &&
              employeeData?.teaser?.emails.map((email: string) => (
                <p
                  className={`${styles.linkBlueText} 
                  ${styles.employeeInformationDetailPopup__contactInformation_details}`}
                >
                  ****@{email}
                </p>
              ))}
            {employeeData?.is_looked_up &&
              employeeData?.emails &&
              employeeData?.emails.map((emailData: any) => {
                const { email, status } = emailData;
                return (
                  <div
                    className={`${styles.employeeInformationDetailPopup__contactInformation_emails__verified} 
                    ${styles.employeeInformationDetailPopup__contactInformation_details}`}
                  >
                    {emailVerificationIcons[status]}
                    <p className={styles.linkBlueText}>{email}</p>
                  </div>
                );
              })}
          </div>
          <div
            className={styles.employeeInformationDetailPopup__contactInformation_emailLastVerified}
          >
            <p className={styles.informationHeading}>Last Verified</p>
            {!employeeData?.is_looked_up &&
              employeeData?.teaser?.emails &&
              employeeData?.teaser?.emails.map(() => (
                <p className={styles.employeeInformationDetailPopup__contactInformation_details}>
                  x x ago
                </p>
              ))}
            {employeeData?.is_looked_up &&
              employeeData?.emails &&
              employeeData?.emails.map((emailData: any) => {
                const { last_verified } = emailData;
                return (
                  <>
                    <p
                      className={styles.employeeInformationDetailPopup__contactInformation_details}
                    >
                      {getNumberOfDaysTillToday(last_verified)} days ago
                    </p>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      {!employeeData?.is_looked_up && (
        <div className={styles.buttonsRow}>
          <ActionButton
            variant="primary"
            type="purpleGradient"
            size="md"
            loading={isLoading}
            onClick={() => unlockEmplloyeeDetail()}
          >
            Unlock Info
          </ActionButton>
          <p className={styles.buttonsRow__text}>Uses 1 token</p>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCompanyInfo: (companyInfo: any, merhcantId: string) =>
    dispatch(setCompanyInfo(companyInfo, merhcantId)),
});
export default connect(null, mapDispatchToProps)(EmployeeDetailInformation);
