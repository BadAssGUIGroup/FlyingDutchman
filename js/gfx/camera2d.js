/**
 * Created by ashi on 2014-12-09.
 */

function Camera2D() {
    this.position = new Vector2(0, 0);
    this.angle = 0;
    this.scale = 1;
}

Camera2D.prototype.setScale = function(scale) {
    this.scale = scale;
};

Camera2D.prototype.setAngle = function(angle) {
    this.angle = angle;
};

Camera2D.prototype.translate = function(v) {
    this.position.addSelf(v);
};

Camera2D.prototype.translateXY = function(x, y) {
    this.position.addXYSelf(x, y);
};

Camera2D.prototype.rotate = function(angle) {
    this.angle += angle;
};

Camera2D.prototype.zoom = function(zoom) {
    this.scale *= zoom;
};

Camera2D.prototype.moveTo = function(p) {
    this.position.setV(p);
};

Camera2D.prototype.moveToXY = function(x, y) {
    this.position.set(x, y);
};

Camera2D.prototype.localToWorld = function(p, out) {
    var cs = Math.cos(this.angle) / this.scale;
    var ss = Math.sin(this.angle) / this.scale;
    var px = p.x, py = p.y;
    var x = cs * px - ss * py + this.position.x;
    var y = ss * px + cs * py + this.position.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Camera2D.prototype.worldToLocal = function(p, out) {
    var cs = Math.cos(this.angle) * this.scale;
    var ss = Math.sin(this.angle) * this.scale;
    var px = p.x - this.position.x;
    var py = p.y - this.position.y;
    var x = cs * px + ss * py;
    var y = -ss * px - cs * py;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};


/*
 * (cs ss -x )
 * (-ss cs -y )
 * (0 0 1 )
 */
Camera2D.prototype.getViewMatrix = function(out) {
    var cs = Math.cos(this.angle) / this.scale;
    var ss = Math.sin(this.angle) / this.scale;
    out[0] = cs; out[3] = -ss; out[6] = this.position.x;
    out[1] = ss; out[4] = cs; out[7] = this.position.y;
    out[2] = 0; out[5] = 0; out[8] = 1;
    mat3.invert(out, out);
    return out;
};