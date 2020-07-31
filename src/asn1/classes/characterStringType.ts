import { todo, unimpl } from 'unimpl';
import { IParameterMapping } from '../expander';
import { ComponentRelationConstraint } from './componentRelationConstraint';
import { Constraint } from './constraint';
import { ContentsConstraint } from './contentsConstraint';
import { ExtensionMarker } from './extensionMarker';
import { InnerTypeConstraints } from './innerTypeConstraints';
import { Modules } from './modules';
import { ObjectSet } from './objectSet';
import { SizeConstraint } from './sizeConstraint';

/**
 * X.680 clause 40
 * ```
 * characterStringTypeLiteral ( sizeConstraint )?
 * ```
 */
export class CharacterStringType {
  public characterStringTypeLiteral: CharacterStringTypeLiteral;
  public constraint: Constraint | undefined;

  private characterStringTypeTag: undefined;

  constructor(characterStringTypeLiteral: CharacterStringTypeLiteral) {
    this.characterStringTypeLiteral = characterStringTypeLiteral;
  }

  public expand(
    modules: Modules,
    parameterMappings: IParameterMapping[]
  ): CharacterStringType {
    return todo();
  }

  public setConstraints(constraints: Constraint[]) {
    if (constraints.length === 0) {
      return;
    }
    if (constraints.length > 1) {
      return unimpl();
    }
    const constraint = constraints[0];
    const { constraintSpec, exceptionSpec } = constraint;
    if (constraintSpec instanceof ContentsConstraint) {
      return unimpl();
    } else if (constraintSpec instanceof InnerTypeConstraints) {
      return unimpl();
    } else if (constraintSpec instanceof ObjectSet) {
      return unimpl();
    } else if (constraintSpec instanceof ComponentRelationConstraint) {
      return unimpl();
    } else {
      if (constraintSpec.elementSetSpecList.length !== 1) {
        return unimpl();
      }
      const elementSetSpec = constraintSpec.elementSetSpecList[0];
      if (elementSetSpec instanceof ExtensionMarker) {
        throw Error('Not implemented');
      }
      if (elementSetSpec.intersectionsList.length > 1) {
        return unimpl();
      }
      const intersections = elementSetSpec.intersectionsList[0];
      if (intersections.length !== 1) {
        return unimpl();
      }
      const intersectionElements = intersections[0];
      if (intersectionElements instanceof SizeConstraint) {
        this.constraint = constraint;
      } else {
        unimpl();
      }
    }
  }

  public toString(): string {
    if (this.constraint === undefined) {
      return this.characterStringTypeLiteral;
    }
    return `${this.characterStringTypeLiteral} ${this.constraint.toString()}`;
  }
}

export type CharacterStringTypeLiteral =
  | 'BMPString'
  | 'GeneralString'
  | 'GraphicString'
  | 'IA5String'
  | 'ISO646String'
  | 'NumericString'
  | 'PrintableString'
  | 'TeletexString'
  | 'T61String'
  | 'UniversalString'
  | 'UTF8String'
  | 'VideotexString'
  | 'VisibleString';