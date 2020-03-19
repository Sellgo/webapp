import React from 'react';
import { Grid, Form } from 'semantic-ui-react';
import { success } from '../../../utils/notifications';
import { EmailSuccess } from '../../../components/ToastMessages';

const Email = () => {
  const changePass = () => {
    success(EmailSuccess);
  };

  return (
    <>
      <Grid.Column width={16}>
        <Form>
          <Form.Group>
            <Form.Input placeholder="Email" name="email" type="email" />
            <Form.Button onClick={changePass} className="primary-btn" content="Update" />
          </Form.Group>
        </Form>
      </Grid.Column>
    </>
  );
};

export default Email;
