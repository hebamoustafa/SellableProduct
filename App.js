import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './src/redux/reducers';
import Home from './src/screens/HomeScreen';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
