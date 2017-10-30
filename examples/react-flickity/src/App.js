import React, { Component } from 'react';
import './App.css';
import Flickity from 'react-flickity-component/src/index';

class App extends Component {
  render() {

    const flickityOptions = {
      initialIndex: 1
    }

    return (
      <div className="App">
        <Flickity
          className={'carousel'}
          elementType={'div'}
          options={flickityOptions}
          disableImagesLoaded={false}
        >
          <img alt="example" src="http://via.placeholder.com/600x350"/>
          <img alt="example" src="http://via.placeholder.com/600x350"/>
          <img alt="example" src="http://via.placeholder.com/600x350"/>
        </Flickity>
      </div>
    );
  }
}

export default App;
