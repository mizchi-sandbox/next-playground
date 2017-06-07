import Header from '../components/Header'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import logger from 'redux-logger'

const reducer = (state = { foo: '' }, action) => {
  switch (action.type) {
    case 'FOO':
      return { ...state, foo: action.payload }
    default:
      return state
  }
}

@withRedux(
  initialState => createStore(reducer, initialState, applyMiddleware(logger)),
  state => ({ foo: state.foo })
)
export default class Redux extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    // if (isServer) {
    //   await loadOnServer(store)
    // }
    return store.getState()
  }
  render() {
    return (
      <div>
        <Header />
        <h1>Redux</h1>
        <p>{this.props.foo}</p>
      </div>
    )
  }
}
