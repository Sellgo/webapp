import * as React from 'react';
import { Form, Grid, Input, Modal, TextArea, Segment, Dropdown } from 'semantic-ui-react';

export default class SupplierModalPage1 extends React.Component<any, {}> {
  headerOptions: any = [
    {
      key: '0',
      text: 'A',
      value: '1',
    },
    {
      key: '1',
      text: 'B',
      value: '2',
    },
    {
      key: '2',
      text: 'C',
      value: '3',
    },
    {
      key: '3',
      text: 'D',
      value: '4',
    },
    {
      key: '4',
      text: 'E',
      value: '5',
    },
  ];

  render() {
    return (
      <div className="supplierForm sellGoCard" style={{ maxHeight: '45vh' }}>
        <Modal.Header>
          <h2>Supplier Details</h2>
        </Modal.Header>
        <Grid columns={3}>
          <Grid.Column width={5}>
            <Grid.Column>
              <Grid.Row>
                <h4>Supplier Name*</h4>
              </Grid.Row>
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
              <Grid.Row>
                <h4>Description</h4>
              </Grid.Row>
              <Grid.Row floated="left">
                <Form>
                  <TextArea
                    value={this.props.supplier_description}
                    onChange={event => {
                      this.props.onChangeSupplierDescription(event);
                    }}
                    style={{ minHeight: '20vh' }}
                    placeholder="Supplier Description"
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Column>
          <Grid.Column width={5}>
            <Grid.Column>
              <Grid.Row>
                <h4>Contact Person</h4>
              </Grid.Row>
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
              <Grid.Row>
                <h4>Phone</h4>
              </Grid.Row>
              <Grid.Row floated="left">
                <Input
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder="Phone"
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <h4>Email</h4>
              </Grid.Row>
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
              <Grid.Row>
                <h4>Website</h4>
              </Grid.Row>
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
                  <Grid.Row>
                    <h4>Account Status</h4>
                  </Grid.Row>
                  <Grid.Row floated="left">
                    <Dropdown
                      name="title"
                      className={'supplyColumnDropDown'}
                      selectOnBlur={false}
                      fluid={true}
                      selection={true}
                      options={this.headerOptions}
                      placeholder="Status"
                      onChange={this.props.onChangeColumnHeaderKey}
                      value={this.props.account_status}
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>
                    <h4>Timezone</h4>
                  </Grid.Row>
                  <Grid.Row floated="left">
                    <Dropdown
                      name="title"
                      className={'supplyColumnDropDown'}
                      selectOnBlur={false}
                      fluid={true}
                      selection={true}
                      options={this.headerOptions}
                      value={this.props.timezone}
                      placeholder="Timezone"
                      onChange={this.props.onChangeColumnHeaderKey}
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>
                    <h4>Group</h4>
                  </Grid.Row>
                  <Grid.Row floated="left">
                    <Dropdown
                      name="title"
                      className={'supplyColumnDropDown'}
                      selectOnBlur={false}
                      fluid={true}
                      selection={true}
                      options={this.headerOptions}
                      value={this.props.group}
                      placeholder="Group"
                      onChange={this.props.onChangeColumnHeaderKey}
                    />
                  </Grid.Row>
                </Grid.Column>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <h4>Terms</h4>
              </Grid.Row>
              <Grid.Row floated="left">
                {/* <Input
                  onChange={event => {
                    this.props.onChangeSupplierName(event);
                  }}
                  placeholder=""
                /> */}
                <div className="multipleButtonRadio">
                  <div
                    onClick={() => this.props.onChangeTerms('paid')}
                    className={this.props.terms === 'paid' ? 'radioButtonActive' : 'radioButton'}
                  >
                    <p>Paid when order</p>
                  </div>
                  <div
                    onClick={() => this.props.onChangeTerms('30')}
                    className={this.props.terms === '30' ? 'radioButtonActive' : 'radioButton'}
                  >
                    <p>30 Days</p>
                  </div>
                  <div
                    onClick={() => this.props.onChangeTerms('60')}
                    className={this.props.terms === '60' ? 'radioButtonActive' : 'radioButton'}
                  >
                    <p>60 Days</p>
                  </div>
                  <div
                    onClick={() => this.props.onChangeTerms('90')}
                    className={this.props.terms === '90' ? 'radioButtonActive' : 'radioButton'}
                  >
                    <p>90 Days</p>
                  </div>
                  <div
                    onClick={() => this.props.onChangeTerms('custom')}
                    className={this.props.terms === 'custom' ? 'radioButtonActive' : 'radioButton'}
                  >
                    <p>Custom</p>
                  </div>
                </div>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '2em' }}
              >
                <Grid.Column>
                  <Grid.Row>
                    <h4>Upcharge Fee (%)</h4>
                  </Grid.Row>
                  <Grid.Row>
                    <Input
                      fluid
                      label={{ basic: true, content: '%' }}
                      style={{ width: '120px !important', height: '30px' }}
                      labelPosition="right"
                      placeholder="Upcharge Fee"
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>
                    <h4>Freight Free Threshold ($)</h4>
                  </Grid.Row>
                  <Grid.Row>
                    <Input
                      fluid
                      label={{ basic: true, content: '$' }}
                      style={{ width: '140px !important', height: '30px' }}
                      labelPosition="right"
                      placeholder="Free Threshold"
                    />
                  </Grid.Row>
                </Grid.Column>
              </div>
            </Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
