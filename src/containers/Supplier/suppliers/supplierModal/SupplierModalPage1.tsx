import * as React from 'react';
import { Form, Grid, Input, Modal, TextArea } from 'semantic-ui-react';

export default class SupplierModalPage1 extends React.Component<any, {}> {
  render() {
    return (
      <Modal.Content style={{ maxHeight: '45vh' }}>
        <Modal.Header>
          <h2>Supplier Details</h2>
        </Modal.Header>
        <Grid columns={3}>
          <Grid.Column width={5}>
            <Grid.Column>
              <Grid.Row>Supplier Name*</Grid.Row>
              <Grid.Row floated="left">
                <Input
                  value={this.props.supplier_name}
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder="Supplier Name"
                  className={
                    !!this.props.supplierFormError.supplier_name_error ? 'ui error input' : ''
                  }
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>Description</Grid.Row>
              <Grid.Row floated="left">
                <Form>
                  <TextArea
                    value={this.props.supplier_description}
                    onChange={event => {
                      this.props.onChangeSupplierDescription(event);
                    }}
                    style={{ minHeight: '25vh' }}
                    placeholder="Supplier Description"
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Column>
          <Grid.Column width={5}>
            <Grid.Column>
              <Grid.Row>Contact Person</Grid.Row>
              <Grid.Row floated="left">
                <Input
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder="Contact Person"
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>Contact Number</Grid.Row>
              <Grid.Row floated="left">
                <Input
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder="Contact Number"
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>Email</Grid.Row>
              <Grid.Row floated="left">
                <Input
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder="Email Address"
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>Website</Grid.Row>
              <Grid.Row floated="left">
                <Input
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder="Website"
                />
              </Grid.Row>
            </Grid.Column>
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid.Column>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridColumnGap: '2em',
                }}
              >
                <Grid.Column>
                  <Grid.Row>Account Status</Grid.Row>
                  <Grid.Row floated="left">
                    <Input
                      fluid
                      onChange={event => {
                        this.props.onChangeSupplierName(event);
                      }}
                      placeholder=""
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>Timezone</Grid.Row>
                  <Grid.Row floated="left">
                    <Input
                      fluid
                      onChange={event => {
                        this.props.onChangeSupplierName(event);
                      }}
                      placeholder=""
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>Group</Grid.Row>
                  <Grid.Row floated="left">
                    <Input
                      fluid
                      onChange={event => {
                        this.props.onChangeSupplierName(event);
                      }}
                      placeholder=""
                    />
                  </Grid.Row>
                </Grid.Column>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>Terms</Grid.Row>
              <Grid.Row floated="left">
                <Input
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder=""
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '2em' }}
              >
                <Grid.Column>
                  <Grid.Row>Upcharge Fee (%)</Grid.Row>
                  <Grid.Row>
                    <Input
                      fluid
                      label={{ basic: true, content: '%' }}
                      style={{ width: '120px !important' }}
                      labelPosition="right"
                      placeholder="Upcharge Fee"
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>Freight Free Threshold ($)</Grid.Row>
                  <Grid.Row>
                    <Input
                      fluid
                      label={{ basic: true, content: '$' }}
                      style={{ width: '140px !important' }}
                      labelPosition="right"
                      placeholder="Free Threshold"
                    />
                  </Grid.Row>
                </Grid.Column>
              </div>
            </Grid.Column>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    );
  }
}
