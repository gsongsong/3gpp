import { log } from '../../utils/logging';
import { getContextName, getLogWithAsn1 } from '../utils';

import { AsnBoolean } from '../classes/asnBoolean';
import { Null } from '../classes/null';
import { IntegerTypeVisitor } from './integerType';

/**
 * ANTLR4 grammar
 * builtinType :
 *    octetStringType
 *  | bitStringType
 *  | choiceType
 *  | enumeratedType
 *  | integerType
 *  | sequenceType
 *  | sequenceOfType
 *  | setType
 *  | setOfType
 *  | objectidentifiertype
 *  | objectClassFieldType
 *  | BOOLEAN_LITERAL
 *  | NULL_LITERAL
 */
export class BuiltinTypeVisitor {
  public visitChildren(builtinTypeCtx: any): any /* TODO */ {
    const childCtx = builtinTypeCtx.children[0];
    switch (getContextName(childCtx)) {
      case 'integerType': {
        return childCtx.accept(new IntegerTypeVisitor());
        break;
      }
      default: {
        switch (childCtx.getText().toLowerCase()) {
          case 'boolean': {
            return new AsnBoolean();
            break;
          }
          case 'null': {
            return new Null();
            break;
          }
          default: {
            // TODO
            log.warn(getLogWithAsn1(childCtx, 'Not supported ASN1:'));
            break;
          }
        }
        break;
      }
    }
    return null;
  }
}