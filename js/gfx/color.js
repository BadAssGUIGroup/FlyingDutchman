/**
 * Created by ashi on 2014-12-09.
 */

function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

Color.prototype.toRGBA = function(alphaScale) {
    var alpha = (alphaScale != null) ? alphaScale * this.a : this.a;
    return "rgba(" + this.r + ", " + this.g + "," + this.b + "," + alpha + ")";
};