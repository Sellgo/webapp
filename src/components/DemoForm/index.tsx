import React, { useEffect, useState } from 'react';
import { Modal } from 'semantic-ui-react';
import validator from 'validator';
import axios from 'axios';
import Select from 'react-select';

/* Styling */
import styles from './index.module.scss';

/* Components */
import FormInput from '../FormInput';
import FormSubmitConfirm from '../FormSubmitConfirm';

/* Constants */
import {
  employSizeList,
  defaultPhoneCode,
  countryPhoneCodeList,
} from '../../assets/demoFormOptions';

import { AppConfig } from '../../config';

interface Props {
  onRequestClose: () => void;
}

const DemoForm: React.FC<Props> = (props: Props) => {
  const { onRequestClose } = props;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: defaultPhoneCode,
    phoneNumber: '',
    email: '',
    company: '',
    companySize: employSizeList[0].value,
    isExistingCustomer: false,
    totalOrders: '',
  });

  const [formDataError, setFormDataError] = useState({
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    phoneNumberErr: false,
    companyErr: false,
    totalOrdersErr: false,
  });

  const [openSubmitConfirm, setOpenSubmitConfirm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(true);

  const handleChange = (e: any) => {
    const { value, name, checked } = e.target;

    if (name === 'isExistingCustomer') {
      setFormData(prevState => {
        return {
          ...prevState,
          [name]: checked,
        };
      });
    } else {
      setFormData(prevState => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  const handleCountryCodeChange = (selectedOption: any) => {
    setFormData(prevState => {
      return {
        ...prevState,
        countryCode: selectedOption,
      };
    });
  };

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    company,
    totalOrders,
    companySize,
    isExistingCustomer,
    countryCode,
  } = formData;

  const {
    emailErr,
    firstNameErr,
    lastNameErr,
    phoneNumberErr,
    companyErr,
    totalOrdersErr,
  } = formDataError;

  /* Effects for Email validation */
  useEffect(() => {
    if (email.trim().length > 0) {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          emailErr: !validator.isEmail(email.trim()),
        };
      });
    } else {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          emailErr: false,
        };
      });
    }
  }, [email]);

  /* Effect for First Name Validation */
  useEffect(() => {
    if (firstName.trim().length > 0) {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          firstNameErr: !validator.isAlpha(firstName),
        };
      });
    } else {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          firstNameErr: false,
        };
      });
    }
  }, [firstName]);

  /* Effect for Last Name Validation */
  useEffect(() => {
    if (lastName.trim().length > 0) {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          lastNameErr: !validator.isAlpha(lastName),
        };
      });
    } else {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          lastNameErr: false,
        };
      });
    }
  }, [lastName]);

  /* Effect for Phone Number Validation */
  useEffect(() => {
    if (phoneNumber.trim().length > 0) {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          phoneNumberErr: !validator.isMobilePhone(phoneNumber),
        };
      });
    } else {
      setFormDataError(prevErr => {
        return {
          ...prevErr,
          phoneNumberErr: false,
        };
      });
    }
  }, [phoneNumber]);

  /* Effect for Company Name Validation */
  useEffect(() => {
    if (company.length > 0) {
      setFormDataError(prevState => {
        return {
          ...prevState,
          companyErr: company.trim().length === 0,
        };
      });
    } else {
      setFormDataError(prevState => {
        return {
          ...prevState,
          companyErr: false,
        };
      });
    }
  }, [company]);

  /* Effect forTotal Orders Validation */
  useEffect(() => {
    if (totalOrders.length > 0) {
      setFormDataError(prevState => {
        return {
          ...prevState,
          websiteErr: !validator.isURL(totalOrders),
        };
      });
    } else {
      setFormDataError(prevState => {
        return {
          ...prevState,
          websiteErr: false,
        };
      });
    }
  }, [totalOrders]);

  /* Clear the form data */
  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      countryCode: defaultPhoneCode,
      phoneNumber: '',
      totalOrders: '',
      email: '',
      company: '',
      companySize: employSizeList[0].value,
      isExistingCustomer: false,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('phone', `${countryCode.value}-${phoneNumber}`);
    formData.append('company', company);
    formData.append('numemployees', companySize);
    formData.append('is_existing_customer', isExistingCustomer ? 'true' : 'false');
    formData.append('is_demo_requested', 'true');
    formData.append('total_orders_per_month', totalOrders);

    try {
      const URL = `${AppConfig.BASE_URL_API}sellers/create-hubspot`;
      const response = await axios.post(URL, formData);
      if (response.status === 201) {
        clearForm();
        setShowDemoForm(false);
        setOpenSubmitConfirm(true);
      }
    } catch (err) {
      console.error('Error Sending data to hubspot');
      setShowDemoForm(false);
      clearForm();
    }
  };

  return (
    <>
      {showDemoForm && (
        <div className={styles.demoPage}>
          <form className={styles.demoPageForm} onSubmit={handleSubmit}>
            <h2>See how AiStock can work for you</h2>
            <p>
              Leave a few details below and we&apos;ll connect you with an AiStock expert who can
              show you how AiStock can help your business.
            </p>
            <div className={styles.inputControlWrapper}>
              <FormInput
                className={styles.formInput}
                label=""
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name*"
                onChange={handleChange}
                value={firstName}
                autoComplete="off"
                required
                hasError={firstNameErr}
                errorMessage="Invalid First Name"
              />

              <FormInput
                className={styles.formInput}
                label=""
                placeholder="Last Name*"
                id="lastName"
                type="text"
                name="lastName"
                onChange={handleChange}
                value={lastName}
                autoComplete="off"
                hasError={lastNameErr}
                required
                errorMessage="Invalid Last Name"
              />

              <FormInput
                className={`
								${styles.formInput}
								${styles.formInput__long}
							`}
                label=""
                placeholder="Email*"
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={email}
                autoComplete="off"
                required
                hasError={emailErr}
                errorMessage="Invalid Email"
              />
              <div className={styles.dropdownWrapper}>
                <Select
                  defaultValue={defaultPhoneCode}
                  options={countryPhoneCodeList}
                  className={styles.countrySelect}
                  classNamePrefix="dropdown"
                  id="dropdown"
                  onChange={handleCountryCodeChange}
                  value={countryCode}
                />
              </div>

              <FormInput
                className={styles.formInput}
                label=""
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number*"
                onChange={handleChange}
                value={phoneNumber}
                autoComplete="off"
                required
                hasError={phoneNumberErr}
                errorMessage="Invalid Phone Number"
              />

              <FormInput
                className={`
								${styles.formInput}
								${styles.formInput__long}
							`}
                label=""
                placeholder="Company*"
                id="company"
                type="text"
                name="company"
                onChange={handleChange}
                value={company}
                autoComplete="off"
                required
                hasError={companyErr}
                errorMessage="Please enter company name"
              />

              <FormInput
                className={`
								${styles.formInput}
								${styles.formInput__long}
							`}
                label=""
                placeholder="Total Orders Per Month*"
                id="totalOrders"
                type="number"
                name="totalOrders"
                onChange={handleChange}
                value={totalOrders}
                autoComplete="off"
                required
                hasError={totalOrdersErr}
                errorMessage="Please enter valid URL"
              />
            </div>
            <FormInput
              className={styles.selectCheckbox}
              type="checkbox"
              name="isExistingCustomer"
              id="isExistingCustomer"
              checked={isExistingCustomer}
              onChange={handleChange}
              label="Please tick here if you are an existing customer."
              value={isExistingCustomer ? 'on' : 'off'}
              labelLast
            />
            <button
              className={`ctabutton ctabutton--primary ctabutton--medium ${styles.submitButton}`}
              type="submit"
              disabled={
                firstNameErr ||
                lastNameErr ||
                emailErr ||
                phoneNumberErr ||
                companyErr ||
                totalOrdersErr
              }
            >
              Submit
            </button>
            <p className={styles.terms}>
              By subscribing, you agree to receive recurring automated marketing text messages (e.g.
              cart reminders, promotional offers) from AiStock at the phone number provided on the
              subscription form. Consent is not a condition to purchase. Msg & data rates may apply.
              Msg frequency varies. Reply HELP for help and STOP to cancel. View our
              <a href="/privacy-policy">Privacy Policy</a>
              and
              <a href="/terms-of-use">Terms of Use.</a>
              By clicking submit, you agree to our Terms of Service.
            </p>
          </form>
          <div className={styles.existingBrands}>
            {/* <div className={styles.socialProofIcons}>
							<Image
								src={'/Poshmark.png'}
								alt="PoshmarkLogo"
								width={100}
								height={46}
							/>
							<Image
								src={'/Corpay.png'}
								alt="CorpayLogo"
								width={100}
								height={28}
							/>
							<Image src={'/Joom.png'} alt="JoomLogo" width={100} height={24} />
							<Image
								src={'/Clearbank.png'}
								alt="ClearbankLogo"
								width={100}
								height={18}
							/>
							<Image src={'/Nest.png'} alt="NestLogo" width={100} height={38} />
							<Image
								src={'/Blackstone.png'}
								alt="BlackstoneLogo"
								width={100}
								height={24}
							/>
							<Image
								src={'/Fitchbrew.png'}
								alt="FitchbrewLogo"
								width={100}
								height={34}
							/>
							<Image
								src={'/MetkixLogo.png'}
								alt="MetkixLogo"
								width={70}
								height={30}
							/>
							<Image
								src={'/LuxeLogo.png'}
								alt="LuxeLogo"
								width={100}
								height={52}
							/>
							<Image
								src={'/Skopenow.png'}
								alt="SkopeLogo"
								width={100}
								height={19}
							/>
							<Image src={'/BBLogo.png'} alt="BBLogo" width={100} height={17} />
							<Image
								src={'/Aspire.png'}
								alt="AspireLogo"
								width={100}
								height={29}
							/>
						</div> */}
            <p>
              Many brands choose AiStock to deliver their remarkable growth for their online retail
              businesses.
            </p>
          </div>
        </div>
      )}

      <div id="formSubmitConfirm" />
      <Modal
        isOpen={openSubmitConfirm}
        onRequestClose={() => {
          setOpenSubmitConfirm(false);
          onRequestClose();
        }}
        className={styles.demoModal}
        // overlayClassName="modalOverlay"
      >
        <FormSubmitConfirm
          heading="You're all set"
          body="Your demo request has been confirmed!."
          ending="Our sales team will be in touch with you soon."
        />
      </Modal>
    </>
  );
};

export default DemoForm;
