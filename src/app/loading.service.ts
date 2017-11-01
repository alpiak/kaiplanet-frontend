/**
 * Created by qhyang on 2017/4/11.
 */

import { Injectable } from "@angular/core";

const jQuery = require("jquery"),
    TweenLite = require("TweenLite");

@Injectable()
export class LoadingService {
    private loadedPercent: number;
    private inProgress: boolean;

    start(callback?: any) {
        this.loadedPercent = 0;
        if (!this.inProgress) {
            this.inProgress = true;
            jQuery(".app-loading__counter h1").text("0%");
            jQuery(".app-loading__counter hr").width("0%");
            jQuery(".app-loading").fadeIn("normal", callback);
        }
    }
    progress(progress: number) {
        if (!this.inProgress) {
            this.start();
        }

        let loading = {
            progress: this.loadedPercent || 0
        };

        this.loadedPercent = progress;
        TweenLite.to(loading, 0.5, {
            progress: progress,
            onUpdate: function() {
                jQuery(".app-loading__counter h1").text(loading.progress.toFixed() + "%");
                jQuery(".app-loading__counter hr").width(loading.progress.toFixed() + "%");
            }
        });
    }
    increase(increase: number) {
        if (!this.inProgress) {
            this.start();
        }

        let loading = {
                progress: this.loadedPercent || 0
            },
            progress = this.loadedPercent + increase > 100 ? 100 : this.loadedPercent + increase;


        this.loadedPercent = progress;
        TweenLite.to(loading, 0.5, {
            progress: progress,
            onUpdate: function() {
                jQuery(".app-loading__counter h1").text(loading.progress.toFixed() + "%");
                jQuery(".app-loading__counter hr").width(loading.progress.toFixed() + "%");
            }
        });
    }
    finish() {
        if (!this.inProgress) {
            this.start();
        }

        let loading = {
            progress: this.loadedPercent || 0
        };

        this.loadedPercent = 100;
        TweenLite.to(loading, 0.5, {
            progress: 100,
            onUpdate: function() {
                jQuery(".app-loading__counter h1").text(loading.progress.toFixed() + "%");
                jQuery(".app-loading__counter hr").width(loading.progress.toFixed() + "%");
            }
        });
        jQuery(".app-loading").fadeOut();
        this.loadedPercent = 0;
        this.inProgress = false;
    }
}