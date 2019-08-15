import React from 'react'

class Main extends React.Component<any, any> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      // 貌似有些兼容性错误没有修复 https://github.com/mobxjs/mobx-react-devtools/issues/117
      const DevTools = require('mobx-react-devtools').default
      return <DevTools />
    }
  }

  render () {
    return (
      <div className="contariner">
        {this.props.children}
        {/* {this.renderDevTool()} */}
      </div>
    )
  }
}

export default Main
