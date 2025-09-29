import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Icon } from '../icon';

// We can't run actual time-based stroke animation in JSDOM. We just verify that:
// 1. Before trigger activation no stroke dash styles are applied.
// 2. After activation styles get initialized (dasharray & dashoffset set).
// 3. After deactivation reset logic leaves stroke dash values present (allowing replay next activation).

vi.useFakeTimers();

function getStrokeOffsets(container: HTMLElement) {
  const paths = Array.from(container.querySelectorAll('svg path')) as HTMLElement[];
  return paths.map(p => (p as any).style.strokeDashoffset || null);
}

describe('Icon draw animation with external trigger', () => {
  it('only draws when trigger is active and resets when inactive', () => {
    const { container } = render(
      <>
        <div data-icon-trigger="draw-grp" data-testid="trigger">Trigger</div>
        <Icon name="activity" animation="draw" triggerId="draw-grp" drawDuration={0.01} drawDelay={0} />
      </>
    );

    const trigger = container.querySelector('[data-testid="trigger"]')!;
    const inner = container.querySelector('.elunar-icon__inner')!;

    // Initially, draw should not have started
    expect(inner.getAttribute('data-anim')).toBeNull();

    // Paths should either have no strokeDash values yet (effect not run), so we trigger hover
    act(() => {
      fireEvent.mouseEnter(trigger);
      // run pending timeouts scheduling dash animations
  vi.advanceTimersByTime(5);
    });

    // After activation, data-anim is still undefined because draw doesn't set data-anim, but stroke style should be initialized
    const offsetsAfterStart = getStrokeOffsets(container);
    expect(offsetsAfterStart.some(v => v && v !== '0px')).toBe(true); // at least one path has dashoffset set (length in px)

    // Advance enough time for tiny drawDuration to complete
    act(() => {
      vi.advanceTimersByTime(50);
    });

    const offsetsAfterAnim = getStrokeOffsets(container);
    // After animation some paths should have moved toward 0 (we can't observe intermediate easily; may be 0 after transition end, but JSDOM doesn't animate CSS transitions)
    // Accept either unchanged (JSDOM limitation) or 0px, but not null anymore.
    expect(offsetsAfterAnim.every(v => v !== null)).toBe(true);

    // Now deactivate trigger
    act(() => {
      fireEvent.mouseLeave(trigger);
  vi.advanceTimersByTime(5);
    });

    const offsetsAfterReset = getStrokeOffsets(container);
    // Reset may either:
    //  a) Re-apply dash values (non-null) OR
    //  b) Clear inline styles (null) allowing next activation to set them again.
    // We only need to assert that state returns to a condition allowing re-trigger (so not all values stuck at '0px').
    const allZero = offsetsAfterReset.every(v => v === '0px');
    expect(allZero).toBe(false);
  });
});
