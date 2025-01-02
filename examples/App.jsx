import Flickity from '../src/index.js'
import './App.css'
import React from 'react'

import Default from './Default.jsx'
import Static from './Static.jsx'

function App() {
  return (
    <>
      <header>
        <nav>
          <a href="https://github.com/yaodingyd/react-flickity-component">Github</a>
        </nav>
        <h1>React-Flickity-Component</h1>
      </header>

      <main>
        <Default />
        <Static />
      </main>
    </>
  )
}

export default App
