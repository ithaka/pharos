export const toTokenFormat = (text) => {
  return (
    <code>
      $
      {text
        .replace(/([a-z])([A-Z]|[0-9])/g, '$1-$2')
        .replace(/([0-9])([a-z]|[A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])/g, '$1-$2')
        .toLowerCase()}
    </code>
  );
};
