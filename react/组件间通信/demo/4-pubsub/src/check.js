import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Check extends Component {
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
    PubSub.publish('checkmessage',newState)
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