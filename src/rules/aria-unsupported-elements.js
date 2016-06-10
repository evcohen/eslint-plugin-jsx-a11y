/**
 * @fileoverview Enforce that elements that do not support ARIA roles,
 *  states and properties do not have those attributes.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import DOM from '../util/attributes/DOM';
import ARIA from '../util/attributes/ARIA';
import { elementType } from 'jsx-ast-utils';

const errorMessage = invalidProp =>
  `This element does not support ARIA roles, states and properties. \
Try removing the prop '${invalidProp}'.`;

module.exports = context => ({
  JSXOpeningElement: node => {
    const nodeType = elementType(node);
    const nodeAttrs = DOM[nodeType];
    const isReservedNodeType = nodeAttrs && nodeAttrs.reserved || false;

    // If it's not reserved, then it can have ARIA-* roles, states, and properties
    if (isReservedNodeType === false) {
      return;
    }

    const invalidAttributes = Object.keys(ARIA).concat('ROLE');

    node.attributes.forEach(prop => {
      if (invalidAttributes.indexOf(prop.name.name.toUpperCase()) > -1) {
        context.report({
          node,
          message: errorMessage(prop.name.name),
        });
      }
    });
  },
});

module.exports.schema = [
  { type: 'object' },
];
