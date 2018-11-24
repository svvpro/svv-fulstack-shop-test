export interface User {
  email: string;
  password: string;
}

export interface Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}

export interface Position {
  name: string;
  cost: number;
  category: string;
  quantity?: number;
  user?: string;
  _id?: string;
}

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface Filter {
  order?: number;
  start?: Date;
  end?: Date;
}

export interface OverviewPage {
  gain: OverviewPageItem;
  orders: OverviewPageItem;
}

export interface OverviewPageItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHire: boolean;
}

export interface AnalyticPage {
  average: number;
  chart: AnalyticChart[];
}

export interface AnalyticChart {
  label: string;
  gain: number;
  order: number;
}


export interface Message {
  message: string;
}
