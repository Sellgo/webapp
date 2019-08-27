import * as React from 'react';
import { Segment, Message, Icon, Button } from 'semantic-ui-react';

export default class SupplierModalPage4 extends React.Component<any, {}> {
  renderSupplyErrorMessages = () => {
    return this.props.supplyErrorMessages.map((message: string, index: number) => {
      return <Segment attached>{message}</Segment>;
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <p>For:{this.props.supplier_name}</p> */}
        {this.props.supplyErrorMessages.length !== 0 ? (
          <div>
            <Segment inverted color="red">
              Errors found in your supply file: {this.props.supplyErrorMessages.length}
            </Segment>
            <div style={{ overflowX: 'hidden', overflowY: 'scroll', maxHeight: '30vh' }}>
              {this.renderSupplyErrorMessages()}
            </div>
            <Message
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              warning
              attached="bottom"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name="warning" />
                <p style={{ marginTop: 0 }}>Please resolve all these errors to continue</p>
              </div>
              <Button
                floated="right"
                size="mini"
                primary={true}
                style={{ borderRadius: '20px' }}
                onClick={this.props.backToUpload}
              >
                Back to Upload
              </Button>
            </Message>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              minHeight: '40vh',
            }}
          >
            <Icon name="check circle" color={'blue'} size="massive" />
            <br />
            <h3>Successfully added {this.props.supplier_name} as supplier</h3>
          </div>
        )}
      </React.Fragment>
    );
  }
}
