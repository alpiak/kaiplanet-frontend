/**
 * Created by qhyang on 2017/3/12.
 */

import { Compiler, Component, Input, NgModuleFactory } from "@angular/core";

import { WidgetsModule } from "../widgets/widgets.module";

@Component({
    selector: "[widget-frame]",
    template: require("./widget-frame.component.pug"),
    styles: [require("./widget-frame.component.scss")]
})
export class widgetFrameComponent {
    @Input()
    widgetType: string;
    widgetsModule: NgModuleFactory<any>;

    constructor(compiler: Compiler) {
        this.widgetsModule = compiler.compileModuleSync(WidgetsModule);
    }
}