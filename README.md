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
var React = require('react');
var Flickity = require('react-flickity-component')(React);

var flickityOptions = {
    initialIndex: 2
}

var Carousel = React.createClass({
    render: function () {
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
        );
    }
});

module.exports = Carousel;

```

#### License Information:
Flickity may be used in commercial projects and applications with the one-time purchase of a commercial license.
http://flickity.metafizzy.co/license.html