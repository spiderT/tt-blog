import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  componentDidMount() {
    this.pubsub_check = PubSub.subscribe('checkmessage',function (topic, message) {
      this.setState({
        checked:message
      })
    }.bind(this))
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.pubsub_check)
  }

  render() {

    return (
      <div>
        <h1>选中了吗: {this.state.checked > 0 ? '是' : '否'}</h1>
      </div>
    )
  }
}