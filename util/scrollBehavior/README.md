# next-scroll-restore

WIP and under testing.

This restores last scroll ammount on history.pushState and history.back

Just wrapped with scroll-behavior. Inspired by react-router-scroll.

![](https://i.gyazo.com/077bd6bb6368d82971bed4c9bb4c5174.gif)

## Example

```js
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
