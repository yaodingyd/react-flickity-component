React Flickity Component
=======================

#### Introduction:
A React.js Flickity component.

#### Install:

```shell
npm install react-flickity-component --save
```

#### Usage:

```javascript
// Commonjs
import Flickity from 'react-flickity-component'
// Or for ES2015 module
import Flickity from 'react-flickity-component/src/index'

const flickityOptions = {
    initialIndex: 2
}

function Carousel() {
  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'span'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
    >
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
    </Flickity>
  )
}

export default Carousel

```

#### License Information:
Flickity may be used in commercial projects and applications with the one-time purchase of a commercial license.
http://flickity.metafizzy.co/license.html
