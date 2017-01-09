import { MdlMenuComponent } from './mdl-menu.component';
import { MdlButtonComponent } from '../button/mdl-button.component';
export declare class MdlToggleMenuDirective {
    private button;
    menu: MdlMenuComponent;
    constructor(button: MdlButtonComponent);
    onClick($event: any): void;
}
