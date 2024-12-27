export interface Headers {
  head: string;
  location: number | undefined;
}

export interface TableProps<T> {
  handleData?: () => Promise<T[]>;
  data: T[];
  headers: Headers[];
  thInRowHeaders?: Headers[];
  columnButton?: string;
  columnButtonFunction?: (item: T) => void;
}