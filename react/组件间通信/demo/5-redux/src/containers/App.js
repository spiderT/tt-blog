import React,{Component}  from 'react'
import {connect} from 'react-redux'
import Check from '../components/check'
import Result from '../components/result'
import {actions} from '../actions'

class App  extends Component{


  render() {
    const props = this.props
    const state = this.state

    console.log('props', props);
    console.log('state', state);// state:null

    return (
      <div>
        <Result {...props} />
        <Check {...props} />
      </div>
    )
  }
}
export default connect(state => state, actions)(App)


