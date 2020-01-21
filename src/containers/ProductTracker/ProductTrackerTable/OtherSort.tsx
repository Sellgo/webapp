import React from 'react';
import { Icon, Popup, Button, List, Divider, Confirm } from 'semantic-ui-react';

class OtherSort extends React.Component {
  state = {
    confirm: false,
  };

  handleConfirmMessage = () => {
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
          trigger={
            <Icon
              className="folder"
              data-toggle="tooltip"
              data-placement="middle"
              title="Move to a Different Group"
            />
          }
          position="bottom right"
          hideOnScroll={true}
          positionFixed={true}
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
          className="untrack-popup"
          trigger={<Icon className="ellipsis vertical" />}
          position="bottom right"
          hideOnScroll={true}
          positionFixed={true}
        >
          <span className="untrack-span">View on Amazon</span>
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
