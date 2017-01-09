import { ViewContainerRef, ApplicationRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
export declare class MdlDialogOutletService {
    private appRef;
    private componentFactoryResolver;
    private viewContainerRef_;
    private backdropComponet;
    backdropClickEmitter: EventEmitter<any>;
    constructor(appRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver);
    setDefaultViewContainerRef(vCRef: ViewContainerRef): void;
    readonly viewContainerRef: ViewContainerRef;
    private setViewContainerRef(value);
    hideBackdrop(): void;
    showBackdropWithZIndex(zIndex: number): void;
}
