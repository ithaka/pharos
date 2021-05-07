const template = ({ camelCaseName }) => `
import { css } from 'lit-element';

export const ${camelCaseName}Styles = css\`\`;
`;

module.exports = template;
