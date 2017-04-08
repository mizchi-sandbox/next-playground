import { readState, saveState } from './DOMStorage';

const STATE_KEY_PREFIX = '@@scroll|'

// modified StateStorage from react-router-scroll
export default class StateStorage {
  getFallbackLocationKey(location) {
    return location
  }

  read(location, key) {
    return readState(this.getStateKey(location, key));
  }

  save(location, key, value) {
    saveState(this.getStateKey(location, key), value);
  }

  getStateKey(location, key) {
    const locationKey = location.key || this.getFallbackLocationKey(location);
    const stateKeyBase = `${STATE_KEY_PREFIX}${locationKey}`;
    return key == null ? stateKeyBase : `${stateKeyBase}|${key}`;
  }
}
