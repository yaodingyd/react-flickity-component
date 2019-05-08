import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Flickity from '../src';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';


Enzyme.configure({ adapter: new Adapter() });

it('Calls render and componentDidMount', () => {
  sinon.spy(Flickity.prototype, 'componentDidMount');
  sinon.spy(Flickity.prototype, 'render');

  const flickity = mount(<Flickity/>);

  expect(Flickity.prototype.componentDidMount.calledOnce).toEqual(true);
  expect(Flickity.prototype.render.called).toEqual(true);
});

it('Consumes all flickity options', () => {

  const flickityOptions = {
      accessibility: false,
      cellAlign: 'left',
      dragThreshold: 3,
      freeScrollFriction: 2,
      friction: 2,
      percentPosition: false,
      resize: false,
      selectedAttraction: 1.025,
      setGallerySize: false,
      draggable: false,
      touchVerticalScroll: false,
      prevNextButtons: false,
      leftArrowText: '-',
      rightArrowText: '-',
      namespaceJQueryEvents: true,
      arrowShape: { x0: 20, x1: 60, y1: 50, x2: 70, y2: 40, x3: 10 },
      pageDots: false,
      pauseAutoPlayOnHover: false,
    }

  const flickity = mount(
    <Flickity
      className={'carousel'}
      options={flickityOptions}
      disableImagesLoaded={false}
      reloadOnUpdate
    >
    </Flickity>
    );
  const props = flickity.props();
  expect(props.options).toEqual(flickityOptions);

});

it('Renders children', () => {

  const flickity = mount(
    <Flickity
      className={'carousel'}
      disableImagesLoaded={false}
      reloadOnUpdate
    >
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
    </Flickity>
    );

  const children = flickity.instance().props.children;
  expect(children.length).toEqual(3);
});

it('Renders a static carousel', () => {
  const flickity = mount(
    <Flickity
      className={'carousel'}
      disableImagesLoaded={false}
      reloadOnUpdate
      static
    >
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
      <img src="/images/placeholder.png"/>
    </Flickity>
    );

  expect(flickity.find('.flickity-slider').length).toEqual(0);
  expect(flickity.find('img').length).toEqual(3);
})
