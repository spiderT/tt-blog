import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class Father extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:['haha','aaaa','bbbb','ccccc']
    }
  }

  render() {
    return(
      <div>
          <Son list={this.state.data} />
      </div>
    )
  }
}

ReactDOM.render(<Father />, document.getElementById('main'))