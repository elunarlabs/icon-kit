import type { Preview } from '@storybook/react-vite';
import '../src/icon.css';
import '../src/storybook-theme.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Color theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' }
      ],
      showName: true
    }
  }
};

const withTheme: any = (Story: any, context: any) => {
  const { theme } = context.globals;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  return Story();
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: 'centered',
    // options removed temporarily to debug SyntaxError ':' during startup
  }
};

export default preview;
