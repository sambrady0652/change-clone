import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Grommet } from 'grommet';
import './index.css';
import App from './App';

import configureStore from './store/configureStore';
import { theme } from './Grommet/theme'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Grommet theme={theme}>
        <App />
      </Grommet>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
