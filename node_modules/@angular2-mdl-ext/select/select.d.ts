import { ChangeDetectorRef, ModuleWithProviders, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MdlPopoverComponent } from '../popover/index';
import { MdlOptionComponent } from './option';
export declare class SearchableComponent {
    private clearTimeout;
    private query;
    private searchTimeout;
    constructor(searchTimeout?: number);
    protected updateSearchQuery(event: any): void;
    protected getSearchQuery(): string;
}
export declare class MdlSelectComponent extends SearchableComponent implements ControlValueAccessor {
    private changeDetectionRef;
    ngModel: any;
    disabled: boolean;
    isFloatingLabel: any;
    placeholder: string;
    multiple: boolean;
    private change;
    popoverComponent: MdlPopoverComponent;
    optionComponents: QueryList<MdlOptionComponent>;
    private textfieldId;
    private text;
    private textByValue;
    private onChange;
    private onTouched;
    private focused;
    constructor(changeDetectionRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    onKeydown($event: KeyboardEvent): void;
    private onCharacterKeydown($event);
    private onArrowUp($event);
    private onArrowDown($event);
    private addFocus();
    private removeFocus();
    private isEmpty();
    reset(resetValue?: boolean): void;
    private bindOptions();
    private renderValue(value);
    private stringifyValue(value);
    private toggle($event);
    open($event: Event): void;
    close($event: Event): void;
    private onSelect($event, value);
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
    getLabelVisibility(): string;
}
export declare class MdlSelectModule {
    static forRoot(): ModuleWithProviders;
}
