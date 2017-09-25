/**
 * Created by qhyang on 2017/7/27.
 */

import { NgModule } from "@angular/core";
import { MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdGridListModule, MdCardModule, MdFormFieldModule } from "@angular/material";

@NgModule({
    imports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdGridListModule, MdCardModule, MdFormFieldModule ],
    exports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdGridListModule, MdCardModule, MdFormFieldModule ],
})
export class MaterialModule { }
