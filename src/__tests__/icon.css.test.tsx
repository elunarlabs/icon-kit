import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from '../icon';

// Basic test ensuring css class names appear and no tailwind-specific ones are required

describe('Icon CSS classes', () => {
  it('renders with base class', () => {
    const { container } = render(<Icon name="camera" />);
    const wrapper = container.querySelector('.elunar-icon');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies circle variant class', () => {
    const { container } = render(<Icon name="alarm-clock" variant="circle" />);
    expect(container.querySelector('.elunar-icon--circle')).toBeInTheDocument();
  });

  it('applies filled variant class', () => {
    const { container } = render(<Icon name="alarm-clock" variant="circleFilled" />);
    expect(container.querySelector('.elunar-icon--circleFilled')).toBeInTheDocument();
  });
});
