import { combineReducers } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeList';
import positionReducer from './slices/positionList';
import tasksReducer from './slices/taskList';
import statusObjectivesReducer from './slices/statusList';
import categoryReducer from './slices/categoryList';
import counterCategoryReducer from './slices/counterCategory';

const rootReducer = combineReducers({
  employees: employeeReducer,
  position: positionReducer,
  tasks: tasksReducer,
  statusObjectives: statusObjectivesReducer,
  category: categoryReducer,
  counterCategory: counterCategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
