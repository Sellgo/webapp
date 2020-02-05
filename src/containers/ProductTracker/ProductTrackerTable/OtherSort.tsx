import React from 'react';
import { Icon, Popup, Button, List, Divider, Confirm } from 'semantic-ui-react';

interface OtherSortProps {
  row: any;
  activeRow: any;
  handleUntrack: any;
  group: any;
  confirm: any;
  handleConfirmMessage: any;
  handleCancel: any;
  handleMoveGroup: any;
}
class OtherSort extends React.Component<OtherSortProps> {
  render() {
    const {
      row,
      activeRow,
      group,
      handleUntrack,
      handleCancel,
      confirm,
      handleConfirmMessage,
      handleMoveGroup,
    } = this.props;
    return (
      <div className="other-sort">
        {/* <Icon className="bell slash" /> */}

        <Popup
          className="groups-popup"
          basic={true}
          on="click"
          trigger={
            <Icon
              link
              className="folder"
              data-toggle="tooltip"
              data-placement="middle"
              title="Move to a Different Group"
            />
          }
          position="bottom right"
        >
          <List>
            {group &&
              group.map((data: any) => {
                return (
                  <List.Item
                    key={data.id}
                    onClick={(id: any, tackID: any) => handleMoveGroup(data.id, row.id)}
                  >
                    {data.name}
                  </List.Item>
                );
              })}
          </List>
        </Popup>
        <Popup
          basic
          on="click"
          className="untrack-popup"
          trigger={<Icon link className="ellipsis vertical" />}
          position="bottom right"
          hideOnScroll={true}
        >
          <span className="untrack-span">
            <a href={row.amazon_url} target="_blank">
              {'View on Amazon'}
            </a>
          </span>
          <Divider />
          <Button
            style={{ color: 'red', background: 'transparent' }}
            onClick={() => handleConfirmMessage(row)}
          >
            Untrack Product
          </Button>
        </Popup>
        <Confirm
          className="confirmation-box"
          open={confirm}
          header="Are you sure?"
          content="This will remove the product from the tracker."
          onCancel={handleCancel}
          onConfirm={(e: any) => handleUntrack(activeRow.product_track_group_id, activeRow.id)}
        />
      </div>
    );
  }
}

export default OtherSort;
