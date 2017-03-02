/**
 * Created by qhyang on 2017/2/13.
 */

import "../style/bootstrap.min";
import "../script/parallax";

import "../style/base";

// Fallback to loading jQuery from a local path if the CDN is unavailable
if (!window["jQuery"]) {
    window["jQuery"] = require("jquery")
}
