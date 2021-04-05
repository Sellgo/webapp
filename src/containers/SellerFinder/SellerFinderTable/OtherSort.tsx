import React from 'react';
import { Icon, Popup, Confirm, Menu, Divider, Header, Segment } from 'semantic-ui-react';
import { clamp } from 'lodash';
import Untrack from '../../../assets/images/untrack.svg';
import Folder from '../../../assets/images/folder-plus.svg';

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
      handleCancel,
      confirm,
      handleConfirmMessage,
      handleMoveGroup,
    } = this.props;
    const { trackGroupsOpen, otherOptionsOpen } = this.state;

    return (
      <div className="other-sort">
        <Popup
          basic={true}
          on="click"
          onOpen={() => this.setTrackGroupsOpen(true)}
          onClose={() => this.setTrackGroupsOpen(false)}
          open={trackGroupsOpen}
          trigger={
            <img
              src={Folder}
              title={group && !group.length ? 'No Groups Available' : 'Move to a Different Group'}
              style={{
                cursor: group && !group.length ? 'default' : 'pointer',
              }}
            />
          }
          disabled={group && !group.length}
          position="bottom right"
          hideOnScroll={false}
          style={{
            padding: 0,
            height: group ? `${clamp(4 + group.length * 40, 44, 404)}px` : 0,
            overflowY: 'auto',
          }}
        >
          <Menu fluid={true} vertical={true}>
            {group.length > 0 &&
              group
                .slice()
                .sort((group: any, other: any) => (group.id > other.id ? 1 : -1))
                .map((data: any) => {
                  return (
                    <Menu.Item
                      key={data.id}
                      onClick={() => {
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
          basic={true}
          on="click"
          className="untrack-popup"
          trigger={<Icon link={true} className="ellipsis vertical" />}
          position="bottom right"
          hideOnScroll={true}
          style={{ padding: 0 }}
          onOpen={() => this.setOtherOptionsOpen(true)}
          onClose={() => this.setOtherOptionsOpen(false)}
          open={otherOptionsOpen}
        >
          <Menu fluid={true} vertical={true}>
            <Menu.Item
              className="untrack-link"
              style={{ color: 'red' }}
              onClick={() => {
                this.setOtherOptionsOpen(false);
                handleConfirmMessage(row);
              }}
            >
              <img src={Untrack} alt="Untrack" />
              {`Delte Seller`}
            </Menu.Item>
          </Menu>
        </Popup>
        <Confirm
          className="confirmation-box"
          open={confirm && activeRow.id === row.id}
          cancelButton="No"
          confirmButton="Yes"
          content={
            <Segment placeholder>
              <Header as="h4" icon>
                This will remove the seller from the table.
                <Header.Subheader>Are you sure?</Header.Subheader>
              </Header>
              <Divider clearing />
            </Segment>
          }
          onCancel={handleCancel}
          onConfirm={() => {
            console.log('conrimed');
          }}
        />
      </div>
    );
  }
}

export default OtherSort;
