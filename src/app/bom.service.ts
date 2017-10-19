/**
 * Created by qhyang on 2017/2/17.
 */

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import { Injectable } from "@angular/core";

@Injectable()
export class BomService {
    navigateTo(url: string) {
        window.location.href = url;
    }

    onWindowResize(): Observable<any> {
        return Observable.fromEvent(window, "resize");
    }

    onDocumentClick(): Observable<any> {
        return Observable.fromEvent(document, "click");
    }
}
