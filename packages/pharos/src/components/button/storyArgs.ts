import { iconNames } from '../../utils/iconNames';

export const defaultArgs = {
  // Story
  text: 'I am a button',
  // Props
  autofocus: false,
  disabled: false,
  fullWidth: false,
  iconCondensed: false,
  large: false,
  onBackground: false,
  pressed: 'undefined',
  type: 'button',
  variant: 'primary',
};

export const storyArgTypes = {
  variant: {
    options: ['primary', 'secondary', 'subtle', 'overlay'],
    control: {
      type: 'inline-radio',
    },
    defaultValue: 'primary',
  },
  type: {
    options: ['button', 'submit', 'reset'],
    control: {
      type: 'inline-radio',
    },
    defaultValue: 'button',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  large: {
    control: {
      type: 'boolean',
    },
  },
  autofocus: {
    control: {
      type: 'boolean',
    },
  },
  icon: {
    options: iconNames,
    control: {
      type: 'select',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  name: {
    control: {
      type: 'text',
    },
  },
  value: {
    control: {
      type: 'text',
    },
  },
  download: {
    control: {
      type: 'text',
    },
  },
  href: {
    control: {
      type: 'text',
    },
  },
  hreflang: {
    control: {
      type: 'text',
    },
  },
  pressed: {
    control: {
      type: 'text',
    },
  },
  ping: {
    control: {
      type: 'text',
    },
  },
  rel: {
    control: {
      type: 'text',
    },
  },
  target: {
    control: {
      type: 'text',
    },
  },
  iconCondensed: {
    control: {
      type: 'boolean',
    },
  },
  onBackground: {
    control: {
      type: 'boolean',
    },
  },
  fullWidth: {
    control: {
      type: 'boolean',
    },
  },
};
