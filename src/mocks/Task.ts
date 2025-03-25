export type Task = {
  id: string;
  title: string;
  priority: 'warning' | 'high' | null;
  category: string;
  assignee: string;
  dueDate: string;
};

export const tasks: Task[] = [
  {
    id: '№ Т0041',
    title: 'Ремонт трактора',
    priority: null,
    category: 'Ремонт',
    assignee: 'Иванов И.И',
    dueDate: '14.11',
  },
  {
    id: '№ Т0042',
    title: 'Замена масла',
    priority: 'warning',
    category: 'Техническое обслуживание',
    assignee: 'Петров П.П',
    dueDate: '15.11',
  },
  {
    id: '№ Т0043',
    title: 'Настройка оборудования',
    priority: null,
    category: 'Настройка',
    assignee: 'Сидоров С.С',
    dueDate: '16.11',
  },
  {
    id: '№ Т0044',
    title: 'ремонт трактора',
    priority: 'high',
    category: 'Дефектовка',
    assignee: 'Иванов И.И.',
    dueDate: '16.11',
  },
  {
    id: '№ Т0045',
    title: 'Ремонт трактора',
    priority: null,
    category: 'Ремонт',
    assignee: 'Иванов И.И.',
    dueDate: '17.11',
  },
  {
    id: '№ Т0046',
    title: 'Ремонт трактора',
    priority: null,
    category: 'Ремонт',
    assignee: 'Иванов И.И.',
    dueDate: '18.11',
  },
  {
    id: '№ Т0047',
    title: 'Ремонт трактора',
    priority: null,
    category: 'Ремонт',
    assignee: 'Сидоров С.С',
    dueDate: '17.11',
  },
  {
    id: '№ Т0048',
    title: 'Ремонт трактора',
    priority: null,
    category: 'Ремонт',
    assignee: 'Сидоров С.С',
    dueDate: '18.11',
  },
];
