import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';

import * as serviceWorkerRegistration from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './index.css';
import './styles/global.scss';

serviceWorkerRegistration.register();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </StyledEngineProvider>
);

reportWebVitals();
