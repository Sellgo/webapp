import React, { useState } from 'react';
import { Form, TextArea, Icon, Grid, Modal } from 'semantic-ui-react';
import { useInput } from '../../hooks';
import styles from './UploadSupplierFiles.module.css';
import { Field, reduxForm } from 'redux-form';
import { InputField, SelectField, TextAreaField } from '../../components/ReduxFormFields';
import timezones from '../../constant/timezones';
import accountStatuses from '../../constant/accountStatuses';
import terms from '../../constant/terms';
import isRequired from '../../utils/validations/isRequired';

const required = isRequired();
interface InputFieldProps {
  label: string;
  placeholder?: string;
  name: string;
}
const SupplierDetails = () => (
  <Form>
    <Grid columns={3} divided={true} className={styles.grid}>
      <Grid.Row>
        <Grid.Column>
          <Field
            component={InputField}
            name="contactPerson"
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
          <Field component={SelectField} name="timezone" label="Timezone" options={timezones} />
        </Grid.Column>
        <Grid.Column>
          {/* todo: replace with correct keys values */}
          <Field component={SelectField} name="group" label="Group" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Field
            component={SelectField}
            name="accountStatus"
            label="Account Status"
            options={accountStatuses}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Field component={SelectField} name="terms" label="Terms" options={terms} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Field
            component={InputField}
            name="upchargeFee"
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
            name="freightFeeThreshhold"
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
  </Form>
);

const SupplierInformation = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Form>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={4}>
            <div className={styles.form_container}>
              <Field
                required={true}
                validate={required}
                component={InputField}
                name="supplierName"
                label="Supplier Name"
                placeholder="Supplier Name"
              />
              <Form.Field>
                <Field
                  required={true}
                  validate={required}
                  component={TextAreaField}
                  name="description"
                  label="Description"
                  placeholder="Write your latest update here"
                />
              </Form.Field>
              <Icon
                name={!detailsOpen ? 'arrow circle right' : 'arrow circle left'}
                className={styles.supplier_details_toggle}
                onClick={() => setDetailsOpen(!detailsOpen)}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={12}>{detailsOpen && <SupplierDetails />}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default reduxForm({ form: 'supplier-info', onSubmit: () => {} })(SupplierInformation);
