"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unimpl_1 = require("unimpl");
const spreadsheet_1 = require("../../common/spreadsheet");
const spreadsheet_2 = require("../formatter/spreadsheet");
const extensionMarker_1 = require("./extensionMarker");
class EnumeratedType {
    constructor(items) {
        this.items = items;
    }
    // eslint-disable-next-line no-unused-vars
    expand(modules, parameterMappings) {
        return this;
    }
    // eslint-disable-next-line class-methods-use-this
    getDepth() {
        return 0;
    }
    // eslint-disable-next-line class-methods-use-this
    setConstraints(constraints) {
        if (constraints.length > 0) {
            unimpl_1.unimpl();
        }
    }
    toSpreadsheet(worksheet, row, depth) {
        if (this.reference && !row[spreadsheet_2.HEADER_REFERENCE]) {
            // eslint-disable-next-line no-param-reassign
            row[spreadsheet_2.HEADER_REFERENCE] = this.reference;
        }
        spreadsheet_2.appendInColumn(row, spreadsheet_2.HEADER_TYPE, this.toString());
        const r = worksheet.addRow(row);
        spreadsheet_1.setOutlineLevel(r, depth);
        spreadsheet_1.drawBorder(worksheet, r, depth);
    }
    toString() {
        const arrToString = [
            'ENUMERATED {',
            this.items.map((item) => {
                if (typeof item === 'string' || item instanceof extensionMarker_1.ExtensionMarker) {
                    return item.toString();
                }
                return `${item.name} (${item.valueLiteral})`;
            }).join(', '),
            '}',
        ];
        return arrToString.join('');
    }
}
exports.EnumeratedType = EnumeratedType;
//# sourceMappingURL=enumeratedType.js.map