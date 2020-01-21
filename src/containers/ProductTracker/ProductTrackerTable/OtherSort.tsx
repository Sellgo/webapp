import React from 'react';
import { Icon, Popup, Button, List, Divider, Confirm } from 'semantic-ui-react';

class OtherSort extends React.Component {
  state = {
    confirm: false,
  };

  handleConfirmMessage = () => {
    const { confirm } = this.state;
    this.setState({
      confirm: true,
    });
  };
  handleCancel = () => {
    this.setState({
      confirm: false,
    });
  };

  render() {
    const { confirm } = this.state;
    return (
      <div className="other-sort">
        {/* <Icon className="bell slash" /> */}

        <Popup
          basic={true}
          on="click"
          trigger={<Icon className="folder" />}
          position="bottom right"
          hideOnScroll={true}
        >
          <List>
            <List.Item>UnGrouped</List.Item>
            <List.Item>Group 1</List.Item>
            <List.Item>Group 2</List.Item>
            <List.Item>Group 3</List.Item>
          </List>
        </Popup>
        <Popup
          basic
          on="click"
          trigger={<Icon className="ellipsis vertical" />}
          position="bottom right"
          hideOnScroll={true}
        >
          <span className="untrack-span">
            <h4> View on Amazon</h4>
          </span>
          <Divider />
          <Button
            style={{ color: 'red', background: 'transparent' }}
            onClick={this.handleConfirmMessage}
          >
            Untrack Product{' '}
          </Button>
        </Popup>
        <Confirm
          className="confirmation-box"
          open={confirm}
          header="Are you sure ?"
          content="This will delete (n) Tracked Products"
          onCancel={this.handleCancel}
          // onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default OtherSort;
