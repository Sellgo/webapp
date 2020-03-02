import React from 'react';
import { Rail, Segment } from 'semantic-ui-react';
import './index.scss';

export default function MessageDisplay(props: any) {
  return (
    <Rail internal={true} position="left">
      <Segment id="segment-container"></Segment>
    </Rail>
  );
}

export function setMessage(header: string, message: string, type: string, time: number) {
  // Need to be refactored cause I can't figure out the way to pushed it to the parent element <Segment></Segment> on above code
  /*
    The final code would be something like this
    <Message 
        success={type}
        error={type}
        header={header}
        content={message}
    />
  */

  const segmentContainer = document.getElementById('segment-container') as HTMLElement;
  const messageContainer = document.createElement('div');
  const messageContent = document.createElement('div');
  const headerContent = document.createElement('div');
  const paragraph = document.createElement('p');
  messageContainer.id = 'messageContainer';
  messageContainer.className = `ui ${type} message`;
  messageContent.className = 'content';
  headerContent.className = 'header';
  segmentContainer.appendChild(messageContainer);
  messageContainer.appendChild(messageContent);
  headerContent.innerHTML = header;
  paragraph.innerHTML = message;
  messageContent.appendChild(headerContent);
  messageContent.appendChild(paragraph);

  setTimeout(() => {
    messageContainer.remove();
  }, time);
}
