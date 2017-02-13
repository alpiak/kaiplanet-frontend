/**
 * Created by qhyang on 2017/2/13.
 */

import "reflect-metadata";
import "zone.js";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);