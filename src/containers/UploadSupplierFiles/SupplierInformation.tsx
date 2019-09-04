import React from 'react';
import { Form, Grid, Popup, Icon } from 'semantic-ui-react';
import styles from './UploadSupplierFiles.module.css';
import { Field } from 'redux-form';
import { InputField, SelectField, TextAreaField } from '../../components/ReduxFormFields';
import { DefaultSelect } from '../../constant/constant';
import timezones from '../../constant/timezones';
import accountStatuses from '../../constant/accountStatuses';
import terms from '../../constant/terms';
import isRequired from '../../utils/validations/isRequired';

const required = isRequired();

const SupplierDetails = () => (
  <Grid columns={3} divided={true} className={styles.grid}>
    <Grid.Row>
      <Grid.Column>
        <Field
          component={InputField}
          name="contact"
          label="Contact Person"
          placeholder="First Last"
        />
      </Grid.Column>
      <Grid.Column>
        <Field component={InputField} name="phone" label="Phone" placeholder="Phone" />
      </Grid.Column>
      <Grid.Column>
        <Field component={InputField} name="email" label="Email" placeholder="Email" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Field component={InputField} name="website" label="Website" placeholder="Website" />
      </Grid.Column>
      <Grid.Column>
        <Field
          component={SelectField}
          name="timezone"
          label="Timezone"
          options={[DefaultSelect, ...timezones]}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Field
          component={SelectField}
          name="status"
          label="Account Status"
          options={[DefaultSelect, ...accountStatuses]}
        />
      </Grid.Column>
      <Grid.Column width={8}>
        <Field
          component={SelectField}
          name="terms"
          label="Terms"
          options={[DefaultSelect, ...terms]}
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
          inputProps={{
            label: { basic: true, content: '%' },
            labelPosition: 'right',
          }}
        />
      </Grid.Column>
      <Grid.Column>
        <Field
          component={InputField}
          name="freight_fee"
          label="Freight Free Threshold ($)"
          placeholder="Freight Free Threshold ($)"
          inputProps={{
            label: { basic: true, content: '$' },
            labelPosition: 'right',
          }}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const SupplierInformation = () => {
  return (
    <div className={styles.ouline_box}>
      <Form>
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
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={4}>
              <div className={styles.form_container}>
                <Grid.Row>
                  <Field
                    required={true}
                    validate={required}
                    component={InputField}
                    name="name"
                    label="Supplier Name"
                    placeholder="Supplier Name"
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
                  />
                </Grid.Row>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>{<SupplierDetails />}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};

export default SupplierInformation;
