/**
 * Created by ashi on 2014-12-09.
 */

var glUtils = {};

glUtils.initGL = function(canvas) {
    var gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {}

    if (!gl)
        gl = null;

    return gl;
};
