import { EventEmitter } from '@angular/core';
import { MdlChipContactDirective } from './mdl-chip-contact.directive';
export declare class MdlChipComponent {
    mdlLabel: any;
    mdlActionIcon: any;
    actionClick: EventEmitter<{}>;
    chipContact: MdlChipContactDirective;
    action(): void;
}
