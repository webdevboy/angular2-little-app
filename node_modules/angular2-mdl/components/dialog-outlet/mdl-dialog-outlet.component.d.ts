import { ViewContainerRef } from '@angular/core';
import { MdlDialogOutletService } from './mdl-dialog-outlet.service';
export declare class MdlDialogOutletComponent {
    private vCRef;
    constructor(vCRef: ViewContainerRef);
    readonly viewContainerRef: ViewContainerRef;
}
export declare class MdlDialogInnerOutletComponent {
    private vCRef;
    constructor(vCRef: ViewContainerRef, service: MdlDialogOutletService);
}
