/**
 * Created by qhyang on 2017/3/12.
 */

import { Compiler, Component, EventEmitter, Input, Output, NgModuleFactory } from "@angular/core";

import { WidgetsModule } from "../widgets/widgets.module";

@Component({
    selector: "[widget-frame]",
    template: require("./widget-frame.component.pug"),
    styles: [ require("./widget-frame.component.scss") ]
})
export class widgetFrameComponent {
    @Input() index: number;
    @Input() widgetType: string;
    widgetsModule: NgModuleFactory<any>;
    @Output() onClose = new EventEmitter<number>();

    constructor(compiler: Compiler) {
        this.widgetsModule = compiler.compileModuleSync(WidgetsModule);
    }

    openSettings() {
        // TODO: remove after the widget settings feature added
        setTimeout(() => alert("Widget settings feature will be included in the next release!"), 300);
    }
    close(index: number) {
        this.onClose.emit(index);
    }
}