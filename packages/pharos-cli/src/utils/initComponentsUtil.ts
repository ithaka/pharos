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

  importStatementsDeclarations.forEach((dec) => {
    const importClause = dec.getImportClause();
    if (importClause && importClause.getNamedImports().length > 0) {
      dec.addNamedImport(componentName);
    }
  });

  const registerComponentsExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

  registerComponentsExpressions.forEach((callExp) => {
    callExp.forEachChild((expChild) => {
      if (expChild.isKind(SyntaxKind.ArrayLiteralExpression)) {
        expChild.addElement(componentName);
      }
    });
  });

  await sourceFile.save();
}
