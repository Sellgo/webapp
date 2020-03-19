import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

const Phone = () => {
  return (
    <>
      <Grid.Column width={16}>
        <Form>
          <Form.Group>
            <Form.Input placeholder="Phone Number +1[***]*** ****" name="phone" type="tel" />
            <Form.Button className="primary-btn" content="Update" />
          </Form.Group>
        </Form>
      </Grid.Column>
    </>
  );
};

export default Phone;
