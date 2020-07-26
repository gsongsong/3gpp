import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { unimpl } from 'unimpl';
import { BooleanValue } from '../classes/booleanValue';
import { ComponentRelationConstraint } from '../classes/componentRelationConstraint';
import { ContentsConstraint } from '../classes/contentsConstraint';
import { ExtensionMarker } from '../classes/extensionMarker';
import { InnerTypeConstraints } from '../classes/innerTypeConstraints';
import { IntegerValue } from '../classes/integerValue';
import { ObjectSet } from '../classes/objectSet';
import { SizeConstraint } from '../classes/sizeConstraint';
import { ValueRange } from '../classes/valueRange';
import { SizeConstraintContext } from '../grammar/ASN_3gppParser';
import { ASN_3gppVisitor } from '../grammar/ASN_3gppVisitor';
import { ConstraintVisitor } from './constraintVisitor';

/**
 * # Grammar
 * ```
 * sizeConstraint: SIZE_LITERAL constraint
 * ```
 */
export class SizeConstraintVisitor
  extends AbstractParseTreeVisitor<SizeConstraint>
  implements ASN_3gppVisitor<SizeConstraint> {
  public visitChildren(ctx: SizeConstraintContext): SizeConstraint {
    const constraintCtx = ctx.constraint();
    const constraint = constraintCtx.accept(new ConstraintVisitor());
    if (constraint instanceof ContentsConstraint) {
      return unimpl();
    } else if (constraint instanceof InnerTypeConstraints) {
      return unimpl();
    } else if (constraint instanceof ObjectSet) {
      return unimpl();
    } else if (constraint instanceof ComponentRelationConstraint) {
      return unimpl();
    } else {
      const sizeConstraint: Array<
        ExtensionMarker | IntegerValue | ValueRange
      > = [];
      for (const elementSetSpec of constraint) {
        if (elementSetSpec instanceof ExtensionMarker) {
          sizeConstraint.push(elementSetSpec);
        } else {
          const intersections = elementSetSpec[0];
          if (intersections.length !== 1) {
            throw Error();
          }
          const intersectionElements = intersections[0];
          if (intersectionElements instanceof IntegerValue) {
            sizeConstraint.push(intersectionElements);
          } else if (intersectionElements instanceof SizeConstraint) {
            return intersectionElements;
          } else if (intersectionElements instanceof ValueRange) {
            sizeConstraint.push(intersectionElements);
          } else if (intersectionElements instanceof BooleanValue) {
            return unimpl();
          } else if (typeof intersectionElements === 'string') {
            sizeConstraint.push(new IntegerValue(intersectionElements));
          } else {
            throw Error();
          }
        }
      }
      return new SizeConstraint(sizeConstraint);
    }
  }

  protected defaultResult(): SizeConstraint {
    return unimpl();
  }
}
