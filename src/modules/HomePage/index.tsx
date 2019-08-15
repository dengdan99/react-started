import React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router'
import Loadable from 'react-loadable'
import AuthorizedRoute from '../../routes/AuthorizedRoute';

import './index.HomePage.scss'
import { NavBar, Popover, Icon } from 'antd-mobile';
import Loading from '../../components/Loading';

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

// 这部分是坑点，一开始不知道配置，后发现react-rotuer的4.0版本下需要配置prop的接口
export interface HomePageContainerProps extends RouteComponentProps<{}> {
  /** MobX Stores will be injected via @inject() **/
}

const menus = [
  { name: 'home', path: '/' },
  { name: 'friend', path: '/home/friend' },
  { name: 'car', path: '/home/car' },
  { name: 'message', path: '/home/message' },
  { name: 'my', path: '/home/my' },
]

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
    )
  }
}

export default HomePageContainer;
