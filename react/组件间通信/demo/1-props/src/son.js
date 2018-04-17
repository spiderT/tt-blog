import React, {Component} from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {list} = this.props

    const option = list.map(item=><li key={item}>{item}</li>)

    return (
      <div>
        <ul>{option}</ul>
      </div>
    )
  }
}