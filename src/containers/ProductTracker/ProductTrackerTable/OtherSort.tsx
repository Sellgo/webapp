import React from 'react';
import { Icon, Popup, Button, List, Divider, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface OtherSortProps {
  row: any;
  // handleUntrack: any;
  group: any;
  // handleMoveGroup:any;
}
class OtherSort extends React.Component<OtherSortProps> {
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
    const { row, group } = this.props;
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
            {group &&
              group.map((data: any) => (
                <List.Item
                  key={data.id}
                  // onClick={(id:any)=>handleMoveGroup(data.id)}
                >
                  {data.name}
                </List.Item>
              ))}
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
          <span className="untrack-span">
            <a href={row.amazon_url} target="_blank">
              View on Amazon
            </a>
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
          // onConfirm={(id:any) =>  handleUntrack(row.product_id)}
        />
      </div>
    );
  }
}

export default OtherSort;
