export interface Order {
  start: Date;
  end: Date;
  name: string;
  id: number;
  subTasks?: Order[];
  color?: string;
}
