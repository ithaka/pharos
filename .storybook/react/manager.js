import { addons } from 'storybook/manager-api';
import theme from '../theme';

window.STORYBOOK_GA_ID = 'UA-98658597-21';
window.STORYBOOK_REACT_GA_OPTIONS = {};

addons.setConfig({
  theme: theme,
});
