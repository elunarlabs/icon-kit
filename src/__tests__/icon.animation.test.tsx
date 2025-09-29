// NOTE: This file remains due to repeated FS delete no-op (Windows case / tool quirk).
// Marking it explicitly skipped so it doesn't clutter suite.
import { describe, it, expect } from 'vitest';
describe.skip('deprecated animation test (legacy placeholder)', () => {
  it('noop', () => {
    expect(true).toBe(true);
  });
});
