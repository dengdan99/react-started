import React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router'
import Loadable from 'react-loadable'
import AuthorizedRoute from '../../routes/AuthorizedRoute';

import './index.HomePage.scss'
import { NavBar, Popover, Icon } from 'antd-mobile';
import Loading from '../../components/Loading';
import { inject, observer, Provider } from 'mobx-react';
import HomePageStore from './stores'
import LocationStore from '../../stores/LocationStore';

const Home = Loadable({
  loader: () => import('./containers/Home'),
  loading: Loading,
})
const Friend = Loadable({
  loader: () => import('./containers/Friend'),
  loading: Loading,
})
const Car = Loadable({
  loader: () => import('./containers/Car'),
  loading: Loading,
})
const Message = Loadable({
  loader: () => import('./containers/Message'),
  loading: Loading,
})
const My = Loadable({
  loader: () => import('./containers/My'),
  loading: Loading,
})

export interface HomePageContainerProps extends RouteComponentProps<{}> {
  locationStore: LocationStore
}

const menus = [
  { name: 'home', path: '/' },
  { name: 'friend', path: '/home/friend' },
  { name: 'car', path: '/home/car' },
  { name: 'message', path: '/home/message' },
  { name: 'my', path: '/home/my' },
]

@inject('locationStore')
@observer
class HomePageContainer extends React.Component<HomePageContainerProps, {}> {
  state = {
    menuVisible: false,
    selectedIndex: null,
  }

  onSelect = (opt: any) => {
    this.setState({
      menuVisible: false,
      selectedIndex: opt.key
    })
    this.props.history.push(menus[opt.key].path)
  }
  handlerVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible
    })
  }

  render () {
    return (
      <Provider {...HomePageStore}>
        <div className="homepage">
          <NavBar
            mode="light"
            rightContent={
              <Popover
                mask
                visible={this.state.menuVisible}
                overlay={menus.map((m, key) => (
                  <Popover.Item key={key}>{m.name}</Popover.Item>
                ))}
                onVisibleChange={this.handlerVisibleChange}
                onSelect={this.onSelect}
              >
                <Icon type="ellipsis" />
              </Popover>
            }
          >homepage</NavBar>
          <h2 className="my-title">this is home page container</h2>
          <p>{this.props.locationStore.coords ? this.props.locationStore.coords.longitude : '位置获取中'}</p>
          
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/home/friend" exact component={Friend}/>
            <Route path="/home/car" exact component={Car}/>
            <Route path="/home/message" exact component={Message}/>
            {/* <Route path="/home/my" exact component={My}/> */}
            <AuthorizedRoute path="/home/my" component={My}></AuthorizedRoute>
            <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </Provider>
    )
  }
}

export default HomePageContainer;
