/**
 * Created by ashi on 2014-12-08.
 */

function ForceField(field) {
    this.field = field;
}

ForceField.prototype.getForce = function(particle, out) {
    return this.field(particle, out);
};

function World(x, y, width, height) {
    this.min = (x) ? new Vector2(x, y) : null;
    this.max = (x) ? new Vector2(x + width, y + height) : null;

    this.particles = [];
    this.forceFields = [];
    this.emitters = [];

    this.force = new Vector2(0, 0);
    this.particlePool = new ObjectPool(function() {
        return new Particle(new Vector2(0, 0), 1, new Color(1, 1, 1, 1), 2, new Vector2(0, 0));
        },
        function(particle) {
            particle.isDoomed = false;
            particle.lifeTime = null;
        },
        1024
    );
}

World.prototype.addParticle = function(particle) {
    this.particles.push(particle);
};

World.prototype.addForceField = function(forceField) {
    this.forceFields.push(forceField);
};

World.prototype.addEmitter = function (emitter) {
    this.emitters.push(emitter);
};

World.prototype.update = function(dt) {
    _.forEach(this.emitters, function(emitter) {
        for (var i = 0; i < emitter.rate * dt; i++)
            this.particles.push(emitter.emitParticle(this.particlePool.allocate()));
    }, this);

    var keep = [];
    for (var i = 0, count = this.particles.length; i < count; i++) {
        var particle = this.particles[i];

        if (particle.isDoomed) {
            if (particle.timeToDoom <= 0) {
                this.particlePool.release(particle);
                continue;
            }
            else
                particle.tickDoom(dt);
        }
        if (!(this.x == null || particle.position.isContainedBy(this.min, this.max))) {
            this.particlePool.release(particle);
            continue;
        }

        _.forEach(this.forceFields, function(forceField) {
            this.force = forceField.getForce(particle, this.force);
            particle.v.addSSelf(dt, this.force);
        }, this);
        particle.position.addSSelf(dt, particle.v);

        keep.push(particle);
    }

    this.particles = keep;
};

World.prototype.render = function(renderer) {
    _.forEach(this.particles, function(particle) {
        renderer.drawParticle(particle);
    });
};