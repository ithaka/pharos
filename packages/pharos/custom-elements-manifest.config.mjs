import { getClassMemberDoc } from '@custom-elements-manifest/analyzer/src/utils/manifest-helpers.js';
import {
  isStaticMember,
  isProperty,
} from '@custom-elements-manifest/analyzer/src/utils/ast-helpers.js';

const isOptionalClassProperty = (node) => {
  return isProperty(node) && node.questionToken;
};

export default {
  plugins: [
    {
      name: 'optional-property-plugin',
      analyzePhase({ ts, node, moduleDoc }) {
        const name = node.name?.getText?.();
        const className = node.parent?.name?.getText?.();

        if (!name || !className) return;

        const memberDoc = getClassMemberDoc(moduleDoc, className, name, isStaticMember(node));

        if (!memberDoc) return;

        if (isOptionalClassProperty(node, ts)) {
          memberDoc.optional = true;
        }
      },
    },
  ],
};
