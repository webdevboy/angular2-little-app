import { ElementRef, Renderer, ModuleWithProviders } from '@angular/core';
import { MdlCheckboxComponent } from '../checkbox/mdl-checkbox.component';
export declare class MdlIconToggleComponent extends MdlCheckboxComponent {
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlIconToggleModule {
    static forRoot(): ModuleWithProviders;
}
