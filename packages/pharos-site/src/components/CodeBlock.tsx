import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Highlight } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';

interface CodeBlockProps {
  className?: string;
  live?: boolean;
  render?: boolean;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, className, live, render }) => {
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    async function formatCode() {
      const snippet = ReactDOMServer.renderToStaticMarkup(children as ReactElement);
      if (snippet) {
        /*
        const formattedCode = await prettier.format(snippet, {
          parser: 'html',
          plugins: [parserHtml],
        });
        setCode(formattedCode);
        */
        setCode(snippet);
      }
    }
    formatCode();
  }, []);

  if (live) {
    return (
      <div style={{ marginTop: '40px', backgroundColor: 'black' }}>
        <LiveProvider code={code.trim()} transformCode={(code) => '/** @jsx */' + code}>
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

  const language = className?.replace(/language-/, '') as Language;

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
