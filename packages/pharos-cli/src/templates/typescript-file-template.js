const template = ({ componentName, titleCaseName, camelCaseName }) => `
import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { ${camelCaseName}Styles } from './pharos-${componentName}.css';

/**
 * Pharos ${componentName} component.
 *
 * @tag pharos-${componentName}
 *
 */
export class Pharos${titleCaseName} extends PharosElement {
  public static override get styles(): CSSResultArray {
    return [${camelCaseName}Styles];
  }

  protected override render(): TemplateResult {
    return html\` <span>This is the ${titleCaseName} component!</span> \`;
  }
}

`;

module.exports = template;
