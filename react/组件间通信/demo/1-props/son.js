import React, {Component} from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {list} = this.props

    return (
      <div>
        <ul>list.map(item=>
          <li>item</li>
          )
        </ul>
      </div>
    )
  }
}