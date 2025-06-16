import Flickity from '../src/index';
import './App.css';
import React from 'react';

import Default from './Default';
import Static from './Static';

function App() {
  return (
    <>
      <header>
        <nav>
          <a href="https://github.com/yaodingyd/react-flickity-component">
            Github
          </a>
        </nav>
        <h1>React-Flickity-Component</h1>
      </header>

      <main>
        <Default />
        <Static />
      </main>
    </>
  );
}

export default App;
