const template = ({ camelCaseName }) => `
import { css } from 'lit';

export const ${camelCaseName}Styles = css\`\`;
`;

module.exports = template;
