import type { FC } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: Language;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language = 'tsx' }) => {
  const codeStyles: React.CSSProperties = {
    padding: '20px',
    whiteSpace: 'normal',
    fontSize: 'var(--pharos-font-size-medium)',
    fontFamily: 'var(--pharos-font-family-sans-serif)',
  };
  return (
    <Highlight code={code.trim()} language={language} theme={themes.nightOwl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, ...codeStyles }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
