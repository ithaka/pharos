const template = ({ componentName, titleCaseName, camelCaseName }) => `
import { html, LitElement } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { ${camelCaseName}Styles } from './pharos-${componentName}.css';
import { customElement } from '../../utils/decorators';

@customElement('pharos-${componentName}')
export class Pharos${titleCaseName} extends LitElement {
  public static get styles(): CSSResultArray {
    return [${camelCaseName}Styles];
  }

  protected render(): TemplateResult {
    return html\` <span>This is the ${titleCaseName} component!</span> \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-${componentName}': Pharos${titleCaseName};
  }
}

`;

module.exports = template;
