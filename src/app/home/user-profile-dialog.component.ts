/**
 * Created by qhyang on 2017/10/18.
 */

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

import { UserService } from "../user.service";

const moment = require("moment");

function dateValidator(control: AbstractControl): {[key: string]: any} {
    let valid: boolean = false;

    if (typeof control.value === "string") {
        valid = moment(control.value.replace(/[\u4e00-\u9fa5]/g, " ")).isValid();
    } else if (control.value === null) {
        valid = true;
    }

    return valid ? null : {"forbidden": {value: control.value}};
}

@Component({
    template: require("./user-profile-dialog.component.pug")
})
export class UserProfileDialogComponent implements OnInit {
    private userProfileForm: FormGroup;

    constructor(private userService: UserService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.userProfileForm = this.formBuilder.group({
            basic: this.formBuilder.group({
                nickName: ["Guest", Validators.required],
                birthday: [null, dateValidator],
                gender: null
            })
        });
        this.userService.getUserInfo().subscribe((data) => {
            this.userProfileForm.setValue({
                basic: {
                    nickName: data.nickName || null,
                    birthday: data.birthday || null,
                    gender: data.gender
                }
            });
        });
    }

    getCurrentSettings() {
        const formModel = this.userProfileForm.value;

        let settings: any = {};

        settings.nickName = formModel.basic.nickName;

        if (typeof formModel.basic.birthday === "string") {
            settings.birthday = moment(formModel.basic.birthday.replace(/[\u4e00-\u9fa5]/g, " ")).valueOf();
        } else {
            settings.birthday = null;
        }

        settings.gender = formModel.basic.gender;

        return settings;
    }
}