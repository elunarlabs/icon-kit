import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from '../icon';

describe('Icon accessibility & fallback', () => {
  it('applies aria-label and role when ariaLabel provided', () => {
    const { container } = render(<Icon name="camera" ariaLabel="Kamera" />);
    const wrapper = container.querySelector('[role="img"]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.getAttribute('aria-label')).toBe('Kamera');
  });

  it('sets aria-hidden when decorative and no ariaLabel', () => {
    const { container } = render(<Icon name="camera" decorative />);
    const wrapper = container.querySelector('.elunar-icon');
    expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders fallback when icon missing', () => {
    const { container } = render(<Icon name="non-existent-xyz" fallback={<span data-fallback>?</span>} />);
    const fallback = container.querySelector('[data-fallback]');
    expect(fallback).toBeInTheDocument();
  });
});
