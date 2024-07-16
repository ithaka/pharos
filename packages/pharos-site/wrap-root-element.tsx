import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Canvas from './src/components/Canvas';
import { PharosContext } from '@ithaka/pharos/lib/utils/PharosContext';
import './initComponents';
import Layout from './src/components/layout';
import { WrapPageElementBrowserArgs } from 'gatsby';

interface WrapperProps {
  element: ReactNode;
}

export const wrapPageElement = ({ element, props }: WrapPageElementBrowserArgs) => {
  return <Layout fill={props.location.pathname === '/'}>{element}</Layout>;
};

export const wrapRootElement: FC<WrapperProps> = ({ element }) => {
  const context = { prefix: 'site' };
  return <PharosContext.Provider value={context}>{element}</PharosContext.Provider>;
};
