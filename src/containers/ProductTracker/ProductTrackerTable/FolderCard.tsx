import * as React from 'react';
import { Card, Divider, Button, Confirm } from 'semantic-ui-react';

const FolderCard = (props: any) => {
  const { folder, unTrack, confirm, confirmMessage, handleCancel } = props;

  return (
    <div className={folder ? 'folder-card' : 'untrack-card'}>
      <Card>
        <Card.Content>
          {folder && (
            <div>
              <span>Ungrouped</span>
              <br />
              <span>Group 1</span>
              <br />
              <span>Group 2</span>
              <br />
              <span>Group 3</span>
            </div>
          )}
          {unTrack && (
            <div>
              <span className="untrack-span">
                <h4> View on Amazon</h4>
              </span>
              <Divider />
              <Button style={{ color: 'red', background: 'transparent' }} onClick={confirmMessage}>
                Untrack Product{' '}
              </Button>
              <Confirm
                className="confirmation-box"
                open={confirm}
                header="Are you sure ?"
                content="This will delete (n) Tracked Products"
                onCancel={handleCancel}
                // onConfirm={this.handleConfirm}
              />
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default FolderCard;
