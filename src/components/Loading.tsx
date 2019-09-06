import React from 'react'
import { Toast } from 'antd-mobile'

interface LoadingProps {
  text?: string,
}

class Loading extends React.Component<LoadingProps> {
  componentDidMount () {
    Toast.loading(this.props.text || '加载中')
  }
  componentWillUnmount () {
    Toast.hide()
  }

  render () {
    return null
  }
}

export default Loading
