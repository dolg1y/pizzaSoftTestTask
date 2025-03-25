import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeeReducer from './slices/employeeList';
import transportReducer from './slices/transportList';
import positionReducer from './slices/positionList';
import tasksReducer from './slices/taskList';
import categoryReducer from './slices/categoryList';
import statusObjectivesReducer from './slices/statusList';
import counterCategoryReducer from './slices/counterCategory';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'tasks',
    'employees',
    'transport',
    'position',
    'category',
    'statusObjectives',
    'counterCategory',
  ],
};

const rootReducer = combineReducers({
  employees: employeeReducer,
  transport: transportReducer,
  position: positionReducer,
  category: categoryReducer,
  statusObjectives: statusObjectivesReducer,
  tasks: tasksReducer,
  counterCategory: counterCategoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
