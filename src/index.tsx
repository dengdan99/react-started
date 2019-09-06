import React from 'react';
import ReactDOM from 'react-dom'
import 'amfe-flexible'
import Routes from './routes/index'
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker'
import stores from './stores'

const MOUNT_NODE = document.getElementById('root')

ReactDOM.render(
  <Provider {...stores}>
    <Routes></Routes>
  </Provider>,
  MOUNT_NODE
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
