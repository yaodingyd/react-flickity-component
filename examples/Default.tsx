import React, { useState } from 'react';
import Flickity from '../src/index';
import { images } from './images';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Default() {
  const [imgs, setImages] = useState(images);

  function addImage() {
    const newImages = [...imgs];
    newImages.push('https://picsum.photos/200/300');
    setImages(newImages);
  }

  return (
    <div className="example-card">
      <h3>Default Usage</h3>
      <p>Basic Flickity carousel with default settings. Children are dynamically managed.</p>
      <SyntaxHighlighter
        language="jsx"
        style={oneDark}
        customStyle={{ borderRadius: '8px', fontSize: '14px' }}
      >
        {`<Flickity>{children}</Flickity>`}
      </SyntaxHighlighter>
      <div className="carousel">
        <Flickity>
          {imgs.map((image) => (
            <img src={image} key={image} className="carousel-image" />
          ))}
        </Flickity>
      </div>
      <button onClick={addImage}>Add image to carousel</button>
    </div>
  );
}
