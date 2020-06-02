export interface Videos {
  description: string;
  title: string;
  url: string;
  id: string;
  area?: string;
}

export interface List {
  area: string;
  path: Videos[];
}

export interface Props {
  onVideoSelect: Function;
  selectArea: Function;
  screenWidth: number;
  data: Videos[];
  area: string;
}
