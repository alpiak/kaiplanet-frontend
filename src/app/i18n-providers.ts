/**
 * Created by qhyang on 2017/2/24.
 */

import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from "@angular/core";

const locales: string[] = ["en-US", "zh-CN", "ja-JP"];
let translationFiles: Object = {};
for (let i = 0; i < locales.length; i++) {
    if (locales[i] !== "en-US") {
        translationFiles[locales[i]] = require(`../locale/messages.${locales[i]}.xlf`);
    }
}

export function getTranslationProviders(): Promise<Object[]> {

    // Get the locale id from the global
    const locale = document["locale"] as string;

    // Return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];

    // No locale or U.S. English: no translation providers
    if (!locale || locale === "en-US") {
        return Promise.resolve(noProviders);
    }

    // Ex: 'locale/messages.fr.xlf`
    const translationFile = translationFiles[locale];

    if (!translationFile) {
        return Promise.resolve(noProviders);
    } else {
        return Promise.resolve([
            { provide: TRANSLATIONS, useValue: translationFile },
            { provide: TRANSLATIONS_FORMAT, useValue: "xlf" },
            { provide: LOCALE_ID, useValue: locale }
        ]);
    }
}
