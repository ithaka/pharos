export const TokenTable = (title: string, content: JSX.Element): JSX.Element => {
  return (
    <div className="token-table-container">
      <h2>{title}</h2>
      <table className="token-table">{content}</table>
      <br />
      <br />
    </div>
  );
};
