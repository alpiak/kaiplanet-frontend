/**
 * Created by qhyang on 2017/9/13.
 */

/**
 * Created by qhyang on 2017/8/15.
 */

import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MD_DIALOG_DATA } from "@angular/material";

import { FileUploader } from "ng2-file-upload";

import { GridStackService } from "./grid-stack.service";

import { Widget } from "../interfaces";

@Component({
    template: require("./widget-settings-dialog.component.pug"),
    styles: [ require("./widget-settings-dialog.component.scss") ]
})
export class WidgetSettingsDialogComponent implements OnInit{
    private widgetSettingsForm: FormGroup;
    private widget: Widget;
    private showBackgroundImageConfig: boolean = false;
    private uploader:FileUploader = new FileUploader({url: require("../../config.json").urlBase + "/upload/files"});

    constructor(@Inject(MD_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private gridStackService: GridStackService) { }

    ngOnInit() {
        this.widgetSettingsForm = this.formBuilder.group({
            basic: this.formBuilder.group({
                backgroundColor: ""
            })
        });
        this.gridStackService.getWidgetData().subscribe(gridStackData => {
            this.widget = gridStackData[this.data.index];
            if (!this.widget.config) {
                this.widget.config = {};
            }
            if (!this.widget.data) {
                this.widget.data = {};
            }
            if (!this.widget.config.background) {
                this.widget.config.background = {};
            }
            this.widgetSettingsForm.setValue({
                basic: {
                    backgroundColor: this.widget.config.background.color || null,
                }
            });
        });

        let images: any[] = [];

        this.uploader.onSuccessItem = (item, response: any) => {
            response = JSON.parse(response);

            if (response.code === 1) {
                images.push({
                    url: response.data.file.url,
                    title: item.file.name
                });
            } else {
                // TODO: add error handler
            }
        };

        this.uploader.onCompleteAll = () => {
            this.widget.config.background.images = images;
            this.showBackgroundImageConfig = false;
            images = [];
            this.uploader.clearQueue();
        };
    }

    saveSettings(): Widget {
        const formModel = this.widgetSettingsForm.value;

        let widget: Widget = this.widget;

        widget.config.background.color = formModel.basic.backgroundColor;

        return widget;
    }

    onBackgroundColorPicked(color: string) {
        this.widgetSettingsForm.patchValue({ basic: { backgroundColor: color } });
        this.widget.config.background.color = color;
    }
}
