/**
 * Created by qhyang on 2017/3/6.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { ReactiveFormsModule }   from "@angular/forms";

import { MaterialModule } from "../material.module";
import { HomeRoutingModule } from "./home-routing.module";
import { WidgetsModule } from "../widgets/widgets.module";

import { HomeComponent } from "./home.component";
import { leftNavComponent } from "./left-nav.component";
import { gridStackComponent } from "./grid-stack.component";
import { widgetFrameComponent } from "./widget-frame.component";
import { AddWidgetDialogComponent } from "./add-widget-dialog.component";
import { ImageUploadPanelComponent } from "./image-upload-panel.component";
import { WidgetSettingsDialogComponent } from "./widget-settings-dialog.component";
import { LoginDialogComponent } from "../login-dialog.component";
import { UserProfileDialogComponent } from "../home/user-profile-dialog.component";

import { FileSelectDirective, FileDropDirective } from "ng2-file-upload";

import { ColorPickerDirective } from "./color-picker.directive";

import { WidgetComponentPipe } from "../widgets/widget-component.pipe";
import { ArrayPipe } from "../array.pipe";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HomeRoutingModule,
        WidgetsModule
    ],
    declarations: [
        FileSelectDirective,
        FileDropDirective,
        HomeComponent,
        leftNavComponent,
        gridStackComponent,
        widgetFrameComponent,
        AddWidgetDialogComponent,
        WidgetSettingsDialogComponent,
        LoginDialogComponent,
        UserProfileDialogComponent,
        ImageUploadPanelComponent,
        ColorPickerDirective,
        WidgetComponentPipe,
        ArrayPipe
    ],
    entryComponents: [
        AddWidgetDialogComponent,
        WidgetSettingsDialogComponent,
        LoginDialogComponent,
        UserProfileDialogComponent
    ]
})
export class HomeModule { }