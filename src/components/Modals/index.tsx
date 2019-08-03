import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import './index.css';

interface ModalsProps {
  open: boolean;
  close: any;
  title: string;
  size: string;
  bCloseIcon: boolean;
}

export class Modals extends React.Component<ModalsProps, {}> {
  render() {
    const { open, close, children, title, bCloseIcon } = this.props;
    return (
      <Modal
        open={open}
        onClose={close}
        size={'small'}
        className="customeModal"
        closeIcon={bCloseIcon}
      >
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>{children}</Modal.Content>
      </Modal>
    );
  }
}
