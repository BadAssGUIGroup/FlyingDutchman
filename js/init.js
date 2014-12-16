/**
 * Created by ashi on 2014-12-05.
 */

/**
 * comment here
 */

var gl;
var glExt;

function init() {
    globals.inventory.refresh(function() {
        globals.viewCache.refreshAll();
        displayItems("ALL");
        globals.userList.refresh(function () {
            storeGlobals();
        });
    });

    var canvas = document.getElementById("canvas");
    var renderer = new CanvasRenderer(canvas.getContext("2d"));
    var camera = new Camera2D();
    camera.setScale(0.4);
    renderer.setClearColor("#91b1c6");
    App.init(particleInit(), renderer, camera);
    App.run();

    var beerCanvas = document.getElementById("beerCanvas");
    if (BeerApp.init(beerCanvas))
        BeerApp.run();
}

function particleInit() {
    var world = new World(-800, -600, 1600, 1200);
    var emitter = new ParticleEmitter(new Vector2(-700, -80), 0, new Vector2(200, 50), Math.PI / 10, new Color(255, 113, 72, 1), 5, 120, 20);
    var emitter2 = new ParticleEmitter(new Vector2(250, -250), -1, new Vector2(0, 120), Math.PI / 10, new Color(51, 92, 214, 1), 3, 120, 50);
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
    return world;
}

onload = function() {
    init();
};