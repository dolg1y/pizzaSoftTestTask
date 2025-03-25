import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/global.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import AppRouter from './components/AppRouter/AppRouter';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FlexGrid from './components/layout/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import BreadCumb from './components/BreadCumbs/BreadCumbs';

dayjs.locale('ru');

const theme = createTheme({
  typography: {
    fontFamily: '"Gilroy", sans-serif',
    h1: {
      lineHeight: 'none',
    },
    h2: {
      lineHeight: 'none',
    },
    h3: {
      lineHeight: 'none',
    },
    h4: {
      lineHeight: 'none',
    },
    h5: {
      lineHeight: 'none',
    },
    h6: {
      lineHeight: 'none',
    },
    body1: {
      lineHeight: 'none',
    },
    body2: {
      lineHeight: 'none',
    },
    button: {
      lineHeight: 'none',
    },
    caption: {
      lineHeight: 'none',
    },
    overline: {
      lineHeight: 'none',
    },
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff08',
    },
    error: {
      main: '#c55050',
    },
    success: {
      main: '#b9ff66',
    },
  },
});

const usePageTitle = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const routes: Record<string, string> = {
      '/': 'Панель управления',
      '/profile': 'Задачи',
      '/garage': 'Гараж',
      '/task': 'Задачи',
    };

    setTitle(routes[location.pathname] ?? 'Страница не найдена');
  }, [location.pathname]);

  return title;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider
        adapterLocale="ru"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
        dateAdapter={AdapterDayjs}
      >
        <Provider store={store}>
          <PersistGate
            loading={<CircularProgress size={24} />}
            persistor={persistor}
          >
            <BrowserRouter>
              <div className="App">
                <AppContent />
              </div>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

const AppContent = () => {
  const title = usePageTitle();

  return (
    <div className="AppContent">
      <Header />
      <BreadCumb title={title} />
      <FlexGrid marginBottom="20px" style={{ flexGrow: 1 }}>
        <Sidebar />
        <FlexGrid style={{ flexGrow: 1 }}>
          <AppRouter />
        </FlexGrid>
      </FlexGrid>
    </div>
  );
};

export default App;
