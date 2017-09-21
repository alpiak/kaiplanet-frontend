/**
 * Created by qhyang on 2017/3/12.
 */

import { Compiler, Component, EventEmitter, Input, Output, NgModuleFactory } from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";

import { WidgetsModule } from "../widgets/widgets.module";

import { GridStackService } from "./grid-stack.service";

import { WidgetSettingsDialogComponent } from "./widget-settings-dialog.component";

@Component({
    selector: "[widget-frame]",
    template: require("./widget-frame.component.pug"),
    styles: [ require("./widget-frame.component.scss") ]
})
export class widgetFrameComponent{
    @Input() index: number;
    @Input() widgetType: string;
    private widgetsModule: NgModuleFactory<any>;
    @Output() onClose = new EventEmitter<number>();

    constructor(private compiler: Compiler, private gridStackService: GridStackService, private dialog: MdDialog) {
        this.widgetsModule = compiler.compileModuleSync(WidgetsModule);
    }

    openSettings() {
        const dialogRef = this.dialog.open(WidgetSettingsDialogComponent, {
            data: { index: this.index }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.gridStackService.updateGridStackData(this.index, result);
            }
        });
    }

    enterManageMode() {
        this.gridStackService.enterManageMode();
    }

    close(index: number) {
        this.onClose.emit(index);
    }
}