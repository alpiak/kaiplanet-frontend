/**
 * Created by qhyang on 2017/9/26.
 */

import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";

import { FileUploader } from "ng2-file-upload";

import { Image } from "../interfaces";

@Component({
    selector: "image-upload-panel",
    template: require("./image-upload-panel.component.pug"),
    styles: [ require("./image-upload-panel.component.scss") ]
})
export class ImageUploadPanelComponent implements OnInit {
    @Input() images: Image[];
    @Output() onUploaded = new EventEmitter<Image[]>();
    private showBackgroundImageConfig: boolean = false;
    private uploader:FileUploader = new FileUploader({url: require("../../config.json").urlBase + "/upload/files"});

    ngOnInit() {
        let images: Image[] = [];

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
            this.onUploaded.emit(images);
            this.showBackgroundImageConfig = false;
            images = [];
            this.uploader.clearQueue();
        };
    }
}