import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:['haha','aaaa','bbbb','ccccc']
    }
  }

  render() {
    const {data} = this.state

    return(
      <div>
          <Son list={data} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))