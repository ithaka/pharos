import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Canvas from './src/components/Canvas';
import { PharosContext } from '@ithaka/pharos/lib/utils/PharosContext';
import './initComponents';
import Layout from './src/components/layout';

interface WrapperProps {
  element: ReactNode;
}

const pharos =
  typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

const blockStyle = {
  background: '#111',
  border: '1px solid #fff',
  borderRadius: 5,
  marginBottom: 10,
};

const scope = { ...pharos, Fragment };

const components =
  typeof window !== `undefined`
    ? {
        pre: ({ children }) => {
          const live = children.props.metastring === 'live';

          return (
            <LiveProvider code={children.props.children} scope={scope}>
              <div style={blockStyle}>
                <LiveEditor disabled={!live} />
              </div>
              {live ? <LiveError /> : null}
              {live ? <LivePreview /> : null}
            </LiveProvider>
          );
        },
        h1: (props) => (
          <pharos.PharosHeading level={1} preset={'7--bold'}>
            {props.children}
          </pharos.PharosHeading>
        ),
        h2: (props) => (
          <pharos.PharosHeading level={2} preset={'6'}>
            {props.children}
          </pharos.PharosHeading>
        ),
        h3: (props) => (
          <pharos.PharosHeading level={3} preset={'4'}>
            {props.children}
          </pharos.PharosHeading>
        ),
        h4: (props) => (
          <pharos.PharosHeading level={4} preset={'2'}>
            {props.children}
          </pharos.PharosHeading>
        ),
        h5: (props) => (
          <pharos.PharosHeading level={5} preset={'1--bold'}>
            {props.children}
          </pharos.PharosHeading>
        ),
        h6: (props) => (
          <pharos.PharosHeading level={6} preset={'1--bold'}>
            {props.children}
          </pharos.PharosHeading>
        ),
      }
    : {};

export const wrapRootElement: FC<WrapperProps> = ({ element }) => {
  const context = { prefix: 'site' };
  return (
    <MDXProvider components={{ ...components, Canvas, ...pharos }}>
      <PharosContext.Provider value={context}>
        <Layout>{element}</Layout>
      </PharosContext.Provider>
    </MDXProvider>
  );
};
