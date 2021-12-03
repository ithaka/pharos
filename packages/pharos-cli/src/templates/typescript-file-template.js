const template = ({ componentName, titleCaseName, camelCaseName }) => `
import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { ${camelCaseName}Styles } from './pharos-${componentName}.css';

export class Pharos${titleCaseName} extends PharosElement {
  componentName = "Pharos${titleCaseName}";

  public static override get styles(): CSSResultArray {
    return [${camelCaseName}Styles];
  }

  protected override render(): TemplateResult {
    return html\` <span>This is the ${titleCaseName} component!</span> \`;
  }
}

`;

module.exports = template;
