/**
 * Created by ashi on 2014-12-08.
 */

var Polygons = {};
/* Convex hull of param vertices using the gift-wrapping algorithm */

Polygons.convexHull = function (vertices) {
    var count = vertices.length;

    var vs = [];
    var startPoint = Vectors.rightMost(vertices);
    var endPoint = null, v;

    var counter = 0;
    vs[0] = startPoint;

    while(endPoint != vs[0]) {
        vs[counter] = startPoint;
        endPoint = vertices[0];
        for (var i = 1; i < count; i++) {
            v = vertices[i];
            if (endPoint.equals(startPoint) || Vectors.triangleIsCCW(startPoint, v, endPoint))
                endPoint = v;
        }
        counter++;
        startPoint = endPoint;
    }

    var convexHull = [];
    for (var j = 0; j < counter; j++) {
        convexHull[j] = vs[j].clone();
    }
    return convexHull;
};

function Polygon(vertices, convex) {
    this.vertices = (convex) ? Polygons.convexHull(vertices) : vertices;
    this.count = this.vertices.length;
    this.centroid = new Vector2(0, 0);
    this.area = 0;
    this.computeCentroidAndArea();
}

Polygon.prototype.convexHull = function () {
    return new Polygon(Polygons.convexHull(this.vertices));
};
/**
 * computes the centroid using the centroid of triangles weighted by area
 */
Polygon.prototype.computeCentroidAndArea = function() {
    this.centroid.set(0, 0);

    var p1 = new Vector2(0, 0), p2, p3;
    _.forEach(this.vertices, function (p) {
        p1.addSelf(p);
    });
    p1.scaleSelf(1 / this.count); // p1 is the non-weighted centroid and guaranteed to be inside the polygon

    var area = 0, triangleArea;
    for (var i = 0; i < this.count; i++) {
        p2 = this.vertices[i], p3 = (i + 1 < this.count) ? this.vertices[i + 1] : this.vertices[0];
        triangleArea = Vectors.signedArea(p1, p2, p3);
        area += triangleArea;
        this.centroid.addSSelf(triangleArea / 3, p1);
        this.centroid.addSSelf(triangleArea / 3, p2);
        this.centroid.addSSelf(triangleArea / 3, p3);
    }
    this.centroid.scaleSelf(area);
    this.area = area;
};