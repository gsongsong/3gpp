"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractParseTreeVisitor_1 = require("antlr4ts/tree/AbstractParseTreeVisitor");
const unimpl_1 = require("unimpl");
const ASN_3gppParser_1 = require("../grammar/ASN_3gppParser");
const signedNumberVisitor_1 = require("./signedNumberVisitor");
/**
 * # Grammar
 * ```
 * namedNumber: IDENTIFIER L_PARAN (signedNumber | definedValue) R_PARAN
 * ```
 */
class NamedNumberVisitor extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    visitChildren(ctx) {
        const name = ctx.getChild(0).text;
        const thirdCtx = ctx.getChild(2);
        if (thirdCtx instanceof ASN_3gppParser_1.SignedNumberContext) {
            const valueLiteral = thirdCtx.accept(new signedNumberVisitor_1.SignedNumberVisitor());
            return { name, valueLiteral };
        }
        else if (thirdCtx instanceof ASN_3gppParser_1.DefinedValueContext) {
            return unimpl_1.todo();
        }
        else {
            throw Error();
        }
    }
    defaultResult() {
        return unimpl_1.unimpl();
    }
}
exports.NamedNumberVisitor = NamedNumberVisitor;
//# sourceMappingURL=namedNumberVisitor.js.map