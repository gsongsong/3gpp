import { isEmpty } from 'lodash';

import { log } from '../../utils/logging';

import { fillRow, IFormatConfig, IIe } from '../format/xlsx';
import { Base } from './base';

export class Integer extends Base {
  public namedNumberList: any; // TODO
  public value: number | string;
  public min: number | string;
  public max: number | string;

  public setConstraint(constraint: any): Integer {
    if ('value' in constraint) {
      this.value = constraint.value;
      delete constraint.value;
      this.min = undefined;
      this.max = undefined;
    }
    if ('min' in constraint && 'max' in constraint) {
      this.min = constraint.min;
      delete constraint.min;
      this.max = constraint.max;
      delete constraint.max;
      this.value = undefined;
    }
    if (!isEmpty(constraint)) {
      log.warn(`Integer could not handle constraint ${JSON.stringify(constraint)}`);
    }
    return this;
  }

  public expand(): Integer {
    return this;
  }

  public depthMax(): number {
    return 1;
  }

  public toString(): string {
    const valueConstraint = this.value !== undefined ? `(${this.value})` :
      this.min !== undefined && this.max !== undefined ? `(${this.min}..${this.max})` : '';
    return `INTEGER ${valueConstraint}`;
  }

  public fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: any[],
                       formatConfig: IFormatConfig, depth?: number): [number, number] {
    ieElem.type = this.toString();
    [row, col] = fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth);
    if (typeof this.value === 'string') {
      constants.push(this.value);
    }
    if (typeof this.min === 'string') {
      constants.push(this.min);
    }
    if (typeof this.max === 'string') {
      constants.push(this.max);
    }
    return [row, col];
  }
}
