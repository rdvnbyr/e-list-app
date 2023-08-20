import React from 'react';
import ReactDOM from 'react-dom/client';

import {I18nextProvider} from 'react-i18next';
import i18n from './includes/i18n';

import './assets/css/index.css';
import './assets/css/tailwind.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
