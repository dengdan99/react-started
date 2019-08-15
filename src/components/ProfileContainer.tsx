import { Component } from 'react'

interface IProps {
  model: object,
  title: string,
}

interface IState {
  expanded: boolean,
}

export default class ProfileContainer extends Component<IProps, IState> {
  public state: IState = {
    expanded: false
  }


  rander () {
    return <div>
      <h1>{this.props.title}</h1>
      <p>{this.props.model}</p>
    </div>
  }
}
