import React, {Component} from 'react'

export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    return (
      <div>
        <h1>选中了吗: {this.props.checked > 0 ? '是' : '否'}</h1>
      </div>
    )
  }
}