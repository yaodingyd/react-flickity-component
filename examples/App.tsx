import Flickity from '../src/index';
import './App.css';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Default from './Default';
import Static from './Static';

function App() {
  const [activeTab, setActiveTab] = useState('examples');

  const apiDocs = {
    installation: {
      title: 'Installation',
      bash: `# Install flickity as peer dependency (use v2.3.0 for best experience)
npm install flickity@2.3.0
npm install react-flickity-component`
    },
    basicUsage: {
      title: 'Basic Usage',
      javascript: `// CommonJS
const Flickity = require('react-flickity-component');

// ES2015 module
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
}`
    },
    props: {
      title: 'Props',
      content: `# Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`className\` | \`String\` | \`''\` | Applied to top level wrapper |
| \`elementType\` | \`String\` | \`'div'\` | Wrapper's element type |
| \`options\` | \`Object\` | \`{}\` | Flickity initialization options |
| \`disableImagesLoaded\` | \`Boolean\` | \`false\` | Disable call \`reloadCells\` images are loaded |
| \`flickityRef\` | \`Function\` | | Like \`ref\` function, get Flickity instance in parent component |
| \`reloadOnUpdate\` | \`Boolean\` | \`false\` | Run \`reloadCells\` and \`resize\` on \`componentDidUpdate\` |
| \`static\` | \`Boolean\` | \`false\` | Carousel contents are static and not updated at runtime |`
    },
    apiEvents: {
      title: 'API & Events',
      description: 'You can access the Flickity instance with `flickityRef` prop and use this instance to register events and use API.',
      javascript: `// Function component
function Carousel() {
  const ref = React.useRef(null);

  const myCustomNext = () => {
    // You can use Flickity API
    ref.current.next()
  }

  React.useEffect(() => {
    if (ref.current) {
      ref.current.on("settle", () => {
        console.log(\`current index is \${ref.current.selectedIndex}\`);
      });
    }
  }, []);

  return (
    <>
      <Flickity flickityRef={c => ref.current = c}>
        <img src="/images/placeholder.png"/>
        <img src="/images/placeholder.png"/>
        <img src="/images/placeholder.png"/>
      </Flickity>
      <Button onClick={myCustomNext}>My custom next button</Button>
    </>
  )
}`
    }
  };

  const CodeBlock = ({ code, language }: { code: string; language: string }) => (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        borderRadius: '8px',
        fontSize: '14px',
        margin: '1rem 0'
      }}
    >
      {code}
    </SyntaxHighlighter>
  );

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><a href="https://github.com/yaodingyd/react-flickity-component" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.npmjs.com/package/react-flickity-component" target="_blank" rel="noopener noreferrer">NPM</a></li>
          </ul>
        </nav>
        <h1>React Flickity Component</h1>
        <p>A React.js component for <a href="https://flickity.metafizzy.co/" target="_blank" rel="noopener noreferrer">Flickity</a> to build touch-friendly carousels</p>
      </header>

      <main>
        <nav className="tab-nav">
          <button 
            className={activeTab === 'examples' ? 'active' : ''}
            onClick={() => setActiveTab('examples')}
          >
            Examples
          </button>
          <button 
            className={activeTab === 'docs' ? 'active' : ''}
            onClick={() => setActiveTab('docs')}
          >
            Documentation
          </button>
        </nav>

        {activeTab === 'examples' && (
          <section className="examples-section">
            <Default />
            <Static />
          </section>
        )}

        {activeTab === 'docs' && (
          <section className="docs-section">
            <nav className="docs-nav">
              <ul>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#basic-usage">Basic Usage</a></li>
                <li><a href="#props">Props</a></li>
                <li><a href="#api-events">API & Events</a></li>
              </ul>
            </nav>
            
            <div className="docs-content">
              <article id="installation">
                <h2>{apiDocs.installation.title}</h2>
                <CodeBlock code={apiDocs.installation.bash} language="bash" />
              </article>
              
              <article id="basic-usage">
                <h2>{apiDocs.basicUsage.title}</h2>
                <CodeBlock code={apiDocs.basicUsage.javascript} language="javascript" />
              </article>
              
              <article id="props">
                <h2>Props</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>className</code></td><td><code>String</code></td><td><code>''</code></td><td>Applied to top level wrapper</td></tr>
                    <tr><td><code>elementType</code></td><td><code>String</code></td><td><code>'div'</code></td><td>Wrapper's element type</td></tr>
                    <tr><td><code>options</code></td><td><code>Object</code></td><td><code>{}</code></td><td>Flickity initialization options</td></tr>
                    <tr><td><code>disableImagesLoaded</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Disable call <code>reloadCells</code> images are loaded</td></tr>
                    <tr><td><code>flickityRef</code></td><td><code>Function</code></td><td></td><td>Like <code>ref</code> function, get Flickity instance in parent component</td></tr>
                    <tr><td><code>reloadOnUpdate</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Run <code>reloadCells</code> and <code>resize</code> on <code>componentDidUpdate</code></td></tr>
                    <tr><td><code>static</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Carousel contents are static and not updated at runtime</td></tr>
                  </tbody>
                </table>
              </article>
              
              <article id="api-events">
                <h2>{apiDocs.apiEvents.title}</h2>
                <p>{apiDocs.apiEvents.description}</p>
                <CodeBlock code={apiDocs.apiEvents.javascript} language="javascript" />
              </article>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p><a href="https://github.com/yaodingyd/react-flickity-component">Contribute on GitHub</a></p>
      </footer>
    </>
  );
}

export default App;
