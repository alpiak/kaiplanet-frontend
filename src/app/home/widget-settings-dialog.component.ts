/**
 * Created by qhyang on 2017/9/13.
 */

/**
 * Created by qhyang on 2017/8/15.
 */

import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MD_DIALOG_DATA } from "@angular/material";

import { GridStackService } from "./grid-stack.service";

import { Widget } from "../interfaces";

@Component({
    template: require("./widget-settings-dialog.component.pug"),
    styles: [ require("./widget-settings-dialog.component.scss") ]
})
export class WidgetSettingsDialogComponent implements OnInit{
    widgetSettingsForm: FormGroup;
    widget: Widget;

    constructor(@Inject(MD_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private gridStackService: GridStackService) { }

    ngOnInit() {
        this.widgetSettingsForm = this.formBuilder.group({
            basic: this.formBuilder.group({
                backgroundColor: ""
            })
        });
        this.gridStackService.getWidgetData().subscribe(gridStackData => {
            this.widget = gridStackData[this.data.index];
        });
    }
}
