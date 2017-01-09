var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, NgModule, ViewEncapsulation } from '@angular/core';
export var MdlPopoverComponent = (function () {
    function MdlPopoverComponent(changeDetectionRef, elementRef) {
        this.changeDetectionRef = changeDetectionRef;
        this.elementRef = elementRef;
        this.hideOnClick = false;
        this.isVisible = false;
        this.directionUp = false;
    }
    MdlPopoverComponent.prototype.ngAfterViewInit = function () {
        // Add a hide listener to native element
        this.elementRef.nativeElement.addEventListener('hide', this.hide.bind(this));
    };
    MdlPopoverComponent.prototype.onDocumentClick = function (event) {
        if (this.isVisible &&
            (this.hideOnClick || !this.elementRef.nativeElement.contains(event.target))) {
            this.hide();
        }
    };
    MdlPopoverComponent.prototype.ngOnDestroy = function () {
        this.elementRef.nativeElement.removeEventListener('hide');
    };
    MdlPopoverComponent.prototype.toggle = function (event) {
        if (this.isVisible) {
            this.hide();
        }
        else {
            this.hideAllPopovers();
            this.show(event);
        }
    };
    MdlPopoverComponent.prototype.hide = function () {
        this.isVisible = false;
        this.changeDetectionRef.markForCheck();
    };
    MdlPopoverComponent.prototype.hideAllPopovers = function () {
        var nodeList = document.querySelectorAll('.mdl-popover.is-visible');
        for (var i = 0; i < nodeList.length; ++i) {
            nodeList[i].dispatchEvent(new Event('hide'));
        }
    };
    MdlPopoverComponent.prototype.show = function (event) {
        event.stopPropagation();
        this.isVisible = true;
        this.updateDirection(event);
    };
    MdlPopoverComponent.prototype.updateDirection = function (event) {
        var _this = this;
        var nativeEl = this.elementRef.nativeElement;
        var targetRect = event.target.getBoundingClientRect();
        var viewHeight = window.innerHeight;
        setTimeout(function () {
            var height = nativeEl.offsetHeight;
            if (height) {
                var spaceAvailable = {
                    top: targetRect.top,
                    bottom: viewHeight - targetRect.bottom
                };
                _this.directionUp = spaceAvailable.bottom < height;
                _this.changeDetectionRef.markForCheck();
            }
        });
    };
    __decorate([
        Input('hide-on-click'), 
        __metadata('design:type', Boolean)
    ], MdlPopoverComponent.prototype, "hideOnClick", void 0);
    __decorate([
        HostBinding('class.is-visible'), 
        __metadata('design:type', Object)
    ], MdlPopoverComponent.prototype, "isVisible", void 0);
    __decorate([
        HostBinding('class.direction-up'), 
        __metadata('design:type', Object)
    ], MdlPopoverComponent.prototype, "directionUp", void 0);
    __decorate([
        HostListener('document:click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], MdlPopoverComponent.prototype, "onDocumentClick", null);
    MdlPopoverComponent = __decorate([
        Component({selector: 'mdl-popover',
            host: {
                '[class.mdl-popover]': 'true'
            },
            template: "<ng-content></ng-content> ",
            encapsulation: ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [ChangeDetectorRef, ElementRef])
    ], MdlPopoverComponent);
    return MdlPopoverComponent;
}());
export var MdlPopoverModule = (function () {
    function MdlPopoverModule() {
    }
    MdlPopoverModule.forRoot = function () {
        return {
            ngModule: MdlPopoverModule,
            providers: []
        };
    };
    MdlPopoverModule = __decorate([
        NgModule({
            imports: [],
            exports: [MdlPopoverComponent],
            declarations: [MdlPopoverComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], MdlPopoverModule);
    return MdlPopoverModule;
}());

//# sourceMappingURL=popover.js.map
