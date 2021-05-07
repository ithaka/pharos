import { create } from '@storybook/theming/create';
import {
  PharosColorJstorRed,
  PharosColorWhite,
  PharosColorBlack,
  PharosColorMarbleGray50,
  PharosColorMarbleGray20,
  PharosFontFamilyBody,
} from '../packages/pharos/lib/styles/variables.js';
import '../packages/pharos/lib/styles/fonts.css';

export default create({
  base: 'light',

  colorPrimary: PharosColorJstorRed,
  colorSecondary: PharosColorJstorRed,

  // UI
  appBg: PharosColorWhite,
  appContentBg: PharosColorWhite,
  appBorderColor: PharosColorMarbleGray50,
  appBorderRadius: 4,

  // Typography
  fontBase: PharosFontFamilyBody,
  fontCode: 'monospace',

  // Text colors
  textColor: PharosColorBlack,
  textInverseColor: PharosColorWhite,

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
  brandImage: './images/jstor-logo.svg',
});
