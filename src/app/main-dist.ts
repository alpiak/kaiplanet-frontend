/**
 * Created by qhyang on 2017/4/13.
 */

import "reflect-metadata";
import "zone.js";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { getTranslationProviders } from "./i18n-providers";
import { AppModule } from "./app.module";

import { enableProdMode } from '@angular/core';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
    enableProdMode();
}

// Detect user language
if (!sessionStorage.getItem("locale")) {
    sessionStorage.setItem("locale", window.navigator.language || "en-US");
}

getTranslationProviders().then(providers => {
    const options = { providers };
    platformBrowserDynamic().bootstrapModule(AppModule, options);
});
