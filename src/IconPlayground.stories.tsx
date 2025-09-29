import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Icon, type IconProps } from './icon';

const iconCandidates = [
  'camera',
  'alarm-clock',
  'heart',
  'search',
  'github',
  'image',
  'sparkles',
  'bell',
  'bookmark',
  'calendar',
  'cloud',
  'cpu',
];

interface PlaygroundArgs extends IconProps {
  icons: string[];
  orientation: 'horizontal' | 'vertical' | 'grid';
  showLabels: boolean;
}

const meta: Meta<PlaygroundArgs> = {
  title: 'Icon/Playground',
  component: Icon as any,
  argTypes: {
    icons: { control: { type: 'object' } },
    orientation: { control: { type: 'radio' }, options: ['horizontal', 'vertical', 'grid'] },
    showLabels: { control: 'boolean' },
    animation: {
      control: { type: 'select' },
      options: [undefined, 'spin', 'pulse', 'bounce', 'wiggle', 'float', 'draw'],
    },
    hoverAnimation: {
      control: { type: 'select' },
      options: [undefined, 'scale', 'lift', 'rotate', 'wiggle', 'pulse'],
    },
  },
  args: {
    name: 'camera',
    size: 40,
    icons: iconCandidates.slice(0, 1),
    orientation: 'horizontal',
    showLabels: false,
    variant: 'default',
    animationDuration: 1.6,
  },
};
export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const SingleView: Story = {
  args: { icons: iconCandidates.slice(0, 1), showLabels: false, orientation: 'horizontal' },
  render: (args) => {
    const { icons, ...iconProps } = args;
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {icons.map((iconName) => (
          <Icon key={iconName} {...iconProps} name={iconName} />
        ))}
      </div>
    );
  },
};

export const MultipleView: Story = {
  args: { icons: iconCandidates.slice(0, 8), showLabels: true, orientation: 'grid' },
  render: (args) => {
    const { icons, orientation, showLabels, ...iconProps } = args;
    const containerStyle: React.CSSProperties =
      orientation === 'horizontal'
        ? { display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }
        : orientation === 'vertical'
          ? { display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }
          : { display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' };

    return (
      <div className="sb-playground-panel">
        <div style={containerStyle}>
          {icons.map((iconName) => (
            <div
              key={iconName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                minWidth: 64,
              }}
            >
              <Icon {...iconProps} name={iconName} />
              {showLabels && <span style={{ fontSize: 12, opacity: 0.7 }}>{iconName}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
