React Flickity Component
=======================

[![Greenkeeper badge](https://badges.greenkeeper.io/theolampert/react-flickity-component.svg)](https://greenkeeper.io/)
[![build status](https://travis-ci.org/theolampert/react-flickity-component.svg?branch=master)](https://travis-ci.org/theolampert/react-flickity-component/)
[![dependencies](https://david-dm.org/theolampert/react-flickity-component.svg)](https://david-dm.org/theolampert/react-flickity-component)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

#### Introduction:
A React.js Flickity component.

#### Install:

```shell
npm install react-flickity-component --save
// Or
yarn add react-flickity-component
```

#### Usage:

```javascript
// Commonjs
const Flickity = require('flickity');
// Or for ES2015 module
import Flickity from 'react-flickity-component'

const flickityOptions = {
    initialIndex: 2
}

function Carousel() {
  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
    >
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
    </Flickity>
  )
}

```
#### Example usage:
The examples folder contains an example use with create-react-app.

```
cd examples/react-flickity
yarn
yarn start
```

#### Props:

| Property             | Type       | Default | Description                                                   |
| -------------------- | -----------| --------|---------------------------------------------------------------|
| `className`          | `String`   | `''`    | Applied to top level wrapper                                  |
| `elementType`        | `String`   | `'div'` | Wrapper's element type                                        |
| `options`            | `Object`   | `{}`    | Flickity initialization opions                                |
| `disableImagesLoaded`| `Boolean`  | `false` | Disable call `reloadCells` images are loaded                  |
| `reloadOnUpdate`     | `Boolean`  | `false` | Run `reloadCells` and `resize` on `componentDidUpdate`        |
| `flickityRef`        | `Function` |         | like `ref` function, get Flickity instance in parent component|


#### Use Flickity's API and events

You can access Flickity instance with `flickityRef` prop just like `ref`, and use this instance to register events and use API.

```javascript


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


#### License Information:
[GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)

Flickity may be used in commercial projects and applications with the one-time purchase of a commercial license.
http://flickity.metafizzy.co/license.html
