import type { FC, ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Highlight } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { mdx } from '@mdx-js/react';
import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';

interface CodeBlockProps {
  className?: string;
  live?: boolean;
  render?: boolean;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, className, live, render }) => {
  const language = className?.replace(/language-/, '') as Language;
  const snippet = ReactDOMServer.renderToStaticMarkup(children as ReactElement);
  const code =
    snippet &&
    prettier.format(snippet, {
      parser: 'html',
      plugins: [parserHtml],
    });

  if (live) {
    return (
      <div style={{ marginTop: '40px', backgroundColor: 'black' }}>
        <LiveProvider
          code={code.trim()}
          transformCode={(code) => '/** @jsx mdx */' + code}
          scope={{ mdx }}
        >
          <LivePreview />
          <LiveEditor />
          <LiveError />
        </LiveProvider>
      </div>
    );
  }

  if (render) {
    return (
      <div style={{ marginTop: '40px' }}>
        <LiveProvider code={code}>
          <LivePreview />
        </LiveProvider>
      </div>
    );
  }

  return (
    <Highlight code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', whiteSpace: 'normal' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
