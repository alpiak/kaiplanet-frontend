/**
 * Created by qhyang on 2017/9/6.
 */

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Headers, Http, URLSearchParams } from "@angular/http";

@Injectable()
export class UploadService {
    constructor(private http: Http) { }

    uploadBase64Encoded(data: string, name: string): Observable<any> {
        let urlSearchParams = new URLSearchParams;

        urlSearchParams.set("data", data);
        urlSearchParams.set("name", name);

        return this.http.post(require("../config.json").urlBase + "/user/drawingboardimg", urlSearchParams.toString().replace(/\+/g, '%2B'), { headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }) });
    }
}
