// Inspired by https://github.com/recruit-tech/redux-async-loader
// TODO: This code works on single Provider
let _registeredAsyncLoaders = []
export function asyncLoader(loader) {
  _registeredAsyncLoaders.push(loader)
  return (Component) => {
    return Component;
  };
}

export function deferLoader(loader) {
  return (WrappedComponent) => {
    return class WrapperComponent extends React.Component {
      static contextTypes = {
        store: React.PropTypes.object.isRequired
      }
      componentDidMount(nextProps) {
        const {store} = this.context
        loader(store.getState(), store);
      }
      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
  }
}

export const loadOnServer = async (store) => {
  store.dispatch({
    type: 'LOAD_ASYNC:START:SERVER'
  })
  await Promise.all(
    _registeredAsyncLoaders.map(loader => loader(store.getState(), store))
  )
  store.dispatch({
    type: 'LOAD_ASYNC:END:SERVER'
  })
}
