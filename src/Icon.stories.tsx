import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Icon/Showcase/Basic',
  component: Icon,
  args: {
    name: 'camera',
    size: 32,
  },
  parameters: {
    controls: { expanded: true }
  }
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};
export const Circle: Story = {
  args: { variant: 'circle', color: '#6366f1' }
};
export const CircleFilled: Story = {
  args: { variant: 'circleFilled', circleFilledColor: '#6366f1' }
};
export const Pulse: Story = {
  args: { animation: 'pulse', color: '#e11d48', animationDuration: 1.2 }
};
export const Spin: Story = {
  args: { animation: 'spin', color: '#0ea5e9', animationDuration: 2 }
};
export const Draw: Story = {
  args: { animation: 'draw', name: 'alarm-clock', color: '#16a34a' }
};
export const FontAwesome: Story = {
  args: { kit: 'fa-brands', name: 'github', variant: 'circle', circleColor: '#000' }
};
export const LabIcon: Story = {
  args: { kit: 'lucide-lab', name: 'pumpkin', variant: 'circleFilled', circleFilledColor: '#f59e0b' }
};
export const Accessible: Story = {
  args: { name: 'search', ariaLabel: 'Suche' }
};
export const Fallback: Story = {
  args: { name: 'not-existing-xyz', fallback: <span style={{fontSize:12}}>?</span> }
};
