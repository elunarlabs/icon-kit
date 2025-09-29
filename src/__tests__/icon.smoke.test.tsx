import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Icon } from '../icon';

describe('Icon component', () => {
  it('renders a basic lucide icon', () => {
    render(<Icon name="camera" />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('returns null for unknown icon', () => {
    const { container } = render(<Icon name="definitely-not-real-icon" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Font Awesome brand icon when kit="fa-brands"', () => {
    render(<Icon name="github" kit="fa-brands" />);
    const fa = document.querySelector('svg');
    expect(fa).toBeInTheDocument();
  });

  it('applies circle variant styles', () => {
    render(<Icon name="alarm-clock" variant="circle" color="#000" />);
    const wrapper = document.querySelector('span[data-variant="circle"]');
    expect(wrapper).toBeInTheDocument();
  });
});
