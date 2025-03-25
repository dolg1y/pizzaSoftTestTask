import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import TaskPage from '../../pages/TaskPage';
import NotFoundPage from '../../pages/404';
import Garage from '../../pages/Garage';
import Calendar from '../../pages/Calendar';
import Shopping from '../../pages/Shopping';

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage title="Панель управления" />} />
    <Route path="/task" element={<TaskPage />} />
    <Route path="/calendar" element={<Calendar title="Календарь" />} />
    <Route path="/shopping" element={<Shopping title="Закупки" />} />
    <Route path="/garage" element={<Garage title="Гараж" />} />
    <Route path="/storage" element={<Garage title="Склад" />} />
    <Route path="/report" element={<Garage title="Отчёты" />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
