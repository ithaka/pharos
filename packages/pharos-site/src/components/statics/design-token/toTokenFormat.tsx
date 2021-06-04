import { code } from './toTokenFormat.module.css';

export const toTokenFormat = (text: string): JSX.Element => {
  return (
    <code className={code}>
      $
      {text
        .replace(/([a-z])([A-Z]|[0-9])/g, '$1-$2')
        .replace(/([0-9])([a-z]|[A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])/g, '$1-$2')
        .toLowerCase()}
    </code>
  );
};
