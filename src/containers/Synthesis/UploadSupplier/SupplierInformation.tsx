import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import { Field } from 'redux-form';
import { InputField, SelectField } from '../../../components/ReduxFormFields';
import { defaultSelect } from '../../../constants';
import timezones from '../../../constants/UploadSupplier/timezones';
import { accountStatus, terms } from '../../../constants/UploadSupplier';
import isRequired from '../../../utils/validations/isRequired';
import { isNumber } from '../../../utils/validations/isPhone';
import isName from '../../../utils/validations/isName.js';
import { onlyNumber } from '../../../utils/validations/isOnlyNumber';
import { webUrl } from '../../../utils/validations/isUrl';

const required = isRequired();

const SupplierInformation = () => {
  return (
    <div className={`new-upload-outline ${styles['ouline-box']}`}>
      <Form className={`${styles['supply-container']} ${styles['form-size']}`}>
        <Grid columns="equal" className="bg-color">
          <Grid.Column className={`SupplierInformation__first-column  ${styles.padding0}`}>
            <div className={`new-upload-form ${styles['form-container']}`}>
              <Field
                required={true}
                validate={required}
                component={InputField}
                name="nameSupplier"
                label="Supplier Name"
                placeholder="Supplier Name"
                maxLength="100"
              />
              <Field
                component={InputField}
                name="contact"
                label="Contact Person"
                placeholder="First Last"
                maxLength="100"
                validate={isName()}
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <Field
              component={InputField}
              name="website"
              label="Website"
              placeholder="Website"
              type="url"
              maxLength="200"
              validate={webUrl}
            />
            <Field
              component={InputField}
              name="phone"
              label="Phone"
              placeholder="e.g. +1 (416) 555-1212"
              validate={isNumber}
              className={styles['phone-field']}
            />
            <Field
              className={styles['dropdwn-wdth']}
              component={SelectField}
              name="account_status"
              label="Account Status"
              placeholder="Account Status"
              options={[defaultSelect, ...accountStatus]}
            />
            <Field
              component={InputField}
              name="freight_fee"
              label="Freight Free Threshold ($)"
              placeholder="$"
              className={styles['field-width']}
              type="number"
              min="0"
              validate={onlyNumber}
            />
          </Grid.Column>
          <Grid.Column>
            <Field
              className="timezone-field"
              component={SelectField}
              name="timezone"
              label="Timezone"
              placeholder="Timezone"
              options={[defaultSelect, ...timezones]}
            />
            <Field
              component={InputField}
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />
            <Field
              component={SelectField}
              name="terms"
              label="Terms"
              placeholder="Terms"
              options={[defaultSelect, ...terms]}
            />
            <Field
              component={InputField}
              name="upcharge_fee"
              label="Upcharge Fee (%)"
              placeholder="%"
              className={styles['field-width']}
              type="number"
              min="0"
              validate={onlyNumber}
            />
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default SupplierInformation;
