/**
 * Created by qhyang on 2017/3/29.
 */

import { Injectable } from "@angular/core";

@Injectable()
export class LocaleService {
    currentLocale: string;

    constructor() {
        this.currentLocale = sessionStorage.getItem("locale") || "en-US";
    }

    setLocale(locale: string): void {
        this.currentLocale = locale;
        sessionStorage.setItem("locale", locale);
    }
}