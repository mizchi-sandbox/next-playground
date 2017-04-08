# next-scroll-restore

WIP and testing.

This restores last scroll ammount on history.pushState and history.back

Just wrapped with scroll-behavior. Inspired by react-router-scroll.

## Example

```js
import next
import Router from 'next/router'
import applyScrollRestore from 'next-scroll-restore'

// Wrap original onRouteChangeComplete
applyScrollRestore({addTransitionHook: Router.onRouteChangeComplete})
```

## TODO

- [ ] Skip
- [ ] Dog fooding
- [ ] Packaging
- [ ] Publish
