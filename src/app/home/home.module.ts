/**
 * Created by qhyang on 2017/3/6.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";

import { MaterialModule } from "../material.module";

import { HomeRoutingModule } from "./home-routing.module";

import { WidgetsModule } from "../widgets/widgets.module";

import { HomeComponent } from "./home.component";
import { leftNavComponent } from "./left-nav.component";
import { gridStackComponent } from "./grid-stack.component";
import { widgetFrameComponent } from "./widget-frame.component";
import { WidgetSettingsDialogComponent } from "./widget-settings-dialog.component";

import { ColorPickerDirective } from "./color-picker.directive";

import { WidgetComponentPipe } from "../widgets/widget-component.pipe";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        HomeRoutingModule,
        WidgetsModule
    ],
    declarations: [
        HomeComponent,
        leftNavComponent,
        gridStackComponent,
        widgetFrameComponent,
        WidgetSettingsDialogComponent,
        ColorPickerDirective,
        WidgetComponentPipe
    ],
    entryComponents: [ WidgetSettingsDialogComponent ]
})
export class HomeModule { }