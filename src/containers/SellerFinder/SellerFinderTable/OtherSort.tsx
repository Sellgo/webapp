import React from 'react';
import { Icon, Popup, Confirm, Menu, Divider, Header, Segment } from 'semantic-ui-react';
import { clamp } from 'lodash';
import Folder from '../../../assets/images/folder-plus.svg';
import './index.scss';
import { openLink } from '../../../utils/format';

interface OtherSortProps {
  row: any;
  activeRow: any;
  handleUntrack: any;
  group: any;
  confirm: any;
  handleConfirmMessage: any;
  handleCancel: any;
  handleMoveGroup: any;
  handleRefresh: () => void;
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
      handleUntrack,
      handleRefresh,
    } = this.props;

    const { trackGroupsOpen, otherOptionsOpen } = this.state;

    return (
      <div className="other-sort-sf">
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
                        handleMoveGroup(row.id, data.id);
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
          className="untrack-popup-sf actions"
          trigger={<Icon link={true} className="ellipsis vertical" />}
          position="bottom right"
          hideOnScroll={true}
          style={{ padding: 0, marginBottom: 0, borderRadius: 15 }}
          onOpen={() => this.setOtherOptionsOpen(true)}
          onClose={() => this.setOtherOptionsOpen(false)}
          open={otherOptionsOpen}
        >
          <Menu fluid={true} vertical={true} className={'action-menu'}>
            <Menu.Item onClick={() => openLink(row.inventory_link)}>
              <p>
                <Icon name={'external alternate'} /> View On Amazon
              </p>
            </Menu.Item>
            <Menu.Item onClick={() => console.log('To do')}>
              <p>
                <Icon name={'download'} />
                Export As
              </p>
            </Menu.Item>
            <Menu.Item onClick={handleRefresh}>
              <p>
                <Icon name={'refresh'} />
                Refresh
              </p>
            </Menu.Item>
            <Menu.Item
              className="untrack-link"
              onClick={() => {
                this.setOtherOptionsOpen(false);
                handleConfirmMessage(row);
              }}
            >
              <p>
                <Icon name={'trash'} /> Delete Seller
              </p>
            </Menu.Item>
          </Menu>
        </Popup>
        <Confirm
          className="confirmation-box-sf"
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
          onConfirm={() => handleUntrack(row.id)}
        />
      </div>
    );
  }
}

export default OtherSort;
