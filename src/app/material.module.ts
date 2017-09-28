/**
 * Created by qhyang on 2017/7/27.
 */

import { NgModule } from "@angular/core";
import { MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdSelectModule, MdGridListModule, MdCardModule, MdFormFieldModule, MdProgressBarModule, MdTooltipModule } from "@angular/material";

@NgModule({
    imports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdSelectModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdFormFieldModule, MdTooltipModule ],
    exports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdSelectModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdFormFieldModule, MdTooltipModule ],
})
export class MaterialModule { }
