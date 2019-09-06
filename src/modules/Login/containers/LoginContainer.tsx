import React from 'react'
import { inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router'
import UserStore from '../../../stores/UserStore'
import LoginForm from '../components/LoginForm';
import { Toast } from 'antd-mobile';

interface LoginContainerProps extends RouteComponentProps<{}> {
  userStore: UserStore
}
interface LoginContainerState {
  loading: boolean
}

@inject('userStore')
class LoginContainer extends React.Component<LoginContainerProps, LoginContainerState> {
  readonly state: LoginContainerState = {
    loading: false
  }

  onSubmit = (mobile: string, code: string) => {
    const { userStore } = this.props
    const { loading } = this.state
    if (loading) return
    this.setState({loading: true})
    userStore.signIn({
      tel: mobile,
      ver_code: code,
      current_city: 3267
    }).then(data => {
      Toast.success('登陆成功')
      this.props.history.push('/')
    }).catch(msg => {
      Toast.info(msg)
      this.setState({loading: false})
    })
  }

  render () {
    return (
      <div>
        <h1>用户登陆</h1>
        <LoginForm
          loading={this.state.loading}
          submitHandler={this.onSubmit}
        ></LoginForm>
      </div>
    )
  }
}




export default LoginContainer
