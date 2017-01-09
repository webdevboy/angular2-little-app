import { ChangeDetectorRef, ElementRef } from '@angular/core';
export declare class MdlOptionComponent {
    private changeDetectionRef;
    value: any;
    contentWrapper: ElementRef;
    text: any;
    multiple: boolean;
    selected: boolean;
    onSelect: any;
    constructor(changeDetectionRef: ChangeDetectorRef);
    setMultiple(multiple: boolean): void;
    updateSelected(value: any): void;
    ngAfterViewInit(): void;
    readonly stringValue: string;
    private stringifyValue(value);
}
