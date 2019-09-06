import React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import UserStore from '../stores/UserStore';

interface AuthorizedRouteProps extends RouteProps {
  userStore?: UserStore
}

@inject('userStore')
class AuthorizedRoute extends React.Component <AuthorizedRouteProps> {
  componentDidMount () {
  }
  render () {
    const { component: Component, ...rest } = this.props
    if (!Component) return null
    return (
      <Route 
        {...rest}
        render={props => {
          return (this.props.userStore && this.props.userStore.isLogin) ?
          (<Component {...props} />) : (<Redirect to={{pathname: '/login', state: {from: props.location}}} />)
        }}
      ></Route>
    )
  }
}

export default AuthorizedRoute
