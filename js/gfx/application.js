/**
 * Created by ashi on 2014-12-09.
 */

/**
 * requestAnimationFrame shim by Paul Irish
 */
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/60);
        };
})();

var App = {};

App.init = function(world, renderer, camera) {
    this.world = world;
    this.renderer = renderer;
    this.camera = camera;
    this.getViewMatrix = mat3.create();

    this.time = 0; // system time in ms
    this.prevTime = 0; // time at last frame
    this.deltaTime = 0; // time - prevTime
    this.dt = 0; // deltaTime in seconds

    this.frameCount = 0;
    this.fps = 0;
    this.timeStamp = 0;

    this.mousePosPx = new Vector2(0, 0);
    this.mousePosCam = new Vector2(0, 0);
    this.mousePos = new Vector2(0, 0);
    this.mousePosOld = new Vector2(0, 0);

    this.mouseOverCanvas = false;
    var self = this;

    renderer.canvas.addEventListener('mousemove', function(evt) {
        var rect = renderer.canvas.getBoundingClientRect();
        var width = renderer.canvas.width;
        var height = renderer.canvas.height;
        var x = (evt.clientX-rect.left)/(rect.right-rect.left)*width;
        var y = (evt.clientY-rect.top)/(rect.bottom-rect.top)*height;
        self.mousePosPx.set(x, y);
        self.mousePosCam.set(x- width/2, height/2 - y);
        self.mouseOverCanvas = true;
    });

    renderer.canvas.addEventListener('mouseout', function(evt) {
        self.mouseOverCanvas = false;
    });

    this.mouseEmitter = new ParticleEmitter(new Vector2(0, 0), 1, new Vector2(0, 30), 2 * Math.PI, new Color(255, 113, NaN, 1), 5, 512, 5);
};

App.initTime = function() {
    this.prevTime = this.time = Date.now();
    this.deltaTime = 0;
    this.dt = 0;
};

App.updateTime = function() {
    this.prevTime = this.time;
    this.time = Date.now();
    this.deltaTime = this.time - this.prevTime;
    this.dt = this.deltaTime / 1000;
};

App.updateFPS = function() {
    if (this.time - this.timeStamp > 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.timeStamp = this.time;
    }
    this.frameCount++;
};

App.run = function() {
    App.initTime();
    App.loop();
};

App.loop = function() {
    App.updateTime();
    App.updateFPS();
    App.handleInput();
    App.updateCamera();
    App.update();
    App.render();
    App.cleanUp();
    requestAnimationFrame(App.loop);
};

App.handleInput = function() {
    if (this.mouseOverCanvas) {
        this.camera.localToWorld(this.mousePosCam, this.mousePos);
        this.mouseEmitter.position.setV(this.mousePos);
        var v = this.mousePos.sub(this.mousePosOld).scaleSelf(1/2);
        for (var i = 0; i < this.mouseEmitter.rate * this.dt; i++) {
            var particle = this.world.allocateParticle();
            this.mouseEmitter.emitParticle(particle);
            particle.v.addSelf(v);
            this.world.addParticle(particle);
        }
        this.mousePosOld.setV(this.mousePos);
    }
};

App.updateCamera = function() {
    this.camera.getViewMatrix(this.getViewMatrix);
};

App.update = function() {
    App.world.update(this.dt);
};

App.render = function() {
    this.renderer.setView(this.getViewMatrix);
    this.renderer.clear();
    this.world.render(this.renderer);
};

App.cleanUp = function() {
};