import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Icon/Showcase/Animations',
  component: Icon,
  args: {
    name: 'camera',
    size: 48,
    color: '#6366f1'
  },
  parameters: { controls: { expanded: true } }
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Spin: Story = { args: { animation: 'spin', animationDuration: 2 } };
export const Pulse: Story = { args: { animation: 'pulse', animationDuration: 1.2, color: '#e11d48' } };
export const Bounce: Story = { args: { animation: 'bounce', animationDuration: 1.4 } };
export const Wiggle: Story = { args: { animation: 'wiggle', animationDuration: 1.6 } };
export const Float: Story = { args: { animation: 'float', animationDuration: 3 } };
export const HoverScale: Story = { args: { hoverAnimation: 'scale', color: '#16a34a' } };
export const HoverLift: Story = { args: { hoverAnimation: 'lift', color: '#0ea5e9' } };
export const Combined: Story = { args: { animation: 'pulse', hoverAnimation: 'wiggle', animationDuration: 1.4 } };
export const Scale: Story = { args: { animation: 'scale', animationDuration: 1.4, color: '#16a34a' } };
export const Lift: Story = { args: { animation: 'lift', animationDuration: 1.8, color: '#0ea5e9' } };
