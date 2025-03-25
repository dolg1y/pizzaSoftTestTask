import { Dayjs } from 'dayjs';

export interface PageProps {
  title: string;
}

export interface Props {
  open: boolean;
  onClose: () => void;
}

export interface MenuItem {
  path: string;
  icon: React.ReactNode;
}
export interface Employee {
  objectId: string;
  fullName: string;
  birthdate?: any;
  position?: string;
  transport?: string;
  phone?: string;
  email?: string;
}

export interface Transport {
  objectId: string;
  transport: string;
}

export interface Category {
  objectId: string;
  category: string;
}

export interface StatusObjectives {
  objectId: string;
  status: string;
}

export interface Position {
  objectId: string;
  position: string;
}

export interface counterCategory {
  objectId: string;
  name: string;
  number: string;
}

export interface Task {
  objectId?: string;
  taskId?: string;
  taskCategory: string;
  taskTitle: string;
  taskPriority: string;
  taskRangeDateStart?: { __type: 'Date'; iso: Dayjs } | null;
  taskRangeDateEnd?: { __type: 'Date'; iso: Dayjs } | null;
  taskAssigneeName: string;
  assigneePhoto?: {
    __type: 'File';
    name: string;
    url: string;
  };
  description: string;
  taskTransport: string;
}
