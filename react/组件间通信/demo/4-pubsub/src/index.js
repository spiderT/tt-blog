import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Check from './check'
import Result from './result'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    return (
      <div>
        <Result />
        <Check />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))