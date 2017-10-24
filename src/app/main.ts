/**
 * Created by qhyang on 2017/2/13.
 */

import "reflect-metadata";
import "zone.js";
import "hammerjs";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { getTranslationProviders } from "./i18n-providers";
import { AppModule } from "./app.module";

// Detect user language
if (!sessionStorage.getItem("locale")) {
    sessionStorage.setItem("locale", window.navigator.language || "en-US");
}

getTranslationProviders().then(providers => {
    const options = { providers };
    platformBrowserDynamic().bootstrapModule(AppModule, options);
});
