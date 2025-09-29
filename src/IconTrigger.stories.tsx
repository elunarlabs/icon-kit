import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Icon } from './icon';

const meta: Meta = {
  title: 'Icon/Showcase/Triggers',
  parameters: { layout: 'centered' }
};
export default meta;

type Story = StoryObj;

export const ExternalHover: Story = {
  render: () => {
    return (
      <div style={{ display:'flex', gap:48, alignItems:'center' }}>
        <div
          data-icon-trigger="nav-home"
          style={{ padding:'12px 20px', border:'1px solid var(--sb-fg, #333)', borderRadius:8, cursor:'pointer' }}
        >
          Navigation Item (hover me)
        </div>
        <Icon
          name="home"
          animation="pulse"
          triggerId="nav-home"
          size={48}
          variant="circle"
          circleColor="#6366f1"
          animationDuration={1.4}
        />
        <Icon
          name="bell"
          animation="wiggle"
          triggerId="nav-home"
          size={48}
          variant="circleFilled"
          circleFilledColor="#e11d48"
          animationDuration={1.8}
        />
      </div>
    );
  }
};

export const MultipleGroups: Story = {
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
      <div style={{ display:'flex', gap:24, alignItems:'center' }}>
        <button data-icon-trigger="grp-a" style={{ padding:'8px 14px' }}>Group A Trigger</button>
        <Icon name="camera" animation="spin" triggerId="grp-a" size={40} variant="circle" circleColor="#0ea5e9" animationDuration={3} />
        <Icon name="search" animation="bounce" triggerId="grp-a" size={40} variant="circleFilled" circleFilledColor="#0ea5e9" />
      </div>
      <div style={{ display:'flex', gap:24, alignItems:'center' }}>
        <button data-icon-trigger="grp-b" style={{ padding:'8px 14px' }}>Group B Trigger</button>
        <Icon name="heart" animation="pulse" triggerId="grp-b" size={40} variant="circleFilled" circleFilledColor="#f43f5e" />
        <Icon name="cloud" animation="float" triggerId="grp-b" size={40} variant="circle" circleColor="#f43f5e" animationDuration={4} />
      </div>
    </div>
  )
};

export const DrawOnTrigger: Story = {
  render: () => (
    <div style={{ display:'flex', gap:32, alignItems:'center' }}>
      <div data-icon-trigger="draw-one" style={{ padding:'10px 16px', border:'1px solid var(--sb-fg,#444)', borderRadius:6, cursor:'pointer' }}>
        Hover to Draw
      </div>
      <Icon name="alarm-clock" animation="draw" triggerId="draw-one" size={56} variant="circle" circleColor="#16a34a" drawDuration={1.6} />
      <Icon name="cpu" animation="draw" triggerId="draw-one" size={56} variant="circleFilled" circleFilledColor="#16a34a" drawDuration={2.2} />
    </div>
  )
};
