/**
 * Created by qhyang on 2017/9/27.
 */

import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ImageUploadPanelComponent } from "./image-upload-panel.component";

import { GridStackService } from "./grid-stack.service";

import { Widget, Image } from "../interfaces";

@Component({
    template: require("./add-widget-dialog.component.pug"),
    // styles: [ require("./add-widget-dialog.component.scss") ]
})
export class AddWidgetDialogComponent implements OnInit {
    private widgetSettingsForm: FormGroup;
    private widget: Widget;
    @ViewChildren(ImageUploadPanelComponent)
    private imageUploadPanelComponents: QueryList<ImageUploadPanelComponent>;
    private widgetTypes: Object;

    constructor(private formBuilder: FormBuilder, private gridStackService: GridStackService) {
        this.widget = {
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            type: ""
        };
    }

    ngOnInit() {
        this.widgetTypes = this.gridStackService.getWidgetTypes();
        this.widgetSettingsForm = this.formBuilder.group({
            basic: this.formBuilder.group({
                type: ["", Validators.required],
                zIndex: [0, Validators.required]
            }),
            detail: this.formBuilder.group({
                plainType: "wind-and-sand" // for the plain widget
            })
        });
    }

    getCurrentSettings(): Widget {
        const formModel = this.widgetSettingsForm.value;

        let widget: Widget = this.widget;

        widget.type = formModel.basic.type;
        widget.zIndex = formModel.basic.zIndex;

        if (widget.type === "carousel") {
            if (!widget.data) {
                widget.data = {};
            }
            if (!widget.data.images) {
                widget.data.images = [];
            }
        }

        if (widget.type === "plain") {
            widget.config = {};
            widget.config.type = formModel.detail.plainType;
        }

        return widget;
    }

    onImagesUploaded(images: Image[]) {
        if (!this.widget.data) {
            this.widget.data = {};
        }
        this.widget.data.images = images;
    }

    onImageRemoved(index: number) {
        this.widget.data.images.splice(index, 1);
    }
}
