import React, { lazy } from 'react'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

const LoginContainer = lazy(() => import('./containers/LoginContainer'))

interface PersonalContainerProps extends RouteComponentProps<{}> {
}

class PersonalContainer extends React.Component<PersonalContainerProps, {}> {
  render () {
    return(
      <Switch>
        <Route path="/login" exact component={LoginContainer}></Route>
      </Switch>
    )
  }
}


export default PersonalContainer
