var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, ElementRef, Input, ViewChild } from '@angular/core';
export var MdlOptionComponent = (function () {
    function MdlOptionComponent(changeDetectionRef) {
        this.changeDetectionRef = changeDetectionRef;
        this.multiple = false;
        this.selected = false;
        this.onSelect = Function.prototype;
    }
    MdlOptionComponent.prototype.setMultiple = function (multiple) {
        this.multiple = multiple;
        this.changeDetectionRef.detectChanges();
    };
    MdlOptionComponent.prototype.updateSelected = function (value) {
        var _this = this;
        if (this.multiple) {
            this.selected = (value.map(function (v) { return _this.stringifyValue(v); }).indexOf(this.stringValue) != -1);
        }
        else {
            this.selected = this.value == value;
        }
        this.changeDetectionRef.detectChanges();
    };
    MdlOptionComponent.prototype.ngAfterViewInit = function () {
        this.text = this.contentWrapper.nativeElement.textContent.trim();
    };
    Object.defineProperty(MdlOptionComponent.prototype, "stringValue", {
        get: function () {
            return this.stringifyValue(this.value);
        },
        enumerable: true,
        configurable: true
    });
    MdlOptionComponent.prototype.stringifyValue = function (value) {
        switch (typeof value) {
            case 'number': return String(value);
            case 'object': return JSON.stringify(value);
            default: return (!!value) ? String(value) : '';
        }
    };
    __decorate([
        Input('value'), 
        __metadata('design:type', Object)
    ], MdlOptionComponent.prototype, "value", void 0);
    __decorate([
        ViewChild('contentWrapper'), 
        __metadata('design:type', ElementRef)
    ], MdlOptionComponent.prototype, "contentWrapper", void 0);
    MdlOptionComponent = __decorate([
        Component({selector: 'mdl-option',
            host: {
                '[class.mdl-option__container]': 'true'
            },
            template: "<div class=\"mdl-list__item\" (click)=\"onSelect($event, value)\" [class.is-active]=\"selected\"> <div *ngIf=\"multiple\" class=\"mdl-list__item-secondary-action\"> <div class=\"mdl-checkbox is-upgraded\" [class.is-checked]=\"selected\" (click)=\"onSelect($event, value)\"> <input type=\"checkbox\" class=\"mdl-checkbox__input\"> <span class=\"mdl-checkbox__label\"></span> <span class=\"mdl-checkbox__focus-helper\"></span> <span class=\"mdl-checkbox__box-outline\"> <span class=\"mdl-checkbox__tick-outline\"></span> </span> </div> </div> <div #contentWrapper class=\"mdl-list__item-primary-content\"> <ng-content></ng-content> </div> </div> "
        }), 
        __metadata('design:paramtypes', [ChangeDetectorRef])
    ], MdlOptionComponent);
    return MdlOptionComponent;
}());

//# sourceMappingURL=option.js.map
