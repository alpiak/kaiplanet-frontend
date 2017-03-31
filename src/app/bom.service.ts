/**
 * Created by qhyang on 2017/2/17.
 */

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import { Injectable } from "@angular/core";

@Injectable()
export class BomService {
    getWindowHeight(): number {
        const jQuery = require("jquery");

        return jQuery(window).height();
    }
    windowResize(): Observable<any> {
        return Observable.fromEvent(window, "resize");
    }
}