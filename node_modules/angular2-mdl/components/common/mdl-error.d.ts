/**
 * Wrapper for mdl error messages.
 */
export declare class MdlError extends Error {
    constructor(value: string);
}
export declare class MdlStructureError extends MdlError {
    constructor(child: string, requiredParent: string);
}
