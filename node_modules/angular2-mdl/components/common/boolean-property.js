function booleanProperty() {
    return function booleanFieldValueMetadata(target, key) {
        var defaultValue = target[key];
        var localKey = "__mdl_private_symbol_" + key;
        target[localKey] = defaultValue;
        Object.defineProperty(target, key, {
            get: function () { return this[localKey]; },
            set: function (value) {
                this[localKey] = value != null && "" + value !== 'false';
            }
        });
    };
}
export { booleanProperty as BooleanProperty };
//# sourceMappingURL=boolean-property.js.map