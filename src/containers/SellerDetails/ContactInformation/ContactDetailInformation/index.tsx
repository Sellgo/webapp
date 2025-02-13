/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Image } from 'semantic-ui-react';
// Styles
import styles from './index.module.scss';

// Components
import SocialLinkIcon from '../../../../components/SocialLinkIcon';
import ValidCheckIcon from '../../../../components/Icons/ValidCheckIcon';
import InValidCrossIcon from '../../../../components/Icons/InValidIcon';

// Selectors
import { getSellerSubscription } from '../../../../selectors/Subscription';

// Utils
import { getNumberOfDaysTillToday } from '../../../../utils/date';
import { formatNumber } from '../../../../utils/format';
import {
  isSubscriptionIdFreeAccount,
  isSubscriptionIdStarter,
} from '../../../../utils/subscriptions';

// Constant
import { SOCIAL_LINK_COLORS } from '../../../../constants/SellerResearch/SellerDatabase';

// Interfaces
import { SellerSubscription } from '../../../../interfaces/Seller';
// import { FREE_EMAILS } from '../../../../constants/FreeEmails';

interface Props {
  employeeData?: any;
  sellerSubscription: SellerSubscription;
}
const ContactDetailInformation = (props: Props) => {
  const { employeeData, sellerSubscription } = props;
  const [professionalEmails, setProfessionalEmails] = useState<any[]>([]);
  const [personalEmails, setPersonalEmails] = useState<any[]>([]);
  const isPhoneVisible = !(
    isSubscriptionIdFreeAccount(sellerSubscription.subscription_id) ||
    isSubscriptionIdStarter(sellerSubscription.subscription_id)
  );

  const emailVerificationIcons: { [key: string]: any } = {
    valid: <ValidCheckIcon fill="#5DC560" />,
    invalid: <InValidCrossIcon />,
  };

  const redirectToPricing = () => {
    const win = window.open('/settings/pricing', '_blank');
    win?.focus();
  };

  const setProfessionalAndPersonalEmails = () => {
    const tempProfessionalEmails: any[] = [];
    const tempPersonalEmails: any[] = [];
    if (employeeData?.is_looked_up) {
      employeeData?.emails?.forEach((emailData: any) => {
        if (emailData.type.includes('professional')) {
          tempProfessionalEmails.push(emailData);
        } else if (emailData.type.includes('personal')) {
          tempPersonalEmails.push(emailData);
        }
      });
    } else if (!employeeData?.is_looked_up) {
      console.log('GET NFOR', employeeData);
      employeeData?.teaser?.emails?.forEach((emailData: any) => {
        if (emailData.type.includes('professional')) {
          tempProfessionalEmails.push({
            email: emailData.email,
            status: '',
            last_verified: '... days ago',
          });
        } else if (emailData.type.includes('personal')) {
          tempPersonalEmails.push({
            email: emailData.email,
            status: '',
            last_verified: '... days ago',
          });
        }
      });
    }
    setProfessionalEmails([...tempProfessionalEmails]);
    setPersonalEmails([...tempPersonalEmails]);
  };

  console.log('Professional => ', professionalEmails);
  console.log('Personal => ', personalEmails);

  useEffect(() => {
    setProfessionalAndPersonalEmails();
  }, [employeeData]);

  return (
    <>
      <div className={styles.employeeInformationDetailPopup}>
        {/* Personal information */}
        <div className={styles.employeeInformationDetailPopup__personalInformation}>
          <div className={styles.employeeInformationDetailPopup__personalInformation__bio}>
            <Image
              size="mini"
              src={require(`../../../../assets/images/avatarPlaceholder.svg`)}
              className={styles.employeeInformationDetails__card__description__image}
            />
            <p className={styles.employeeInformationDetailPopup__personalInformation__bio__name}>
              {employeeData.first_name} {employeeData.last_name}
            </p>
          </div>
          <div className={styles.socialPresence__linksRow}>
            {Object.keys(employeeData?.links ?? {}).map((link: string) => (
              <SocialLinkIcon
                key={link}
                site={link.toLowerCase()}
                link={employeeData?.links?.[link]}
                color={SOCIAL_LINK_COLORS[link.toLowerCase()]}
                className={styles.socialPresence__linksRow__links}
                disabled={!employeeData?.is_looked_up || !employeeData?.links?.[link]}
              />
            ))}
          </div>
        </div>
        <div className={styles.contactInfo}>
          {/* Email Information */}
          {/* <div className={styles.employeeInformationDetailPopup__contactInformation}>
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
              className={
                styles.employeeInformationDetailPopup__contactInformation_emailLastVerified
              }
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
                        className={
                          styles.employeeInformationDetailPopup__contactInformation_details
                        }
                      >
                        {getNumberOfDaysTillToday(last_verified)} days ago
                      </p>
                    </>
                  );
                })}
            </div>
          </div> */}

          {/* Professional Emails */}
          <div className={styles.emailWrapper}>
            <div className={styles.emailWrapper__metaData}>
              <p>
                Professional emails
                {`(${professionalEmails.length ?? 0})`}
              </p>
              <p>Last verified</p>
            </div>
            <div className={styles.emailWrapper__emailBoxes}>
              <div className={styles.emailWrapper__emailBoxes__container}>
                {professionalEmails &&
                  professionalEmails.length > 0 &&
                  professionalEmails.map((emailData: any) => {
                    const { email, status, last_verified } = emailData;
                    return (
                      <div
                        key={`${email}-${status}`}
                        className={`${styles.emailWrapper__contactInformation_emails__verified} 
                    ${styles.emailWrapper__contactInformation_details}`}
                      >
                        <div className={styles.emailWrapper__contactInformation__emailIconBox}>
                          {emailVerificationIcons[status]}
                          <p className={styles.linkBlueText}>{email}</p>
                        </div>
                        <p className={styles.emailWrapper__contactInformation_details}>
                          {employeeData?.is_looked_up ? (
                            <>{formatNumber(getNumberOfDaysTillToday(last_verified))} days ago</>
                          ) : (
                            <>{last_verified}</>
                          )}
                        </p>
                      </div>
                    );
                  })}
                {(!professionalEmails || !(professionalEmails.length > 0)) && <p>-</p>}
              </div>
            </div>
          </div>

          {/* Personal Emails */}
          <div className={styles.emailWrapper}>
            <div className={styles.emailWrapper__metaData}>
              <p>Personal emails {`(${personalEmails.length ?? 0})`}</p>
              <p>Last verified</p>
            </div>
            <div className={styles.emailWrapper__emailBoxes}>
              <div className={styles.emailWrapper__emailBoxes__container}>
                {personalEmails &&
                  personalEmails.length > 0 &&
                  personalEmails.map((emailData: any) => {
                    const { email, status, last_verified } = emailData;
                    return (
                      <div
                        key={`${email}-${status}`}
                        className={`${styles.emailWrapper__contactInformation_emails__verified} 
                    ${styles.emailWrapper__contactInformation_details}`}
                      >
                        <div className={styles.emailWrapper__contactInformation__emailIconBox}>
                          {emailVerificationIcons[status]}
                          <p className={styles.linkBlueText}>{email}</p>
                        </div>
                        <p className={styles.emailWrapper__contactInformation_details}>
                          {employeeData?.is_looked_up ? (
                            <>{formatNumber(getNumberOfDaysTillToday(last_verified))} days ago</>
                          ) : (
                            <>{last_verified}</>
                          )}
                        </p>
                      </div>
                    );
                  })}

                {(!personalEmails || !(personalEmails.length > 0)) && <p>-</p>}
              </div>
            </div>
          </div>

          <div className={styles.emailWrapper}>
            <div className={styles.emailWrapper__metaData}>
              <p>
                Direct phone{' '}
                {`(${employeeData?.phones?.length || employeeData?.teaser?.phones?.length || 0})`}
              </p>
              <p>Last verified</p>
            </div>
            <div className={styles.emailWrapper__emailBoxes}>
              <div className={styles.emailWrapper__emailBoxes__container}>
                {!isPhoneVisible && (
                  <div className={styles.upgradeAccess}>
                    <p>
                      {employeeData?.phones?.length || employeeData?.teaser?.phones?.length} phones
                      are found,{' '}
                      <span onClick={redirectToPricing} className={styles.upgradeAccess_link}>
                        upgrade access
                      </span>
                    </p>
                  </div>
                )}
                {isPhoneVisible && (
                  <>
                    {employeeData?.is_looked_up &&
                      employeeData?.phones &&
                      employeeData?.phones.map((phoneData: any) => {
                        const { number, status, last_verified } = phoneData;
                        return (
                          <div
                            className={`${styles.emailWrapper__contactInformation_emails__verified} 
                        ${styles.emailWrapper__contactInformation_details}`}
                          >
                            <div className={styles.emailWrapper__contactInformation__emailIconBox}>
                              {emailVerificationIcons[status]}
                              <p className={styles.linkBlueText}>{number}</p>
                            </div>
                            <p className={styles.emailWrapper__contactInformation_details}>
                              {employeeData?.is_looked_up ? (
                                <>
                                  {formatNumber(getNumberOfDaysTillToday(last_verified))} days ago
                                </>
                              ) : (
                                <>{last_verified}</>
                              )}
                            </p>
                          </div>
                        );
                      })}
                    {!employeeData?.is_looked_up &&
                      employeeData?.teaser?.phones &&
                      employeeData?.teaser?.phones.map((phone: any) => (
                        <div
                          className={`${styles.emailWrapper__contactInformation_emails__verified} 
                        ${styles.emailWrapper__contactInformation_details}`}
                        >
                          <div className={styles.emailWrapper__contactInformation__emailIconBox}>
                            <p
                              className={`${styles.linkBlueText} 
                            ${styles.employeeInformationDetailPopup__contactInformation_details}`}
                            >
                              {phone.number}
                            </p>
                          </div>
                          <p
                            className={
                              styles.employeeInformationDetailPopup__contactInformation_details
                            }
                          >
                            ... days ago
                          </p>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Phone Information */}
          {/* <div className={styles.employeeInformationDetailPopup__contactPhoneInformation}>
            <div className={styles.employeeInformationDetailPopup__contactInformation_phones}>
              <p className={styles.informationHeading}>Phone</p>
              {isPhoneVisible && <></>}
              {!isPhoneVisible && (
                <div className={styles.upgradeAccess}>
                  <p>
                    {employeeData?.phones?.length || employeeData?.teaser?.phones?.length} phones
                    are found,{' '}
                    <span onClick={redirectToPricing} className={styles.upgradeAccess_link}>
                      upgrade access
                    </span>
                  </p>
                </div>
              )}
            </div>
            {isPhoneVisible && (
              <div
                className={
                  styles.employeeInformationDetailPopup__contactInformation_emailLastVerified
                }
              >
                <p className={styles.informationHeading}>Last Verified</p>
                {isPhoneVisible && (
                  <>
                    {!employeeData?.is_looked_up &&
                      employeeData?.teaser?.phones &&
                      employeeData?.teaser?.phones.map(() => (
                       
                      ))}
                    {employeeData?.is_looked_up &&
                      employeeData?.phones &&
                      employeeData?.phones.map((phoneData: any) => {
                        const { last_verified } = phoneData;
                        return (
                          <>
                            
                          </>
                        );
                      })}
                  </>
                )}
              </div>
            )}
          </div> */}
        </div>
        <p className={styles.informationHeading}>Employee Information</p>
        <div className={styles.employeeInformationDetailPopup__personalInformation__details}>
          <div className={styles.employeeInformationDetailPopup__personalInformation__detailsBox}>
            <Icon
              name="user"
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_icon
              }
            />
            <p
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_heading
              }
            >
              Position
            </p>
            <p
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_text
              }
            >
              {employeeData?.title ?? '-'}
            </p>
          </div>
          <div className={styles.employeeInformationDetailPopup__personalInformation__detailsBox}>
            <Icon
              name="building"
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_icon
              }
            />
            <p
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_heading
              }
            >
              Company
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
              name="map marker alternate"
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
              name="graduation cap"
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_icon
              }
            />
            <p
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_heading
              }
            >
              Education
            </p>
            <p
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_text
              }
            >
              {!employeeData?.education && '-'}
              {employeeData?.education?.length === 0 && '-'}
              {employeeData?.education.map((education: any, index: number) => (
                <span>
                  {education}
                  {index < employeeData?.education?.length - 1 && '\n'}
                </span>
              ))}
            </p>
          </div>

          <div className={styles.employeeInformationDetailPopup__personalInformation__detailsBox}>
            <Icon
              name="suitcase"
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_icon
              }
            />
            <p
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_heading
              }
            >
              Jobs
            </p>
            <p
              className={
                styles.employeeInformationDetailPopup__personalInformation__detailsBox_text
              }
            >
              {!employeeData?.jobs && '-'}
              {employeeData?.jobs?.length === 0 && '-'}
              {employeeData?.jobs.map((jobs: any, index: number) => (
                <span>
                  {jobs}
                  {index < employeeData?.jobs?.length - 1 && '\n'}
                </span>
              ))}
            </p>
          </div>

          <div className={styles.employeeInformationDetailPopup__personalInformation__detailsBox}>
            <Icon
              name="list ol"
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
              {!employeeData?.skills && '-'}
              {employeeData?.skills?.length === 0 && '-'}
              {employeeData?.skills.map((skill: any, index: number) => (
                <span>
                  {skill}
                  {index < employeeData?.skills?.length - 1 && ' | '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerSubscription: getSellerSubscription(state),
  };
};

export default connect(mapStateToProps)(ContactDetailInformation);
