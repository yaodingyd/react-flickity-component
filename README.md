React Flickity Component
=======================

# Introduction:
A React.js Flickity component.

# Install:

```shell
# you need to install flickity as peer dependency, please use v2.3.0 for best experience
npm install flickity@2.3.0
npm install react-flickity-component
```

# Usage:

## V5 Updates
V5 supports react v19 and above. 

## V4 Updates
V4 only supports react v18 and above. V4 also comes with an esmodule bundle format to support modern frontend tooling like vite.
If you are staying on react v16, please keep using v3. 

```javascript
// Commonjs
const Flickity = require('react-flickity-component');
// Or for ES2015 module
import Flickity from 'react-flickity-component'

const flickityOptions = {
    initialIndex: 2
}

function Carousel() {
  return (
    <Flickity
      className={'carousel'}                
      elementType={'div'}                   
      options={flickityOptions}
      disableImagesLoaded
      reloadOnUpdate
      static
    >
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
    </Flickity>
  )
}

```
### Example Usage:
See a codesandbox example here:
https://codesandbox.io/s/react-flickity-demo-wwszqm

See an example with server side rendering:

https://github.com/theolampert/react-flickity-component-example

And with typescript:

https://github.com/theolampert/react-flickity-component-example/tree/typescript


### Props:

| Property             | Type       | Default | Description                                                   |
| -------------------- | -----------| --------|---------------------------------------------------------------|
| `className`          | `String`   | `''`    | Applied to top level wrapper                                  |
| `elementType`        | `String`   | `'div'` | Wrapper's element type                                        |
| `options`            | `Object`   | `{}`    | Flickity initialization options                                |
| `disableImagesLoaded`| `Boolean`  | `false` | Disable call `reloadCells` images are loaded                  |
| `flickityRef`        | `Function` |         | Like `ref` function, get Flickity instance in parent component|
| `reloadOnUpdate`     | `Boolean`  | `false` | **Read next section before you set this prop.** Run `reloadCells` and `resize` on `componentDidUpdate`        |                      
| `static`             | `Boolean`  | `false` | **Read next section before you set this prop.** Carousel contents are static and not updated at runtime. Useful for smoother server-side rendering however the carousel contents cannot be updated dynamically.   |  

### How it works

Under the hood, react-flickity-component uses a [React Portal](https://reactjs.org/docs/portals.html) to render children slides inside a Flickity instance. The need for a portal is because after Flickity is initialized, new DOM nodes (mostly Flickity wrapper elements) would be created, this changes the DOM hierarchy of the parent component, thus any future update, whether it's originated from Flickity, like adding/removing slides, or from parent, like a prop changes, will make React fail to reconcile for the DOM snapshot is out of sync. 

[#64](https://github.com/yaodingyd/react-flickity-component/pull/64) introduced a new prop to change the underlying render method: instead of using portal, react-flickity-component will directly render children. This is to create a smoother server-side rendering experience, but **please be aware using `static` prop possibly will cause all your future update to fail,** which means adding/removing slides will definitely fail to render, so use with caution.

However there is a fail-safe option `reloadOnUpdate`. It means every time there is a update, we tear down and set up Flickity. This will ensure that Flickity is always rendered correctly, but it's a rather costly operation and it **will cause a flicker** since DOM nodes are destroyed and recreated. Please also note it means any update, either rerender of the parent, or any of the props change, will always cause an update in the Flickity component. For more information, see a detailed explanation and workaround in [#147](https://github.com/yaodingyd/react-flickity-component/issues/147).


### Use Flickity's API and events

You can access the Flickity instance with `flickityRef` prop just like `ref`, and use this instance to register events and use API.

```javascript
// function component
function Carousel () {
  const ref = React.useRef(null);

  function myCustomNext = () {
    // You can use Flickity API
    ref.current.next()
  }

  React.useEffect(() => {
    if (ref.current) {
      ref.current.on("settle", () => {
        console.log(`current index is ${ref.current.selectedIndex}`);
      });
    }
  }, []);

  return (
      <Flickity flickityRef={c => ref.current = c}>
        <img src="/images/placeholder.png"/>
        <img src="/images/placeholder.png"/>
        <img src="/images/placeholder.png"/>
      </Flickity>
      <Button onClick={myCustomNext}>My custom next button</Button>
    )
}
// class component
class Carousel extends React.Component {

  componentDidMount = () => {
    // You can register events in componentDidMount hook
    this.flkty.on('settle', () => {
      console.log(`current index is ${this.flkty.selectedIndex}`)
    })
  }

  myCustomNext = () => {
    // You can use Flickity API
    this.flkty.next()
  }

  render() {
    return (
      <Flickity flickityRef={c => this.flkty = c}>
        <img src="/images/placeholder.png"/>
        <img src="/images/placeholder.png"/>
        <img src="/images/placeholder.png"/>
      </Flickity>
      <Button onClick={myCustomNext}>My custom next button</Button>
    )
  }
}
```


# License Information:
[GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)

Flickity may be used in commercial projects and applications with the one-time purchase of a commercial license.
http://flickity.metafizzy.co/license.html

See [this issue](https://github.com/theolampert/react-flickity-component/issues/23#issuecomment-493294512) for more information
