"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var logging_1 = require("../../utils/logging");
var base_1 = require("./base");
var NamedType = /** @class */ (function (_super) {
    __extends(NamedType, _super);
    function NamedType(name, type) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.type = type;
        return _this;
    }
    NamedType.prototype.setConstraint = function (constraint) {
        logging_1.log.info("NamedType constraint " + JSON.stringify(constraint));
        // TODO
        return this;
    };
    NamedType.prototype.expand = function () {
        // TODO
        return this;
    };
    NamedType.prototype.toString = function (depth) {
        if (depth === void 0) { depth = 0; }
        // TODO
        return null;
    };
    return NamedType;
}(base_1.Base));
exports.NamedType = NamedType;