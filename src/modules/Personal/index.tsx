import React, { lazy } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router'

const Info = lazy(() => import('./containers/info'))

interface PersonalContainerProps extends RouteComponentProps<{}> {
}

class PersonalContainer extends React.Component<PersonalContainerProps, {}> {
  render () {
    return(
      <Switch>
        <Route path="/personal/info" exact component={Info} />
      </Switch>
    )
  }
}


export default PersonalContainer
