import * as fs from 'fs';
import { Project, SyntaxKind } from 'ts-morph';

export async function addNewComponentToInitComponents(
  inputFilePath: string,
  componentName: string
) {
  const code = await fs.promises.readFile(inputFilePath, 'utf8');

  const project = new Project();
  const sourceFile = project.createSourceFile(inputFilePath, code, {
    overwrite: true,
  });

  const importStatementsDeclarations = sourceFile.getDescendantsOfKind(
    SyntaxKind.ImportDeclaration
  );

  importStatementsDeclarations[0].addNamedImport(componentName);

  const registerComponentsExpressions = sourceFile.getDescendantsOfKind(
    SyntaxKind.ArrayLiteralExpression
  );

  registerComponentsExpressions[0].addElement(componentName);

  await sourceFile.save();
}
