/**
 * Created by qhyang on 2017/7/27.
 */

import { NgModule } from "@angular/core";
import { MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdFormFieldModule } from "@angular/material";

@NgModule({
    imports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdFormFieldModule ],
    exports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdFormFieldModule ],
})
export class MaterialModule { }
