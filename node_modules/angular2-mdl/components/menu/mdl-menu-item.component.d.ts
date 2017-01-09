import { ElementRef, Renderer } from '@angular/core';
import { MdlMenuComponent } from './mdl-menu.component';
export declare class MdlMenuItemComponent {
    private elementRef;
    private renderer;
    private mdlMenu;
    disabled: boolean;
    element: HTMLElement;
    constructor(elementRef: ElementRef, renderer: Renderer, mdlMenu: MdlMenuComponent);
    onClick($event: any): void;
    onTouch($event: any): void;
}
