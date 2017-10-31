import React, { Component } from 'react';
import './App.css';
import Flickity from 'react-flickity-component';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Flickity
          className={'carousel'}
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
