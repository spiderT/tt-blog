import React, {Component} from 'react'

export default class Check extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange() {
    var newState = this.props.checked
    this.props.check(newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.props.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}