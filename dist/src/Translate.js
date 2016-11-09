"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer_1 = require('./Layer');
var Translate = (function (_super) {
    __extends(Translate, _super);
    function Translate(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d;
        _super.call(this);
        this._x = x;
        this._y = y;
    }
    Translate.prototype.draw = function (context) {
        context.translate(this._x, this._y);
        _super.prototype.draw.call(this, context);
        context.translate(-this._x, -this._y);
    };
    Translate.prototype.getBounds = function () {
        var _a = _super.prototype.getBounds.call(this), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        return {
            minX: minX + this._x,
            minY: minY + this._y,
            maxX: maxX + this._x,
            maxY: maxY + this._y
        };
    };
    Translate.prototype.intersection = function (point) {
        var translatedPoint = { x: point.x - this._x, y: point.y - this._y };
        return _super.prototype.intersection.call(this, translatedPoint);
    };
    Translate.prototype.transform = function (point) {
        return { x: point.x + this._x, y: point.y + this._y };
    };
    Translate.prototype.untransform = function (point) {
        return { x: point.x - this._x, y: point.y - this._y };
    };
    Translate.prototype.index = function (action, zIndex) {
        var _this = this;
        _super.prototype.index.call(this, function (node, zIndex, transformers) {
            action(node, zIndex, transformers.concat([_this]));
        }, zIndex);
    };
    Object.defineProperty(Translate.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Translate.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    return Translate;
}(Layer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Translate;
;
//# sourceMappingURL=Translate.js.map