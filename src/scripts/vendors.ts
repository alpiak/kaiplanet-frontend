/**
 * Created by qhyang on 2017/2/13.
 */

import "bootstrap/dist/css/bootstrap";
import "@angular/material/prebuilt-themes/deeppurple-amber";
import "material-design-lite/dist/material.blue_grey-amber.min";
import "material-design-lite/material.js";
import "../styles/languages";
import "./parallax";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import "../styles/base";
import "../styles/default.theme";

// Fallback to loading jQuery from a local path if the CDN is unavailable
if (!window["$"] && !window["jQuery"]) {
    window["$"] = window["jQuery"] = require("jquery/dist/jquery");
}

// Fallback to loading TweenLite from a local path if the CDN is unavailable
if (!window["TweenLite"]) {
    window["TweenLite"] = require("gsap/TweenLite");
}

// Material Design SVG symbol sprite icons
let action = require("material-design-icons/sprites/svg-sprite/svg-sprite-action-symbol.svg"),
    device = require("material-design-icons/sprites/svg-sprite/svg-sprite-content-symbol.svg"),
    content = require("material-design-icons/sprites/svg-sprite/svg-sprite-navigation-symbol.svg");

action = action.substr(0, 43) + " style='display:none'" + action.substr(43);
device = device.substr(0, 43) + " style='display:none'" + device.substr(43);
content = content.substr(0, 43) + " style='display:none'" + content.substr(43);

const jQuery = require("jquery");

jQuery("body").prepend(action + device + content);

const Quill = require("quill");

// Add fonts to whitelist
const Font = Quill.import("formats/font");
Font.whitelist = ["sofia", "slabo", "roboto", "inconsolata", "ubuntu", "mirza", "aref"];
Quill.register(Font, true);
