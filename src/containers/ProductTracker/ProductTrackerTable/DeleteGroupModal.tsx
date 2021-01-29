import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

import './DeleteGroupModal.scss';

interface DeleteGroupModalProps {
  open: boolean;
  handleUntrack: any;
  groupId: any;
  activeGroup: any;
  filteredProducts: any;
  handleMoveGroup: any;
}

class DeleteGroupModal extends Component<DeleteGroupModalProps> {
  render() {
    const {
      open,
      handleUntrack,
      groupId,
      activeGroup,
      filteredProducts,
      handleMoveGroup,
    } = this.props;

    return (
      <Modal
        open={open}
        centered
        closeOnDocumentClick={true}
        size={'small'}
        className="delete-group-modal"
      >
        <Modal.Header>
          <Icon name="trash alternate" className="delete-modal-trash-icon" />
          Deleting {activeGroup && activeGroup.name ? activeGroup.name : 'Group'}
        </Modal.Header>

        <Modal.Content>
          <p className="content-text">Do you want to keep the items in the group tracked?</p>
        </Modal.Content>

        <Modal.Actions>
          <Button className="cancel-btn" onClick={() => handleUntrack(groupId)}>
            Untrack
          </Button>
          <Button
            className="delete-btn"
            onClick={() => {
              filteredProducts.forEach((product: any) => {
                handleMoveGroup(null, product.id);
              });
              handleUntrack(groupId);
            }}
          >
            Keep Tracking
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteGroupModal;
