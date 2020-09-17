"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractParseTreeVisitor_1 = require("antlr4ts/tree/AbstractParseTreeVisitor");
const unimpl_1 = require("unimpl");
const extensionMarker_1 = require("../classes/extensionMarker");
const ASN_3gppParser_1 = require("../grammar/ASN_3gppParser");
const componentPresenceListVisitor_1 = require("./componentPresenceListVisitor");
/**
 * # Grammar
 * ```
 * componentPresenceLists:
 *   componentPresenceList? (COMMA ELLIPSIS (COMMA componentPresenceList)?)?
 *   | ELLIPSIS (COMMA componentPresenceList)?
 * ```
 */
class ComponentPresenceListsVisitor extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    visitChildren(ctx) {
        const componentPresenceList = [];
        for (let i = 0; i < ctx.childCount; i++) {
            const childCtx = ctx.getChild(i);
            if (childCtx instanceof ASN_3gppParser_1.ComponentPresenceListContext) {
                const typeConstraintsComponent = childCtx.accept(new componentPresenceListVisitor_1.ComponentPresenceListVisitor());
                componentPresenceList.push(...typeConstraintsComponent);
            }
            else {
                switch (childCtx.text) {
                    case ',': {
                        break;
                    }
                    case '...': {
                        componentPresenceList.push(extensionMarker_1.ExtensionMarker.getInstance());
                        break;
                    }
                    default: {
                        throw Error(childCtx.text);
                    }
                }
            }
        }
        return componentPresenceList;
    }
    defaultResult() {
        return unimpl_1.unimpl();
    }
}
exports.ComponentPresenceListsVisitor = ComponentPresenceListsVisitor;
//# sourceMappingURL=componentPresenceListsVisitor.js.map