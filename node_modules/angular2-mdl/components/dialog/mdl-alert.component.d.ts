import { EventEmitter } from '@angular/core';
import { MdlDialogService } from './mdl-dialog.service';
export declare class MdlAlertComponent {
    private mdlDialogService;
    title: string;
    message: string;
    okText: string;
    confirmed: EventEmitter<{}>;
    constructor(mdlDialogService: MdlDialogService);
    show(): void;
}
