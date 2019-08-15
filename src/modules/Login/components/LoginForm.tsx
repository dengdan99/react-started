import React from 'react'
import { List, InputItem, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { getVerifyCode } from '../../../api';
import { trim } from '../../../utils';

interface LoginFormProps {
  loading: boolean,
  submitHandler: (mobile: string, code: string) => void
}

interface LoginFormState {
  mobile: string
  code: string
  verifyButtonText: string
  verifyButtonDisabled: boolean
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  readonly state: LoginFormState = {
    mobile: '',
    code: '',
    verifyButtonText: '获取验证码',
    verifyButtonDisabled: false,
  }

  public timer: any
  public countdown = 60

  onclickHandler = () => {
    this.props.submitHandler(trim(this.state.mobile, true), this.state.code)
  }
  onClickVerifyButton = () => {
    if (!this.state.mobile) {
      Toast.info('请输入手机号码')
      return
    }
    this.setState({verifyButtonDisabled: true})
    getVerifyCode({tel: trim(this.state.mobile, true)}).then(res => {
      if (res.code === 0) {
        this.setTimer()
      } else {
        Toast.info(res.msg)
        this.setState({verifyButtonDisabled: false})
      }
    })
  }
  setTimer () {
    this.timer = setInterval(() => {
      if (this.countdown < 0) {
        this.setState({
          verifyButtonText: '获取验证码',
          verifyButtonDisabled: false,
        })
        clearInterval(this.timer)
      } else {
        this.setState({
          verifyButtonText: this.countdown + '秒后再次获取'
        })
      }
      this.countdown--
    }, 1000)
  }

  render () {
    return (
      <React.Fragment>
        <WhiteSpace />
        <List>
          <InputItem
            type="phone"
            placeholder="请输入手机号"
            onChange={value => this.setState({mobile: value})}
            value={this.state.mobile}
          >手机号</InputItem>
          <InputItem
            type="number"
            placeholder="请输入验证码"
            onChange={value => this.setState({code: value})}
            value={this.state.code}
            extra={<Button size="small" disabled={this.state.verifyButtonDisabled} onClick={this.onClickVerifyButton}>{this.state.verifyButtonText}</Button>}
          >验证码</InputItem>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button loading={this.props.loading} onClick={this.onclickHandler}>提交</Button>
        </WingBlank>
      </React.Fragment>
    )
  }
}

export default LoginForm
