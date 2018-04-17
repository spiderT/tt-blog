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

  getChildContext() {
    return {title: "列表"};
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
App.childContextTypes = {
  title: React.PropTypes.string
};

ReactDOM.render(<App />, document.getElementById('main'))