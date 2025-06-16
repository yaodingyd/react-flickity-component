import React from 'react';
import {it, expect, vi, afterEach } from 'vitest';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import Flickity from '../src';

afterEach(async () => {
  await new Promise(resolve => setTimeout(resolve, 0));
  cleanup();
});


it('Renders component successfully', async () => {
  const { container } = render(<Flickity/>);
  
  await waitFor(() => {
    expect(container.firstChild).toBeTruthy();
  });
  
  expect(container.firstChild).toBeInstanceOf(HTMLElement);
});

it('Renders children', async () => {
  const { getAllByAltText, unmount, container } = render(
    <Flickity>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
    );
  
  await waitFor(() => {
    expect(container.firstChild).toBeTruthy();
  });

  await waitFor(() => expect(getAllByAltText('children').length).toEqual(3));
  unmount();
});

it('Renders a static carousel', async () => {
  const { getAllByAltText, unmount } = render(
    <Flickity static>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
    );

  await waitFor(() => expect(getAllByAltText('children').length).toEqual(2));
  unmount();
});

it('Reload carousel even it\'s static', async () => {
  const { getAllByAltText, rerender, unmount } = render(
    <Flickity static reloadOnUpdate>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
    );

  await waitFor(() => expect(getAllByAltText('children').length).toEqual(2));

  rerender(
    <Flickity static reloadOnUpdate>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
      <img src="/images/placeholder.png" alt="children"/>
    </Flickity>
  );
  
  await waitFor(() => expect(getAllByAltText('children').length).toEqual(3));
  unmount();
});
