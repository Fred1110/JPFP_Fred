import React from 'react'
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import Main from './components/Main'
import store from './redux/store'

render(
  <Provider store={store}>
  <Main />
  </Provider>,
  document.querySelector('#root')
)
