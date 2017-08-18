/**
 * Created by qhyang on 2017/2/13.
 */

// import { jQuery, $ } from "jquery";

import "bootstrap/dist/css/bootstrap";
import "@angular/material/prebuilt-themes/deeppurple-amber";
import "material-design-lite/dist/material.blue_grey-amber.min";
import "material-design-lite/material.js";
import "../styles/languages";
import "./parallax";
import "dialog-polyfill/dialog-polyfill.css";

import "../styles/base";
import "../styles/default.theme";

// Fallback to loading jQuery from a local path if the CDN is unavailable
if (!window["$"] && !window["jQuery"]) {
    window["jQuery"] = window["$"] = require("jquery/dist/jquery");
}

let jQuery = require("jquery");

// Material Design SVG symbol sprite icons
let action = require("material-design-icons/sprites/svg-sprite/svg-sprite-action-symbol.svg"),
    device = require("material-design-icons/sprites/svg-sprite/svg-sprite-content-symbol.svg"),
    content = require("material-design-icons/sprites/svg-sprite/svg-sprite-navigation-symbol.svg");

action = action.substr(0, 43) + " style='display:none'" + action.substr(43);
device = device.substr(0, 43) + " style='display:none'" + device.substr(43);
content = content.substr(0, 43) + " style='display:none'" + content.substr(43);

jQuery("body").prepend(action + device + content);
