/**
 * Created by qhyang on 2017/2/13.
 */

// import { jQuery, $ } from "jquery";

import "bootstrap/dist/css/bootstrap";
import "material-design-lite/material.css";
import "material-design-lite/material.js";
import "../styles/languages";

import "../styles/base.scss";

let jQuery = require("jquery"),
    materialDesignSvgSpriteDeviceSymbol = require("material-design-icons/sprites/svg-sprite/svg-sprite-content-symbol.svg"),
    materialDesignSvgSpriteContentSymbol = require("material-design-icons/sprites/svg-sprite/svg-sprite-navigation-symbol.svg");

materialDesignSvgSpriteDeviceSymbol = materialDesignSvgSpriteDeviceSymbol.substr(0, 43) +
        " style='display:none'" +
    materialDesignSvgSpriteDeviceSymbol.substr(43);
materialDesignSvgSpriteContentSymbol = materialDesignSvgSpriteContentSymbol.substr(0, 43) +
    " style='display:none'" +
    materialDesignSvgSpriteContentSymbol.substr(43);

jQuery("body").prepend(
    materialDesignSvgSpriteDeviceSymbol +
    materialDesignSvgSpriteContentSymbol
);

// Fallback to loading jQuery from a local path if the CDN is unavailable
// if (!window["jQuery"]) {
//     window["jQuery"] = jQuery;
//     window["$"] = jQuery;
// }
