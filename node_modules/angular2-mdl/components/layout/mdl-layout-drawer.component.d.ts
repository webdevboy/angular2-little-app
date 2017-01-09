import { MdlLayoutComponent } from './mdl-layout.component';
export declare class MdlLayoutDrawerComponent {
    private parentLayout;
    isDrawerVisible: boolean;
    constructor(parentLayout: MdlLayoutComponent);
    isDrawerDirectChildOf(layout: MdlLayoutComponent): boolean;
}
