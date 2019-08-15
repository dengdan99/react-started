import * as React from 'react'

interface IProps {
  text?: string,
}

const NotFound: React.SFC<IProps> = (props) => {
  return (
    <div>{props.text || '在不到页面 404'}</div>
  )
}

export default NotFound
