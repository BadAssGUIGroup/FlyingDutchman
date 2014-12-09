/**
 * Created by ashi on 2014-12-05.
 */

/**
 * comment here
 */

function init() {
    globals.inventory.refresh(function() {
        globals.viewCache.refreshAll();
        displayItems("ALL");
        globals.userList.refresh(function () {
            storeGlobals();
        });
    });
}

var renderer;
var world;
var time;

function particleInit() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    renderer = new CanvasRenderer(context);
    renderer.initView(true);
    renderer.scaleView(0.4, 0.4);
    world = new World();
    var emitter = new ParticleEmitter(new Vector2(-700, -80), 0, new Vector2(200, 50), Math.PI / 10, new Color(100, 50, 250, 1), 3, 120, 20);
    var emitter2 = new ParticleEmitter(new Vector2(250, -250), -1, new Vector2(0, 120), Math.PI / 10, new Color(255, 50, 150, 1), 3, 120, 50);
    var forceField = new ForceField(function (particle, out) {
        var x = 0, y = -200;
        var dx = particle.position.x - x;
        var dy = particle.position.y - y;
        var force = particle.mass * 60000 / Math.pow((dx * dx + dy * dy), 1.3);
        out.set(dx, dy);
        out.scaleSelf(force);
        return out;
    });
    var forceField2 = new ForceField(function (particle, out) {
        var x = 100, y = 100;
        var dx = particle.position.x - x;
        var dy = particle.position.y - y;
        var force = particle.mass * 125000 / Math.pow((dx * dx + dy * dy), 1.2);
        out.set(dx, dy);
        out.scaleSelf(force);
        return out;
    });
    var ff = new ForceField(function (position, out) {
        return out.set(0, -5);
    });
    world.addForceField(ff);
    world.addForceField(forceField);
    world.addForceField(forceField2);
    world.addEmitter(emitter);
    world.addEmitter(emitter2);
    time = Date.now();
}

function loop() {
    var now = Date.now();
    var dt = (now - time)/1000;
    time = now;
    world.update(dt);
    renderer.clear("#000000");
    world.render(renderer);
    requestAnimationFrame(loop);
}

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

onload = function() {
    init();
    particleInit();
    loop();
};