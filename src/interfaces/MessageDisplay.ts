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

export interface Steps {
  id: number;
  stepShow: boolean;
  stepClass: string;
  stepTitle: string;
  stepDescription: string;
  stepIcon: string;
}
