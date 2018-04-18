import React from 'react'
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { reducer, initState } from './reducers'


let buildStore = compose(applyMiddleware(thunk))(createStore)
let store = buildStore(reducer, initState)

export default class Page extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('main'))
