import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Router from './router/router';

function App() {

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
