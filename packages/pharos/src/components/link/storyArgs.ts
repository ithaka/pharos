import type { LinkTarget } from './pharos-link';

export interface ComponentArgs {
  a11yLabel?: string;
  bold?: boolean;
  download?: string;
  flex?: boolean;
  href?: string;
  hreflang?: string;
  indicateVisited?: boolean;
  isOnBackground?: boolean;
  noHover?: boolean;
  ping?: string;
  rel?: string;
  skip?: boolean;
  subtle?: boolean;
  target?: LinkTarget;
  type?: string;
}

export type StoryArgs = ComponentArgs & {
  text: string;
};

export const defaultArgs: StoryArgs = {
  text: 'I am a link',
  bold: false,
  flex: false,
  href: '#',
  indicateVisited: false,
  isOnBackground: false,
  noHover: false,
  skip: false,
  subtle: false,
};
