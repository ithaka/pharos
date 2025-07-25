import { create } from 'storybook/theming/create';
import {
  PharosColorWhite,
  PharosColorBlack,
  PharosColorMarbleGray50,
  PharosColorMarbleGray20,
  PharosFontFamilyBody,
  PharosColorInteractivePrimary,
  PharosColorTextBase,
  PharosColorTextWhite,
} from '../packages/pharos/lib/styles/variables.js';
import logo from '../packages/pharos/src/utils/_storybook/assets/images/jstor-logo.svg';

export default create({
  base: 'light',

  colorPrimary: PharosColorInteractivePrimary,
  colorSecondary: PharosColorInteractivePrimary,

  // UI
  appBg: PharosColorWhite,
  appContentBg: PharosColorWhite,
  appBorderColor: PharosColorMarbleGray50,
  appBorderRadius: 4,

  // Typography
  fontBase: PharosFontFamilyBody,
  fontCode: 'monospace',

  // Text colors
  textColor: PharosColorTextBase,
  textInverseColor: PharosColorTextWhite,

  // Toolbar default and active colors
  barTextColor: PharosColorMarbleGray20,
  barSelectedColor: PharosColorBlack,
  barBg: PharosColorWhite,

  // Form colors
  inputBg: PharosColorWhite,
  inputBorder: PharosColorMarbleGray50,
  inputTextColor: PharosColorBlack,
  inputBorderRadius: 4,

  brandTitle: 'Pharos Storybook',
  brandUrl: '#',
  brandImage: logo,
});
