import React, {Component} from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange() {
    var newState = !this.state.checked
    this.setState({
      checked: newState
    })
    this.props.changeParent(newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.state.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}