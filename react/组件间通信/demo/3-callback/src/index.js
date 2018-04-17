import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false
    }
  }

  handleChange(value) {
    console.log('value', value);
    this.setState({
      value: value
    })
  }

  render() {

    const {value} = this.state

    return (
      <div>
        <h1>是否选中: {value > 0 ? '是' : '否'}</h1>
        <Son changeParent={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))