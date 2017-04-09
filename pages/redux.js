import Header from '../components/Header'
import {createStore, applyMiddleware} from "redux";
import {connect, Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import logger from 'redux-logger'
import {loadOnServer, asyncLoader, deferLoader} from '../util/next-async-loader'

const reducer = (state = {foo: ''}, action) => {
  console.log('Reduce', action)
  switch (action.type) {
    case 'FOO':
      return {...state, foo: action.payload};
    default:
      return state
  }
}

@withRedux(
  initialState => createStore(reducer, initialState, applyMiddleware(logger)),
  state => ({foo: state.foo})
)
export default class Redux extends React.Component {
  static async getInitialProps({store, isServer, pathname, query}) {
    if (isServer) {
      await loadOnServer(store)
    }
    return store.getState()
  }
  render() {
    return <div>
      <Header/>
      <h1>Redux</h1>
      <p>{this.props.foo}</p>
      <Child/>
    </div>
  }
}

@asyncLoader(async (props, store) => store.dispatch({type: 'FOO', payload: 'Init on Child'}))
@deferLoader(async (props, store) => store.dispatch({type: 'FOO', payload: 'Init on Child defer'}))
@connect()
class Child extends React.Component {
  render() {
    return <span onClick={_ev => this.props.dispatch({type: 'FOO', payload: 'clicked'})}>Child</span>
  }
}
