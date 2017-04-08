import ScrollBehavior from 'scroll-behavior'
import StateStorage from './StateStorage'

export default ({addTransitionHook, shouldUpdateScroll} = {}) => {
  return new ScrollBehavior({
    addTransitionHook() {
      if (addTransitionHook) {
        addTransitionHook()
      }
    },
    stateStorage: new StateStorage(),
    getCurrentLocation() {
      if (global.window) {
        return location.pathname
      } else {
        0
      }
    },
    shouldUpdateScroll: shouldUpdateScroll
  })
}
