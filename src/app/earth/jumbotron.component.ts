/**
 * Created by qhyang on 2017/2/16.
 */

import "rxjs/add/operator/map";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { BomService } from "../bom.service";
import { LocaleService } from "../locale.service";
import { UserService } from "../user.service";
import { LoadingService } from "../loading.service";

import "../../scripts/parallax";
import "../../scripts/preloadjs-0.6.2.combined";

@Component({
    selector: "jumbotron",
    template: require("./jumbotron.component.pug"),
    styles: [ require("./jumbotron.component.scss") ]
})
export class JumbotronComponent implements OnInit, OnDestroy {
    private backgroundImage: string;
    private backgroundFrontImage: string;
    private height: number;
    private width: number;
    private langClasses: any = {};
    private userName: string;
    private parallax: Parallax;
    private loadQueue: createjs.LoadQueue;

    constructor(private bomService: BomService, private localeService: LocaleService, private userService: UserService, private loadingService: LoadingService) { }

    ngOnInit() {
        this.loadQueue = new createjs.LoadQueue();

        this.loadQueue.on("fileload", handleFileLoad, this);
        this.loadQueue.on("progress", handleProgress, this);
        this.loadQueue.on("complete", handleComplete, this);

        this.loadQueue.loadManifest([
            { id: "background", src:require("../../assets/h8nxgssjqxs-jonatan-pie-back.jpg") },
            { id: "backgroundFront", src:require("../../assets/h8nxgssjqxs-jonatan-pie-front.png") }
        ]);

        function handleFileLoad(event: any) {
            console.log(event);
            const item = event.item;

            switch (event.item.id) {
                case "background":
                    this.backgroundImage = item.src;
                    break;
                case "backgroundFront":
                    this.backgroundFrontImage = item.src;
                    break;
            }
        }

        function handleProgress(event: any) {
            if (this.loadingService.isInit) {
                this.loadingService.progress(event.progress * 100);
            }
        }

        function handleComplete(event: any) {
            this.loadingService.finish();
        }

        this.height = this.bomService.getWindowHeight();
        this.parallax = new Parallax(document.getElementById("parallax-scene"));
        this.bomService.onWindowResize()
            .subscribe(() => this.height = this.bomService.getWindowHeight());

        switch (this.localeService.currentLocale) {
            case "en-US":
                this.langClasses.lang_en = true;
                break;
            case "zh-CN":
                this.langClasses.lang_zh = true;
                break;
            case "ja-JP":
                this.langClasses.lang_ja = true;
                break;
            default:
                this.langClasses.lang_en = true;
                break;
        }

        this.userService.getUserInfo().subscribe((data: any) => {
            if (data && data.nickName) {
                this.userName = data.nickName;
            }
        });
    }

    ngOnDestroy() {
        if (this.parallax) {
            this.parallax.disable();
        }

        if (this.loadQueue) {
            this.loadQueue.destroy();
        }
    }
}
