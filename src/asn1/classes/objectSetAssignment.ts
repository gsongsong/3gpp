import { Workbook } from 'exceljs';
import { todo } from 'unimpl';
import { IParameterMapping } from '../expander';
import { getWorkbook } from '../formatter';
import {
  addHeader,
  addTitle,
  addWorksheet,
  drawBorder,
  HEADER_NAME_BASE,
  headerIndexed,
  uniqueSheetname,
} from '../formatter/spreadsheet';
import { BorderTop } from '../formatter/style';
import { DefinedObjectClass } from './asnType';
import { Modules } from './modules';
import { ObjectSet } from './objectSet';

/**
 * X.681 clause 12.1
 * ```
 * name definedObjectClass ::= objectSet
 * ```
 */
export class ObjectSetAssignment {
  public name: string;
  public definedObjectClass: DefinedObjectClass;
  public objectSet: ObjectSet;

  private objectSetAssignmentTag: undefined;

  constructor(
    name: string,
    definedObjectClass: DefinedObjectClass,
    objectSet: ObjectSet
  ) {
    this.name = name;
    this.definedObjectClass = definedObjectClass;
    this.objectSet = objectSet;
  }

  public expand(
    modules: Modules,
    parameterMappings: IParameterMapping[]
  ): ObjectSetAssignment {
    return todo();
  }

  public getDepth(): number {
    return this.objectSet.getDepth();
  }

  public toSpreadsheet(workbook?: Workbook): Workbook {
    const wb = getWorkbook(workbook);
    const sheetname = uniqueSheetname(wb, this.fullName());
    const ws = addWorksheet(wb, sheetname);
    const depth = this.getDepth();
    addTitle(ws, this.name);
    ws.addRow([]);
    addHeader(ws, depth);
    this.objectSet.toSpreadsheet(
      ws,
      {
        [headerIndexed(HEADER_NAME_BASE, 0)]: this.fullName(),
      },
      0
    );
    drawBorder(ws, ws.addRow([]), 0, BorderTop);
    return wb;
  }

  public toString(): string {
    return `${this.fullName()} ::= ${this.objectSet.toString()}`;
  }

  private fullName(): string {
    return `${this.name} ${this.definedObjectClass.toString()}`;
  }
}
