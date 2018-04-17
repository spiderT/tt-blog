import React, {Component} from 'react'

export default class GrandSon extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div>
        <h1>{this.context.title}</h1>
      </div>
    )
  }
}

GrandSon.contextTypes = {
  title: React.PropTypes.string
}