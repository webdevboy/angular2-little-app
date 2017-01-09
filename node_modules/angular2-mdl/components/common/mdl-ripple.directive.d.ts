import { ElementRef, OnChanges, Renderer, OnInit, ModuleWithProviders } from '@angular/core';
export declare class MdlRippleDirective implements OnChanges {
    private elementRef;
    renderer: Renderer;
    private cssContainerClasses;
    private RIPPLE;
    private rippleContainer;
    el: HTMLElement;
    private ripple;
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer, cssContainerClasses: [string]);
    ngOnChanges(): void;
}
export declare class MdlButtonRippleDirective extends MdlRippleDirective {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
}
export declare class MdlCheckboxRippleDirective extends MdlRippleDirective {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
}
export declare class MdlRadioRippleDirective extends MdlRippleDirective {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
}
export declare class MdlIconToggleRippleDirective extends MdlRippleDirective {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
}
export declare class MdlSwitchRippleDirective extends MdlRippleDirective {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
}
export declare class MdlMenuItemRippleDirective extends MdlRippleDirective {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
}
export declare class MdlAnchorRippleDirective extends MdlRippleDirective {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
}
export declare class MdlListItemRippleDirective extends MdlRippleDirective implements OnInit {
    rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    ngOnChanges(): void;
}
export declare class MdlRippleModule {
    static forRoot(): ModuleWithProviders;
}
