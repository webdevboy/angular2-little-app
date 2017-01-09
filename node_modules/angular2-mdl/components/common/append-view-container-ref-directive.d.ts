import { ViewContainerRef, Renderer, AfterViewInit } from '@angular/core';
export declare class AppendViewContainerRefDirective implements AfterViewInit {
    private viewRef;
    private renderer;
    viewContainerRefToAppend: ViewContainerRef;
    constructor(viewRef: ViewContainerRef, renderer: Renderer);
    ngAfterViewInit(): void;
}
