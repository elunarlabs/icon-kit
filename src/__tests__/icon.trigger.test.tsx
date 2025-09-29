import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Icon } from '../icon';

// JSDOM based test for external trigger activation

describe('Icon external trigger', () => {
  it('does not set data-anim until trigger hovered', () => {
    const { container } = render(
      <>
        <div data-icon-trigger="nav-main" data-testid="trigger">Hover me</div>
        <Icon name="camera" animation="spin" triggerId="nav-main" />
      </>
    );
  let inner = container.querySelector('.elunar-icon__inner');
  expect(inner?.getAttribute('data-anim')).toBeNull();
    const trigger = container.querySelector('[data-testid="trigger"]')!;
  act(() => { fireEvent.mouseEnter(trigger); });
  inner = container.querySelector('.elunar-icon__inner');
  expect(inner?.getAttribute('data-anim')).toBe('spin');
    fireEvent.mouseLeave(trigger);
  inner = container.querySelector('.elunar-icon__inner');
  expect(inner?.getAttribute('data-anim')).toBeNull();
  });
});
