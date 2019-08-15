import React, {Suspense} from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../components/Loading';

const NotFound = Loadable({
  loader: () => import('../components/NotFound'),
  loading: Loading,
})

const HomePage = Loadable({
  loader: () => import('../modules/HomePage'),
  loading: Loading,
})

const Personal = Loadable({
  loader: () => import('../modules/Personal'),
  loading: Loading,
})

const Login = Loadable({
  loader: () => import('../modules/Login'),
  loading: Loading,
})


const Routes: React.SFC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/personal" exact component={Personal} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
export default Routes
