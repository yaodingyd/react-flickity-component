import { useState } from 'react'
import Flickity from '../src/index.js'
import { images } from './images.js'

export default function Default() {
  const [imgs, setImages] = useState(images)

  function addImage() {
    const newImages = [...imgs]
    newImages.push('https://picsum.photos/200/300')
    setImages(newImages)
  }
  
  return (
    <>
      <h3>Static</h3>
      <pre>
        &lt;Flickity static reloadOnUpdate&gt;&#123;children&#125;&lt;&#47;Flickity&gt;
      </pre>
      <p className="carousel">
        <Flickity static reloadOnUpdate>
          {imgs.map(image => <img src={image} key={image} className="carousel-image"/>)}
        </Flickity>
      </p>
      <button onClick={addImage}>Add image to carousel</button>
    </>
  )
}