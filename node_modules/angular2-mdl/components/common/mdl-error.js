var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Wrapper for mdl error messages.
 */
export var MdlError = (function (_super) {
    __extends(MdlError, _super);
    function MdlError(value) {
        _super.call(this);
        _super.prototype.message = value;
    }
    return MdlError;
}(Error));
export var MdlStructureError = (function (_super) {
    __extends(MdlStructureError, _super);
    function MdlStructureError(child, requiredParent) {
        _super.call(this, "\"" + child + "\" requires \"" + requiredParent + "\" as a parent.");
    }
    return MdlStructureError;
}(MdlError));
//# sourceMappingURL=mdl-error.js.map