import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

interface DeleteGroupModalProps {
  open: boolean;
  handleCancel: any;
  handleSubmit: any;
  groupId: any;
}

class DeleteGroupModal extends Component<DeleteGroupModalProps> {
  render() {
    const { open, handleCancel, handleSubmit, groupId } = this.props;
    return (
      <Modal
        as={Form}
        onSubmit={(e: any) => handleSubmit(groupId)}
        open={open}
        className="delete-group-modal"
      >
        <Modal.Header>Delete Group - Are you sure?</Modal.Header>
        <Modal.Content>
          Warning: The tracker group and all tracked products in the group will be removed.
        </Modal.Content>
        <Modal.Actions>
          <Button className="cancel-btn" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="delete-btn" negative type="submit">
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteGroupModal;
