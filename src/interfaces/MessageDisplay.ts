import React, { ReactNode } from 'react';

export interface Detail {
  id: number;
  header: string;
  content: string;
}

export interface MessageTypes {
  messSucc: boolean;
  messPassErr: boolean;
  messageDetails: Detail[];
}
