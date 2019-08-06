import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProfileContainer extends Component {
  state = {
    expanded: false
  }

  static propTypes = {
    model: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    model: { id: 0 },
    title: 'Your Name'
  }
}
