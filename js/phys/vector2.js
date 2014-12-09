/**
 * Created by ashi on 2014-12-08.
 */

function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector2.prototype = {
    set: function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    },
    setV: function(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    },
    setZero: function() {
        this.x = 0;
        this.y = 0;
        return this;
    }
};

Vector2.prototype.clone = function() {
    return new Vector2(this.x, this.y);
};

/* Operations */

Vector2.prototype.add = function(v, out) {
    var x = this.x + v.x;
    var y = this.y + v.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.addSelf = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
};

Vector2.prototype.sub = function(v, out) {
    var x = this.x - v.x;
    var y = this.y - v.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.subSelf = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
};

Vector2.prototype.scale = function(s, out) {
    var x = s * this.x;
    var y = s * this.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.scaleSelf = function(s) {
    this.x *= s;
    this.y *= s;
    return this;
};

Vector2.prototype.addS = function(s, v, out) {
    var x = this.x + s * v.x;
    var y = this.y + s * v.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.addSSelf = function(s, v) {
    this.x += s * v.x;
    this.y += s * v.y;
    return this;
};

Vector2.prototype.addXY = function(x, y, out) {
    if (out)
        return out.set(this.x + x, this.y + y);
    else
        return new Vector2(this.x + x, this.y + y);
};

Vector2.prototype.addXYSelf = function(x, y) {
    this.x += x;
    this.y += y;
    return this;
};

Vector2.prototype.abs = function(out) {
    var x = Math.abs(this.x);
    var y = Math.abs(this.y);
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.absSelf = function() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
};

Vector2.prototype.normalize = function(out) {
    var len = Math.sqrt(this.x * this.x + this.y * this.y);
    var x = this.x / len;
    var y = this.y / len;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.normalizeSelf = function() {
    var len = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= len;
    this.y /= len;
    return this;
};

Vector2.prototype.reNormalize = function (out) {
    var len2 = this.x * this.x + this.y * this.y;
    if (out)
        return out.set(this.x / len2, this.y / len2);
    else
        return new Vector2(this.x / len2, this.y / len2);
};

Vector2.prototype.reNormalizeSelf = function() {
    var len2 = this.x * this.x + this.y * this.y;
    this.x /= len2;
    this.y /= len2;
    return this;
};

Vector2.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.lengthSquared = function() {
    return this.x * this.x + this.y * this.y;
};

/* Geometry and linear algebra */

Vector2.prototype.min = function(v, out) {
    var x = Math.min(this.x, v.x);
    var y = Math.min(this.y, v.y);
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.max = function(v, out) {
    var x = Math.max(this.x, v.x);
    var y = Math.max(this.y, v.y);
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.dot = function(v) {
    return this.x * v.x + this.y * v. y;
};

Vector2.prototype.cross = function(v) {
    return this.x * v.y - this.y * v.x;
};

Vector2.prototype.lerp = function(v, t, out) {
    var x = this.x + t * (v.x - this.x);
    var y = this.y + t * (v.y - this.y);
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.transform = function(a, b, c, d, out) {
    var x = a * this.x + b * this.y;
    var y = c * this.x + d * this.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.transformSelf = function(a, b, c, d) {
    var x = a * this.x + b * this.y;
    this.y = c * this.x + d * this.y;
    this.x = x;
    return this;
};

Vector2.prototype.transformAround = function(a, b, c, d, pivot, out) {
    var px = pivot.x, py = pivot.y,
        rx = this.x - pivot.x, ry = this.y - pivot.y;
    var x = a * rx + b * ry + px;
    var y = c * rx + d * ry + py;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.transformAroundSelf = function(a, b, c, d, pivot) {
    var px = pivot.x, py = pivot.y,
        rx = this.x - pivot.x, ry = this.y - pivot.y;
    var x = a * rx + b * ry + px;
    this.y = c * rx + d * ry + py;
    this.x = x;
    return this;
};

Vector2.prototype.rotate = function(angle, out) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return this.transform(c, -s, s, c, out)
};

Vector2.prototype.rotateSelf = function(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return this.transformSelf(c, -s, s, c);
};

Vector2.prototype.rotateAround = function(angle, pivot, out) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return this.transformAround(c, -s, s, c, pivot, out);
};

Vector2.prototype.rotateAroundSelf = function(angle, pivot) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return this.transformAroundSelf(c, -s, s, c, pivot);
};

Vector2.prototype.clamp = function (min, max, out) {
    var x = (this.x < min.x) ? min.x : (this.x > max.x) ? max.x : this.x;
    var y = (this.y < min.y) ? min.y : (this.y > max.y) ? max.y : this.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.clampSelf = function(min, max) {
    if (this.x < min.x)
        this.x = min.x;
    else if (this.x > max.x)
        this.x = max.x;
    if (this.y < min.y)
        this.y = min.y;
    else if (this.y > max.y)
        this.y = max.y;
    return this;
};

Vector2.prototype.distance = function(v) {
    var dx = v.x - this.x, dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Vector2.prototype.distanceSquared = function(v) {
    var dx = v.x - this.x, dy = v.y - this.y;
    return dx * dx + dy * dy;
};

Vector2.prototype.project = function(v, out) {
    var s = this.dot(v) / v.lengthSquared();
    var x = s * v.x, y = s * v.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.projectSelf = function(v) {
    var s = this.dot(v) / v.lengthSquared();
    this.x = s * v.x;
    this.y = s * v.y;
    return this;
};

Vector2.prototype.projectUnit = function(u, out) {
    var s = this.dot(u);
    var x = s * u.x, y = s * u.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.projectUnitSelf = function(u) {
    var s = this.dot(u);
    this.x = s * u.x;
    this.y = s * u.y;
    return this;
};

// reflect(v, axis) = v + 2 * (project(v, axis) - v)
// = 2 * project(v, axis) - v
Vector2.prototype.reflect = function(v, out) {
    var s = this.dot(v) / v.lengthSquared();
    var x = 2 * s * v.x - this.x;
    var y = 2 * s * v.y - this.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.reflectSelf = function(v) {
    var s = this.dot(v) / v.lengthSquared();
    this.x = 2 * s * v.x - this.x;
    this.y = 2 * s * v.y - this.y;
    return this;
};

Vector2.prototype.reflectUnit = function(u, out) {
    var s = this.dot(u);
    var x = 2 * s * u.x - this.x;
    var y = 2 * s * u.x - this.y;
    if (out)
        return out.set(x, y);
    else
        return new Vector2(x, y);
};

Vector2.prototype.reflectUnitSelf = function(u) {
    var s = this.dot(u);
    this.x = 2 * s * u.x - this.x;
    this.y = 2 * s * u.y - this.y;
    return this;
};

Vector2.prototype.leftNormal = function(out) {
    if (out)
        return out.set(-this.y, this.x);
    else
        return new Vector2(-this.y, this.x);
};

Vector2.prototype.rightNormal = function(out) {
    if (out)
        return out.set(this.y, -this.x);
    else
        return new Vector2(this.y, -this.x);
};

Vector2.prototype.leftUnitNormal = function(out) {
    var s = this.length;
    if (out)
        return out.set(-this.y / s, this.x / s);
    else
        return new Vector2(-this.y / s, this.x / s);
};

Vector2.prototype.rightUnitNormal = function(out) {
    var s = this.length;
    if (out)
        return out.set(this.y / s, -this.x / s);
    else
        return new Vector2(this.y / s, -this.x / s);
};

Vector2.prototype.equals = function(v) {
    return (this.x == v.x && this.y == v.y);
};

Vector2.prototype.getAngle = function() {
    return Math.atan2(this.y, this.x);
};

Vector2.prototype.isContainedBy = function(min, max) {
    return (min.x <= this.x && this.x <= max.x &&
    min.y <= this.y && this.y <= max.y);
};