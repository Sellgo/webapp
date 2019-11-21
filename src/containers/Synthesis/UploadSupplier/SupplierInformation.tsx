import React from 'react';
import { Form, Grid, Popup, Icon } from 'semantic-ui-react';
import { Field } from 'redux-form';
import { InputField, SelectField, TextAreaField } from '../../../components/ReduxFormFields';
import { defaultSelect } from '../../../constants';
import timezones from '../../../constants/UploadSupplier/timezones';
import { accountStatus } from '../../../constants/UploadSupplier';
import { terms } from '../../../constants/UploadSupplier';
import isRequired from '../../../utils/validations/isRequired';
import styles from './UploadSupplier.module.css';

const required = isRequired();

const SupplierDetails = () => (
  <Grid columns={3} className={styles.grid}>
    <Grid.Row>
      <Grid.Column>
        <Field
          component={InputField}
          name="contact"
          label="Contact Person"
          placeholder="First Last"
          maxLength="100"
        />
      </Grid.Column>
      <Grid.Column>
        <Field component={InputField} name="phone" label="Phone" placeholder="Phone" type="tel" />
      </Grid.Column>
      <Grid.Column>
        <Field component={InputField} name="email" label="Email" placeholder="Email" type="email" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Field
          component={InputField}
          name="website"
          label="Website"
          placeholder="Website"
          type="url"
          maxLength="200"
        />
      </Grid.Column>
      <Grid.Column>
        <Field
          className="timezoneField"
          component={SelectField}
          name="timezone"
          label="Timezone"
          options={[defaultSelect, ...timezones]}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Field
          component={SelectField}
          name="account_status"
          label="Account Status"
          options={[defaultSelect, ...accountStatus]}
        />
      </Grid.Column>
      <Grid.Column width={8}>
        <Field
          component={SelectField}
          name="terms"
          label="Terms"
          options={[defaultSelect, ...terms]}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Field
          component={InputField}
          name="upcharge_fee"
          label="Upcharge Fee (%)"
          placeholder="Upcharge Fee (%)"
          className={styles.fieldWidth}
          inputProps={{
            label: { basic: true, content: '%' },
            labelPosition: 'right',
          }}
          type="number"
        />
      </Grid.Column>
      <Grid.Column>
        <Field
          component={InputField}
          name="freight_fee"
          label="Freight Free Threshold ($)"
          placeholder="Freight Free Threshold ($)"
          className={styles.fieldWidth}
          inputProps={{
            label: { basic: true, content: '$' },
            labelPosition: 'right',
          }}
          type="number"
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const SupplierInformation = () => {
  return (
    <div className={styles.ouline_box}>
      <Form className={styles.supply_container}>
        <label className={styles.supplier_information_label}>
          Supplier Information
          <span>
            {' '}
            <Popup
              trigger={<Icon name="question circle" color={'grey'} />}
              position="top left"
              size="tiny"
              content="Supplier Information"
            />
          </span>
        </label>
        <br />
        <Grid columns={2} className="bgColor">
          <Grid.Row>
            <Grid.Column width={4} className={styles.padding0}>
              <div className={styles.form_container}>
                <Grid.Row>
                  <Field
                    required={true}
                    validate={required}
                    component={InputField}
                    name="name"
                    label="Supplier Name"
                    placeholder="Supplier Name"
                    maxLength="100"
                  />
                </Grid.Row>
                <Grid.Row>
                  <Field
                    //required={true}
                    //validate={required}
                    component={TextAreaField}
                    name="description"
                    label="Description"
                    placeholder="Write your latest update here"
                    maxLength="100"
                  />
                </Grid.Row>
              </div>
            </Grid.Column>
            <Grid.Column width={12} className={styles.wdt100}>
              {<SupplierDetails />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};

export default SupplierInformation;
