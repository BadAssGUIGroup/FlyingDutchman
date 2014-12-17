/**
 * Created by ashi on 2014-12-08.
 */

function CanvasRenderer(context) {
    this.context = context;
    this.canvas = context.canvas;
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.clearColor = "transparent";
}

CanvasRenderer.prototype.setClearColor = function(color) {
    this.clearColor = color;
};

CanvasRenderer.prototype.setView = function(viewMatrix) {
    this.context.setTransform(viewMatrix[0], -viewMatrix[1], viewMatrix[3], -viewMatrix[4], viewMatrix[6] + this.width/2, -viewMatrix[7] + this.height/2);
};

CanvasRenderer.prototype.initView = function(flip, x, y) {
    if (x != null)
        this.context.setTransform(1, 0, 0, 1, x, y);
    else
        this.context.setTransform(1, 0, 0, 1, this.width/2, this.height/2);
    if (flip)
        this.context.scale(1, -1);
};

CanvasRenderer.prototype.clear = function(color) {
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = color || this.clearColor;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore()
};

CanvasRenderer.prototype.scaleView = function(scale, pivot) {
    if (pivot)
        this.context.translate(pivot.x, pivot.y);
    this.context.scale(scale, scale);
    if (pivot)
        this.context.translate(-pivot.x, -pivot.y);
};

CanvasRenderer.prototype.translateView = function (v) {
  this.context.translate(-v.x, -v.y);
};

CanvasRenderer.prototype.scaleView = function(scale, pivot) {
    if (pivot)
        this.context.translate(pivot.x, pivot.y);
    this.context.scale(scale, scale);
    if (pivot)
        this.context.translate(-pivot.x, -pivot.y);
};

CanvasRenderer.prototype.rotateView = function(angle, pivot) {
    if (pivot)
        this.context.translate(pivot.x, pivot.y);
    this.context.rotate(-angle);
    if (pivot)
        this.context.translate(-pivot.x, -pivot.y);
};

CanvasRenderer.prototype.drawPolygon = function (polygon, color, stroke) {
  this.context.beginPath();
  var vertex = polygon.vertices[0];
  this.context.moveTo(vertex.x, vertex.y);
  for (var i = 1; i < polygon.vertices.length; i++) {
    this.context.lineTo(polygon.vertices[i].x,
                    polygon.vertices[i].y);
  }
  this.context.lineTo(vertex.x, vertex.y);
  if (stroke) {
    this.context.strokeStyle = color;
    this.context.stroke();
  } else {
    this.context.fillStyle = color;
    this.context.fill();
  }
};

CanvasRenderer.prototype.drawPoint = function(x, y, color, size) {
    this.context.fillStyle = color;
    this.context.fillRect(x-size/2, y-size/2, size, size);
};

CanvasRenderer.prototype.drawParticle = function(particle) {
    this.drawPoint(particle.position.x, particle.position.y, particle.getColor(), particle.size);
};
