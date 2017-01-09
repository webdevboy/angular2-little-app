import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdlDialogService, MdlDialogReference } from './mdl-dialog.service';
import { IMdlDialogConfiguration } from './mdl-dialog-configuration';
export declare class MdlDialogComponent {
    private dialogService;
    private template;
    modal: any;
    config: IMdlDialogConfiguration;
    showEmitter: EventEmitter<MdlDialogReference>;
    hideEmitter: EventEmitter<void>;
    private isShown;
    private dialogRef;
    constructor(dialogService: MdlDialogService);
    show(): Observable<MdlDialogReference>;
    close(): void;
}
