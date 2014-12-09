/**
 * Created by ashi on 2014-12-08.
 */

var Vectors = {
    leftNormal: function(p1, p2, out) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        if (out)
            return out.set(-dy, dx);
        else
            return new Vector2(-dy, dx);
    },
    rightNormal: function(p1, p2, out) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        if (out)
            return out.set(dy, -dx);
        else
            return new Vector2(dy, -dx);
    },
    leftUnitNormal: function(p1, p2, out) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        var s = Math.sqrt(dx * dx + dy * dy);
        if (out)
            return out.set(-dy / s, dx / s);
        else
            return new Vector2(-dy / s, dx / s);
    },
    rightUnitNormal: function(p1, p2, out) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        var s = Math.sqrt(dx * dx + dy * dy);
        if (out)
            return out.set(dy / s, -dx / s);
        else
            return new Vector2(dy / s, -dx / s);
    },
    signedArea: function(p1, p2, p3) {
        return 0.5 * ((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x));
    },
    leftMost: function(vertices) {
        var v = vertices[0];
        var count = vertices.length;
        for (var i = 1; i < count; i++) {
            if (vertices[i].x < v.x)
                v = vertices[i];
        }
        return v;
    },
    rightMost: function(vertices) {
        var v = vertices[0];
        var count = vertices.length;
        for (var i = 1; i < count; i++) {
            if (vertices[i].x > v.x)
                v = vertices[i];
        }
        return v;
    },
    triangleIsCCW: function(p1, p2, p3) {
        return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) > 0;
    }
};