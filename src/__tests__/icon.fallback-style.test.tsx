import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Icon } from '../icon';

// This test ensures inline fallback styles provide circle shape & centering even if external CSS is absent.
// (JSDOM doesn't apply external stylesheet anyway, so we assert inline styles.)

describe('Icon inline fallback styles', () => {
  it('applies inline-flex & centering styles', () => {
    const { container } = render(<Icon name="camera" variant="circle" size={40} />);
    const wrapper = container.querySelector('.elunar-icon');
    expect(wrapper).toBeInTheDocument();
    const style = wrapper as HTMLElement;
    expect(style.style.display).toBe('inline-flex');
    expect(style.style.alignItems).toBe('center');
    expect(style.style.justifyContent).toBe('center');
  });

  it('circle variant has borderRadius inline fallback', () => {
    const { container } = render(<Icon name="camera" variant="circle" size={40} />);
    const wrapper = container.querySelector('.elunar-icon');
    const style = wrapper as HTMLElement;
    expect(parseInt(style.style.borderRadius || '0')).toBeGreaterThan(0);
  });
});
