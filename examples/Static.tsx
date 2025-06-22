import React, { useState } from 'react';
import Flickity from '../src/index';
import { images } from './images';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Static() {
  const [imgs, setImages] = useState(images);

  function addImage() {
    const newImages = [...imgs];
    newImages.push('https://picsum.photos/200/300');
    setImages(newImages);
  }

  return (
    <div className="example-card">
      <h3>Static Mode with Reload</h3>
      <p>Static carousel that reloads when content updates. Better for SSR but requires reloadOnUpdate for dynamic content.</p>
      <SyntaxHighlighter
        language="jsx"
        style={oneDark}
        customStyle={{ borderRadius: '8px', fontSize: '14px' }}
      >
        {`<Flickity static reloadOnUpdate>
  {children}
</Flickity>`}
      </SyntaxHighlighter>
      <div className="carousel">
        <Flickity static reloadOnUpdate>
          {imgs.map((image) => (
            <img src={image} key={image} className="carousel-image" />
          ))}
        </Flickity>
      </div>
      <button onClick={addImage}>Add image to carousel</button>
    </div>
  );
}
