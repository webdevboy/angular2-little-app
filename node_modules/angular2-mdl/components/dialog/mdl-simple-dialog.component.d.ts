import { MdlDialogReference } from './mdl-dialog.service';
import { IMdlDialogAction, IMdlSimpleDialogConfiguration } from './mdl-dialog-configuration';
export declare class MdlSimpleDialogComponent {
    private dialogConfiguration;
    private dialog;
    private buttons;
    constructor(dialogConfiguration: IMdlSimpleDialogConfiguration, dialog: MdlDialogReference);
    actionClicked(action: IMdlDialogAction): void;
    onEsc(): void;
}
