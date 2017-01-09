import { AfterViewInit, ChangeDetectorRef, ElementRef, ModuleWithProviders } from '@angular/core';
export declare class MdlPopoverComponent implements AfterViewInit {
    private changeDetectionRef;
    elementRef: ElementRef;
    hideOnClick: boolean;
    isVisible: boolean;
    directionUp: boolean;
    constructor(changeDetectionRef: ChangeDetectorRef, elementRef: ElementRef);
    ngAfterViewInit(): void;
    onDocumentClick(event: Event): void;
    ngOnDestroy(): void;
    toggle(event: Event): void;
    hide(): void;
    private hideAllPopovers();
    show(event: Event): void;
    private updateDirection(event);
}
export declare class MdlPopoverModule {
    static forRoot(): ModuleWithProviders;
}
