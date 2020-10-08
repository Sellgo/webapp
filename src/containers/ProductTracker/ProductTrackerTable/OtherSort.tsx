import React from 'react';
import {
  Icon,
  Popup,
  Confirm,
  Menu,
  Divider,
  Header,
  Segment,
  Modal,
  Input,
  Button,
} from 'semantic-ui-react';
import { clamp } from 'lodash';
import Amazon from '../../../assets/images/link.svg';
import Untrack from '../../../assets/images/untrack.svg';
import Folder from '../../../assets/images/folder-plus.svg';
import COUNTRY_IMAGE from '../../../assets/images/flag_icon.svg';
import { PRODUCT_ID_TYPES } from '../../../constants/UploadSupplier';

interface OtherSortProps {
  row: any;
  activeRow: any;
  handleUntrack: any;
  group: any;
  confirm: any;
  handleConfirmMessage: any;
  handleCancel: any;
  handleMoveGroup: any;
  handleEdit: (row: any) => void;
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
            {group &&
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
            <Menu.Item className="amazon-link" as="a" href={row.amazon_url} target="_blank">
              <img src={Amazon} alt="Amazon" />
              {`View on Amazon`}
            </Menu.Item>

            <Modal
              trigger={
                <Menu.Item className={'edit-cost'}>
                  <Icon className="pencil" />
                  {`Edit`}
                </Menu.Item>
              }
              className="edit-cost-modal"
              content={
                <div className="edit-cost-container">
                  <div className="product-description-details">
                    <div className="product-details-image">
                      <img src={row.image_url} alt={'product image'} />
                    </div>
                    <div>
                      <div>
                        <h3 className="product-title">{row.title}</h3>
                      </div>
                      <div className="details">
                        <div>
                          <img
                            className="flag-img"
                            src={COUNTRY_IMAGE}
                            alt="product_img"
                            style={{ width: 40 }}
                          />
                        </div>
                        <div className="asin-details">
                          <p className="asin-text">{row.asin}</p>
                          <p className="asin-sub-text">
                            {PRODUCT_ID_TYPES.filter(pidType => pidType !== 'ASIN')
                              .filter(pidType => pidType.toLowerCase() in row)
                              .map(pidType => row[pidType.toLowerCase()])[0] || ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="edit-cost-fields">
                    <div className="cost-labels">
                      <div>
                        <h5 className="cost-input-label">{'Current cost of Good Sold'}</h5>
                      </div>
                      <div>
                        <h5 className="cost-input-value">{'New cost of Good Sold'}</h5>
                      </div>
                    </div>
                    <div className="cost-values">
                      <div className="cost-value">
                        <p>${row.avg_price}</p>
                      </div>
                      <div className="cost-input">
                        <Input focus />
                      </div>
                      <div className="action-buttons">
                        <Button content="Cancel" basic color="red" />
                        <Button content="Save" primary />
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Menu.Item
              className="untrack-link"
              style={{ color: 'red' }}
              onClick={() => {
                this.setOtherOptionsOpen(false);
                handleConfirmMessage(row);
              }}
            >
              <img src={Untrack} alt="Untrack" />
              {`Untrack Product`}
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
                This will remove the product from the tracker.
                <Header.Subheader>Are you sure?</Header.Subheader>
              </Header>
              <Divider clearing />
            </Segment>
          }
          onCancel={handleCancel}
          onConfirm={() => handleUntrack(activeRow.product_track_group_id, activeRow.id)}
        />
      </div>
    );
  }
}

export default OtherSort;
