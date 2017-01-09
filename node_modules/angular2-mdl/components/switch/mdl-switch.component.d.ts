import { ElementRef, Renderer, ModuleWithProviders } from '@angular/core';
import { MdlCheckboxComponent } from '../checkbox/mdl-checkbox.component';
export declare class MdlSwitchComponent extends MdlCheckboxComponent {
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlSwitchModule {
    static forRoot(): ModuleWithProviders;
}
