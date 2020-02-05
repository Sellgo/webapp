import React from 'react';
import { Icon, Popup, Confirm, Menu } from 'semantic-ui-react';
import { clamp } from 'lodash';

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
  state = {
    trackGroupsOpen: false,
    otherOptionsOpen: false,
  };

  setTrackGroupsOpen = (open: boolean) => this.setState({ trackGroupsOpen: open });
  setOtherOptionsOpen = (open: boolean) => this.setState({ otherOptionsOpen: open });

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
    const { trackGroupsOpen, otherOptionsOpen } = this.state;

    return (
      <div className="other-sort">
        {/* <Icon className="bell slash" /> */}

        <Popup
          basic={true}
          on="click"
          onOpen={() => this.setTrackGroupsOpen(true)}
          onClose={() => this.setTrackGroupsOpen(false)}
          open={trackGroupsOpen}
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
          hideOnScroll={false}
          style={{
            padding: 0,
            height: `${clamp(4 + group.length * 40, 44, 404)}px`,
            overflowY: 'auto',
          }}
        >
          <Menu fluid vertical>
            {group &&
              group
                .slice()
                .sort((group: any, other: any) => (group.id > other.id ? 1 : -1))
                .map((data: any) => {
                  return (
                    <Menu.Item
                      key={data.id}
                      onClick={(id: any) => {
                        this.setTrackGroupsOpen(false);
                        handleMoveGroup(data.id, row.id);
                      }}
                    >
                      {data.name}
                    </Menu.Item>
                  );
                })}
          </Menu>
        </Popup>

        <Popup
          basic
          on="click"
          className="untrack-popup"
          trigger={<Icon link className="ellipsis vertical" />}
          position="bottom right"
          hideOnScroll={true}
          style={{ padding: 0 }}
          onOpen={() => this.setOtherOptionsOpen(true)}
          onClose={() => this.setOtherOptionsOpen(false)}
          open={otherOptionsOpen}
        >
          <Menu fluid vertical>
            <Menu.Item as="a" href={row.amazon_url} target="_blank">
              {`View on Amazon`}
            </Menu.Item>
            <Menu.Item
              style={{ color: 'red' }}
              onClick={() => {
                this.setOtherOptionsOpen(false);
                handleConfirmMessage(row);
              }}
            >
              {`Untrack Product`}
            </Menu.Item>
          </Menu>
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
