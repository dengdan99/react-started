import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { inject } from 'mobx-react';
import UserStore from '../../../stores/UserStore';
import { Button, WingBlank, WhiteSpace } from 'antd-mobile';

export interface MyProps extends RouteComponentProps<{}> {
  UserStore: UserStore
}

@inject('UserStore')
class My extends React.Component<MyProps> {

  onClickLogout = () => {
    this.props.UserStore.logout()
    this.props.history.push('/')
  }

  render () {
    return (
      <WingBlank>
        <h2>你好，{this.props.UserStore.nickname}</h2>
        <div><Link to="/personal/info">这里是个人中心</Link></div>
        <WhiteSpace />
        <Button onClick={this.onClickLogout}>退出</Button>
      </WingBlank>
    )
  }
}

export default My
