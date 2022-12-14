import React from 'react';
import {it, expect, vi, afterEach } from 'vitest';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import Flickity from '../src';

afterEach(() => {
  cleanup();
});


it('Calls render and componentDidMount', () => {
  const componentDidMountSpy = vi.spyOn(Flickity.prototype, 'componentDidMount');
  const renderSpy = vi.spyOn(Flickity.prototype, 'render');

  render(<Flickity/>);

  expect(componentDidMountSpy).toHaveBeenCalledOnce();
  expect(renderSpy).toHaveBeenCalled();
});

it('Renders children', async () => {
  const { getAllByAltText } = render(
    <Flickity>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
    );

  await waitFor(() => expect(getAllByAltText('children').length).toEqual(3));
});

it('Renders a static carousel', () => {
  const { getAllByAltText, rerender } = render(
    <Flickity static>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
    );

  expect(getAllByAltText('children').length).toEqual(2);
})

it('Reload carousel even it\'s static', () => {
  const { getAllByAltText, rerender } = render(
    <Flickity static reloadOnUpdate>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
    );

  expect(getAllByAltText('children').length).toEqual(2);

  rerender(
    <Flickity static reloadOnUpdate>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
  );
  expect(getAllByAltText('children').length).toEqual(3);
})
